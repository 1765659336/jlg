<template>
	<div v-for="item in props.menuData" :key="item.key" :class="level === 1 ? 'menu-one-item' : ''">
		<div v-if="item.mate.showAlways" :class="['menu-detail-item', 'level-' + level]">
			<div
				:class="[
					`${item[childKey] && item[childKey].length ? 'primary' : 'regular'}-txt`,
					{ 'is-active': item[idKey] === props.activeId },
					'default-text',
				]"
				@click="addRoute(item)"
				@mouseenter="item._isShowCollect = true"
				@mouseleave="item._isShowCollect = false"
			>
				<span class="icon-wrap">
					<i v-show="level === props.iconShowLevel" :class="item.icon || item?.mate?.icon"></i>
				</span>
				<div
					:class="[
						'title-wrap',
						item[childKey].length === 0 ? 'three-level-menu-title' : 'second-level-menu-title',
						props.defaultActive?.[2] === item[menuDataRecordKey] ? 'jlg-menu-three-level-menu-selected' : 'jlg-menu-three-level-menu-no-selected',
					]"
				>
					{{ item.title }}
					<div v-show="item[childKey].length === 0" class="show-collect">
						<show-collect
							:is-collect="collectMenuKeys.some((i) => i === item[menuDataRecordKey])"
							:is-show="item._isShowCollect"
							@click.stop="collectClick(item)"
						></show-collect>
					</div>
				</div>
			</div>
		</div>
		<template v-if="item[childKey] && item[childKey].length">
			<div :class="`level-box level-${level}-box`">
				<menu-item-component
					:active-id="activeId"
					:child-key="childKey"
					:parent-key="parentKey"
					:menu-data-record-key="menuDataRecordKey"
					:collect-menu-keys="collectMenuKeys"
					:id-key="idKey"
					:level="level + 1"
					:menu-data="item[childKey]"
				></menu-item-component>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { I_JlgMenu_MenuDataItem } from '../../type';
import ShowCollect from '../show-collect/index.vue';
import MenuItemComponent from '../menu-item/index.vue';

defineOptions({
	name: 'MenuItem',
});
interface I_Jlg_Menu_Item_Props {
	menuData: I_JlgMenu_MenuDataItem[];
	menuDataRecordKey?: string;
	collectMenuKeys: I_JlgMenu_MenuDataItem['key'][];
	level: number;
	// 显示icon的层级
	iconShowLevel: number;
	activeId: string;
	idKey: string;
	parentKey: string;
	childKey: string;
}
const props = withDefaults(defineProps<I_Jlg_Menu_Item_Props>(), {
	iconShowLevel: 1,
	activeId: '',
	idKey: 'id',
	parentKey: 'parent',
	childKey: 'child',
	menuDataRecordKey: 'key',
});
console.log(props);
const { collectClick, changeMenuRoute } = inject('parentInject');
// 路由跳转
function addRoute(menuData: I_JlgMenu_MenuDataItem) {
	if (!(menuData[props.childKey] && menuData[props.childKey].length)) {
		changeMenuRoute(menuData);
	}
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
