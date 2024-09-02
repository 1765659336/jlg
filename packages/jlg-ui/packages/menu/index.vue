<template>
	<div v-click-outside="handleTouchModal" class="jlg-menu">
		<div v-if="slots.logo" class="jlg-menu-logo" :style="`height:${logoHeight}`">
			<slot name="logo"></slot>
		</div>
		<div>
			<el-popover
				v-for="firstLevelMenu in handleMenuData"
				:key="firstLevelMenu[menuDataRecordComputed.key]"
				placement="right"
				trigger="click"
				:width="getPopoWidth(firstLevelMenu)"
				:teleported="false"
				v-bind="props.elPopoverProps"
			>
				<template #reference>
					<div
						:class="[
							'jlg-menu-first-level-menu',
							props.defaultActive?.[0] === firstLevelMenu[menuDataRecordComputed.key]
								? 'jlg-menu-first-level-menu-selected'
								: 'jlg-menu-first-level-menu-no-selected',
						]"
						@click="closeMenu"
					>
						<div class="jlg-menu-first-level-menu-icon">
							<slot :name="'first-menu-icon' + firstLevelMenu[menuDataRecordComputed.key]">
								<i v-if="firstLevelMenu[menuDataRecordComputed.iconClass]" :class="firstLevelMenu[menuDataRecordComputed.iconClass]"></i>
							</slot>
						</div>
						<p class="jlg-menu-first-level-menu-text">{{ firstLevelMenu[menuDataRecordComputed.title] }}</p>
					</div>
				</template>
				<div class="jlg-menu-popover">
					<div class="jlg-menu-popover-search">
						<el-autocomplete
							v-model="searchChildMenuText"
							popper-class="jlg-menu-popover-search-autocomplete"
							style="width: 100%"
							clearable
							:suffix-icon="Search"
							:fetch-suggestions="querySearch"
							:trigger-on-focus="false"
							value-key="title"
							placeholder="请输入菜单名称"
							@select="handleSelect"
						/>
					</div>
					<div
						v-for="secondLevelMenu in firstLevelMenu[menuDataRecordComputed.children]"
						:key="secondLevelMenu[menuDataRecordComputed.key]"
						:class="[
							'second-level-menu',
							props.defaultActive?.[1] === secondLevelMenu[menuDataRecordComputed.key]
								? 'jlg-menu-second-level-menu-selected'
								: 'jlg-menu-second-level-menu-no-selected',
						]"
					>
						<div class="second-level-menu-title">
							{{ secondLevelMenu[menuDataRecordComputed.title] }}
						</div>
						<div
							v-for="threeLevelMenu in secondLevelMenu[menuDataRecordComputed.children]"
							:key="threeLevelMenu[menuDataRecordComputed.key]"
							:class="[
								'three-level-menu-title',
								props.defaultActive?.[2] === threeLevelMenu[menuDataRecordComputed.key]
									? 'jlg-menu-three-level-menu-selected'
									: 'jlg-menu-three-level-menu-no-selected',
							]"
							@mouseenter="threeLevelMenu._isShowCollect = true"
							@mouseleave="threeLevelMenu._isShowCollect = false"
							@click="changeMenuRoute(threeLevelMenu)"
						>
							{{ threeLevelMenu[menuDataRecordComputed.title] }}
							<div class="show-collect">
								<show-collect
									:is-collect="props.collectMenuKeys.some((i) => i === threeLevelMenu[menuDataRecordComputed.key])"
									:is-show="threeLevelMenu._isShowCollect"
									@click.stop="collectClick(threeLevelMenu)"
								></show-collect>
							</div>
						</div>
					</div>
				</div>
			</el-popover>
		</div>
		<!-- 全部菜单 -->
		<transition name="el-zoom-in-left">
			<div v-show="showDetailMenu" class="jlg-all-menu side-box" :style="{ top: headerHeight ? headerHeight : '48px' }">
				<el-container>
					<el-container class="jlg-all-menu-left-container">
						<el-header height="75px" class="jlg-all-menu-left-header">
							<!--  搜索区域            -->
							<div class="menu-search">
								<el-input
									v-model.trim="searchMenuText"
									clearable
									:suffix-icon="Search"
									placeholder="请输入关键字搜索"
									@input="(event) => (searchTrigger === 'input' ? searchMenu(event) : '')"
									@change="(event) => (searchTrigger === 'change' ? searchMenu(event) : '')"
									@keydown.enter="searchMenu"
								/>
							</div>
						</el-header>
						<el-main class="jlg-all-menu-left-main">
							<el-container style="height: 100%">
								<el-scrollbar height="100%">
									<el-main
										:style="{
											'column-count': columnCount ? columnCount : 'auto',
										}"
									>
										<menu-item-component
											:menu-data="showMenuData"
											:active-id="currentActiveId"
											:child-key="childKey"
											:menu-data-record-key="menuDataRecordComputed.key"
											:collect-menu-keys="collectMenuKeys"
											:parent-key="parentKey"
											:id-key="idKey"
											:level="1"
										/>
									</el-main>
								</el-scrollbar>
							</el-container>
						</el-main>
					</el-container>
					<el-container class="jlg-all-menu-right-container">
						<el-header height="55px">
							<el-button style="padding: 0" link>
								<i class="icon iconfont icon-close" @click="closeMenu"></i>
							</el-button>
						</el-header>
						<el-main class="jlg-all-menu-right-main">
							<div v-for="commonPage in commonMenuData" :key="commonPage[idKey]" class="frequently-used-menus" @click="changeMenuRoute(commonPage)">
								{{ commonPage.title }}
							</div>
						</el-main>
					</el-container>
				</el-container>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { I_Jlg_Menu_Emits, I_JlgMenu_MenuDataItem, T_MenuDataRecord } from './type';
import ShowCollect from './components/show-collect/index.vue';
import { ClickOutside as vClickOutside, PopoverProps } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import MenuItemComponent from './components/menu-item/index.vue';
import { computed, nextTick, provide, ref, useSlots, watch } from 'vue';
import { cloneDeep } from 'lodash';
import { ElPopover, ElScrollbar, ElContainer, ElMain, ElHeader, ElInput } from 'element-plus';
import { findTree, toTreeArray } from 'xe-utils';
import { RouteLocationNormalizedLoaded } from 'vue-router';

defineOptions({
	name: 'JlgMenu',
});
interface I_Jlg_Menu_Props {
	// 全部菜单数据
	menuData: I_JlgMenu_MenuDataItem[];
	// 常用菜单数据
	commonMenuData?: I_JlgMenu_MenuDataItem[];
	// 收藏的菜单key
	collectMenuKeys: I_JlgMenu_MenuDataItem['key'][];
	menuDataRecord?: T_MenuDataRecord;
	// 全部菜单打开过渡动画
	transition?: string;
	idKey?: string;
	childKey?: string;
	parentKey?: string;
	// 菜单分几列显示
	columnCount?: number;
	// logo高度
	logoHeight?: number;
	isLockModal?: boolean;
	// 全部菜单距离顶部高度
	headerHeight?: string;
	route?: RouteLocationNormalizedLoaded;
	searchTrigger?: 'change' | 'input';
	defaultActive?: I_JlgMenu_MenuDataItem['key'][];
	elPopoverProps?: PopoverProps;
}
const props = withDefaults(defineProps<I_Jlg_Menu_Props>(), {
	childKey: 'child',
	transition: 'el-fade-in-linear',
	idKey: 'id',
	parentKey: 'parentId',
	searchTrigger: 'change',
	headerHeight: '48px',
	columnCount: 3,
	isLockModal: true,
});
const emits = defineEmits<I_Jlg_Menu_Emits>();

const slots = useSlots();

const handleMenuData = ref();

const menuDataRecordComputed = computed(() => ({
	...{
		title: 'title',
		iconClass: 'iconClass',
		key: 'key',
		children: 'children',
	},
	...(props.menuDataRecord ?? {}),
}));
const idKey = computed(() => props.idKey || 'id');
const childKey = computed(() => props.childKey || 'child');
const parentKey = computed(() => props.parentKey || 'parentId');
const currentActiveId = ref<any>(null); // 当前所在的菜单
// 悬浮菜单逻辑
const showDetailMenu = ref(false); //是否显示悬浮菜单
const searchMenuText = ref(); // 快捷查询输入框
const searchChildMenuText = ref(); // 子菜单快捷查询输入框
const showMenuData = ref(); // 显示的菜单
const currentMenuData = ref(); // 用于存储所有菜单
// 处理得到新的格式数据
function addMenuDataFields(menuData) {
	return menuData.map((item) => {
		return {
			...item,
			_isShowCollect: false,
			children: addMenuDataFields(item[menuDataRecordComputed.value.children] ?? []),
		};
	});
}

watch(
	() => props.menuData,
	(newValue) => {
		handleMenuData.value = addMenuDataFields(newValue);
	},
	{
		deep: true,
		immediate: true,
	}
);
// 监听当前路由变化
watch(
	() => props.route!.path,
	(val) => {
		const nodesData = findTree(props.menuData as I_JlgMenu_MenuDataItem[], (item) => item.path === val, {
			children: childKey.value,
		});
		if (nodesData) {
			const nodes = nodesData.nodes;
			if (nodes && nodes.length) {
				currentActiveId.value = nodes[nodes.length - 1][idKey.value];
			}
		}
	},
	{
		immediate: true,
	}
);
// 完整菜单数据（排除首页等前端维护的菜单）
const fullMenuData = computed(() => {
	return props.menuData!.filter((item) => {
		if (typeof item[idKey.value] === 'number') {
			return item[idKey.value] > 0;
		} else {
			return !!item[idKey.value];
		}
	});
});
// 子菜单查询
function querySearch(queryString, cb) {
	const menuData = toTreeArray(fullMenuData.value, {
		children: childKey.value,
	});
	const results = queryString ? menuData.filter(createFilter(queryString)) : [];
	// 调用 callback 返回建议列表的数据
	cb(results);
}
/**
 * 任意二级菜单弹出框的搜索操作
 * */
const createFilter = (queryString: string) => {
	return (item: I_JlgMenu_MenuDataItem) => {
		return !item[childKey.value]?.length && item.title?.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
	};
};
function handleSelect(item: I_JlgMenu_MenuDataItem) {
	changeMenuRoute(item);
}
const collectClick = (threeLevelMenu) => {
	emits('collectClick', threeLevelMenu);
};
const changeMenuRoute = (threeLevelMenu) => {
	emits('threeLevelMenuClick', threeLevelMenu);
	nextTick(() => {
		searchMenuText.value = '';
		searchChildMenuText.value = '';
		showDetailMenu.value = false;
	});
};
provide('parentInject', { collectClick, changeMenuRoute });
function getPopoWidth(firstLevelMenu) {
	const childMenuLength = firstLevelMenu.children?.length;
	if (childMenuLength >= 4) {
		return 802;
	} else if (childMenuLength === 0) {
		return 0;
	} else {
		return 20 + 20 + 2 + 190 * childMenuLength;
	}
}
// 全部菜单查询事件
function searchMenu(event) {
	if (event) {
		const menuData = cloneDeep(currentMenuData.value);
		showMenuData.value = getSearchData(menuData);
	} else {
		showMenuData.value = currentMenuData.value;
	}
}
// 获取查询后的菜单数据
const getSearchData = function (menuDatas: I_JlgMenu_MenuDataItem[]): any {
	const newArr: I_JlgMenu_MenuDataItem[] = [];
	menuDatas.forEach((item) => {
		if (item[childKey.value] && item[childKey.value].length) {
			const childs = getSearchData(item[childKey.value]);
			const obj: I_JlgMenu_MenuDataItem = {
				...item,
				child: childs,
			} as I_JlgMenu_MenuDataItem;
			if (childs && childs.length) {
				newArr.push(obj);
			} else if (item.title.includes(searchMenuText.value)) {
				newArr.push({ ...item });
			}
		} else {
			if (item.title.includes(searchMenuText.value)) {
				newArr.push(item);
			}
		}
	});
	return newArr;
};
// 显示全部菜单悬浮窗
function showMenu() {
	showMenuData.value = props.menuData;
	currentMenuData.value = props.menuData;
	searchMenuText.value = '';
	showDetailMenu.value = true;
}
// 点击悬浮窗菜单外关闭菜单
function handleTouchModal() {
	if (props.isLockModal && showDetailMenu.value) {
		showDetailMenu.value = false;
	}
}
// 关闭全部菜单悬浮窗
function closeMenu() {
	showDetailMenu.value = false;
}
// 重置全部菜单的数据
function initMenu() {
	showDetailMenu.value = false;
	searchMenuText.value = null;
	showMenuData.value = null;
	currentMenuData.value = null;
}
defineExpose({ initMenu, showMenu, closeMenu });
</script>

<style scoped lang="scss">
.jlg-menu {
	height: 100%;
	position: relative;
	width: var(--jlg-menu-width);
	background-color: var(--jlg-menu-bg);
	padding: var(--jlg-menu-y-padding) var(--jlg-menu-x-padding);

	:deep(.el-popover) {
		padding: 0;
		background-color: var(--jlg-menu-popover-bg);

		.el-popper__arrow::before {
			background-color: var(--jlg-menu-popover-bg);
		}
	}

	.jlg-menu-popover {
		display: flex;
		flex-wrap: wrap;
		/* padding-inline-start: 0px; */
		padding: 12px 20px;
		.jlg-menu-popover-search {
			width: 100%;
			margin: 5px 0 30px 0;
			:deep(.el-input__wrapper) {
				box-shadow: none;
				background-color: var(--jlg-menu-popover-bg);
				border-bottom: 1px solid #394341;
			}
		}
		.second-level-menu {
			/* margin-left: var(--second-level-menu-margin-left); */
			color: var(--jlg-menu-popover-color);
			width: 170px;
			margin-right: 20px;
			margin-bottom: 10px;
			.second-level-menu-title {
				padding: var(--second-level-menu-title-top-padding) var(--second-level-menu-title-right-padding) var(--second-level-menu-title-bottom-padding)
					var(--second-level-menu-title-left-padding);
				border-bottom: 1px solid #394341;
				color: var(--second-level-menu-title-color);
				font-size: var(--second-level-menu-title-font-size);
			}
			.three-level-menu-title {
				font-size: var(--three-level-menu-title-font-size);
				padding: var(--three-level-menu-title-top-padding) var(--three-level-menu-title-right-padding) var(--three-level-menu-title-bottom-padding)
					var(--three-level-menu-title-left-padding);
				display: flex;
				color: var(--three-level-menu-title-color);

				&:hover {
					cursor: pointer;
					color: var(--jlg-menu-three-level-hover-bg);
				}

				.show-collect {
					margin-left: 3px;
					width: 20px;
				}
			}
		}
	}

	.jlg-menu-first-level-menu {
		display: flex;
		align-items: center;
		color: var(--jlg-menu-first-level-color);
		border-radius: var(--jlg-menu-first-level-border-radius);
		margin: var(--jlg-menu-first-level-y-margin) var(--jlg-menu-first-level-x-margin);
		padding: var(--jlg-menu-first-level-y-padding) var(--jlg-menu-first-level-x-padding);
		cursor: pointer;

		.jlg-menu-first-level-menu-icon {
			width: 20px;
			height: 20px;
			line-height: 20px;
			margin-right: 5px;
		}

		.jlg-menu-first-level-menu-text {
			flex: 1;
		}
	}

	.jlg-menu-first-level-menu-no-selected {
		&:hover {
			background-color: var(--jlg-menu-first-level-hover-bg);
			color: var(--jlg-menu-first-level-hover-color);
		}
	}

	.jlg-menu-first-level-menu-selected {
		background-color: var(--jlg-menu-first-level-focus-bg);
	}
}
@import './menu.scss';
</style>

<style lang="scss">
.jlg-menu-popover-search-autocomplete {
	.el-autocomplete-suggestion {
		background-color: #081429 !important;
		li:hover {
			background-color: rgba(66, 72, 81, 0.5);
		}
	}
	.el-popper__arrow {
		left: 50%;
	}
}
</style>
