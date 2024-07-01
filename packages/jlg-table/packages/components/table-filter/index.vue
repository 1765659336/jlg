<template>
	<el-form ref="refForm" class="table-filter" :model="form" :disabled="props.disabled">
		<div class="table-filter__container" :class="'is--' + (isFolding ? 'folding' : 'unfold')">
			<div v-for="item in items" :key="item.field" class="table-filter__card" :class="item.className">
				<el-form-item
					:prop="item.field"
					:label-position="item.titleAlign ?? props.titleAlign"
					:label-width="item.titleWidth != null ? item.titleWidth : props.titleWidth"
				>
					<template #label>
						<el-tooltip
							:content="item.title"
							placement="top"
							:disabled="isShowTooltip || item.titleOverflow === false || item.titleOverflow === 'title' || item.titleOverflow === 'ellipsis'"
						>
							<span
								:title="item.titleOverflow === 'title' ? item.title : ''"
								:style="labelStyle(item)"
								class="text-overflow-hidden"
								:class="item.titleClassName"
								@mouseover="($event) => visibleTooltip($event, item.title)"
								>{{ item.title }}</span
							>
						</el-tooltip>
					</template>
					<template #default>
						<component :is="renderContentTitle(item)" v-model="form[item.field]" v-model:search-type="item.searchType" :item="item" />
					</template>
				</el-form-item>
			</div>
			<div v-show="!isFolding && items.length" class="table-filter__card">
				<el-button class="save-btn" type="primary" @click="handleSave">查询</el-button>
				<el-button class="reset-btn" @click="handleReset">重置</el-button>
			</div>
		</div>
		<!--  展开/折叠 操作区域   -->
		<div v-show="items.length > 0" class="table-filter__operation">
			<slot name="filter_divider" :is-folding="isFolding">
				<el-divider>
					<div class="table-filter__divider" @click="handleFolding(!isFolding)">
						<span style="margin-right: 5px">{{ isFolding ? '展开筛选' : '收起筛选' }}</span>
						<el-icon>
							<ArrowDown v-if="isFolding" />
							<ArrowUp v-else />
						</el-icon>
					</div>
				</el-divider>
			</slot>
		</div>

		<!--  快捷搜索弹出窗口   -->
		<el-popover
			ref="popoverRef"
			:visible="isShowQuickSearch"
			trigger="click"
			popper-class="jlg-popper--quick--search"
			:pure="true"
			:virtual-ref="props.virtualRef"
			:teleported="false"
			:show-arrow="false"
			:width="525"
			virtual-triggering
			placement="bottom"
			:disabled="props.disabled || itemsValue.length === 0"
			:manual="true"
			@hide="onHide"
		>
			<div v-show="isShowQuickSearch" class="jlg-popover__wrapper">
				<div class="jlg-popover__title">
					<span>搜索</span>
					<el-icon size="18" style="cursor: pointer" @click="isShowQuickSearch = false">
						<CloseBold />
					</el-icon>
				</div>
				<div class="jlg-popover__body">
					<el-row :gutter="40">
						<el-col v-for="item in itemsValue" :key="item.field" :span="12" :class="item.className">
							<el-form-item :prop="item.field">
								<template #default>
									<component
										:is="renderContentTitle(item)"
										v-model="form[item.field]"
										v-model:search-type="item.searchType"
										:show-label="true"
										:item="item"
									/>
								</template>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="jlg-popover__footer">
					<div></div>
					<div>
						<el-button @click="onHide">关闭</el-button>
						<el-button @click="handleReset">重置</el-button>
						<el-button type="primary" @click="handleSave">查询</el-button>
					</div>
				</div>
			</div>
		</el-popover>
	</el-form>
</template>

<script setup lang="ts">
import { CSSProperties, ref } from 'vue';
import { I_Table_Filter_Item, I_Table_Filter_Props } from './type';
import { ElPopover, ElTooltip, FormInstance } from 'element-plus';
import GlobalConfig from '../../../lib/useGlobalConfig';
import { ArrowDown, ArrowUp, CloseBold } from '@element-plus/icons-vue';
import isString from 'xe-utils/isString';
import isNumber from 'xe-utils/isNumber';
import FilterText from './compontent/filter-text.vue';
import FilterInputNumber from './compontent/filter-input-number.vue';
import FilterSelect from './compontent/filter-select.vue';
import FilterTime from './compontent/filter-time.vue';
import FilterDate from './compontent/filter-date.vue';
import FilterTreeSelect from './compontent/filter-tree-select.vue';
import FilterIndependentDate from './compontent/filter-independent-date.vue';
import { useHasValue } from './hooks/useHasValue';

defineOptions({
	name: 'TableFilter',
});
const refForm = ref<FormInstance>();
const props = withDefaults(defineProps<I_Table_Filter_Props>(), {
	titleAlign: () => GlobalConfig.tableFilter.titleAlign,
	titleWidth: () => GlobalConfig.tableFilter.titleWidth,
	folding: () => GlobalConfig.tableFilter.folding,
	beforeSave: GlobalConfig.tableFilter.beforeSave,
});
const emit = defineEmits<{
	save: [data: Record<string, any>];
	reset: [data: Record<string, any>];
	folding: [bool: boolean];
}>();

const itemsModelValue = defineModel<I_Table_Filter_Item[]>('items', { required: true });

// baseForm 用于存储快捷搜索&高级搜索的数据
// const loadSchemeList = [
// 	{
// 		schemeName: '方案1',
// 		schemeUid: '1',
// 		scheme: [{}],
// 	},
// ];

// const filterBaseForm = reactive({});
// 高级搜索表单数据
// const filterContainerForm = reactive({});
const form = reactive({});
// 搜索弹框内存在有效数据时，触发回调
const { isShowQuickSearch } = useHasValue({ props, form });

const items = computed(() =>
	itemsModelValue.value
		.filter((item) => {
			item.visible = item.visible ?? true;
			return item.visible && item.quickSearch;
		})
		.sort((a, b) => (a.sortNumber || 0) - (b.sortNumber || 0))
);
const itemsValue = computed(() =>
	itemsModelValue.value
		.filter((item) => {
			// 显示 item.visible 并且根据 sortNumber 排序
			item.visible = item.visible ?? true;
			return item.visible;
		})
		.sort((a, b) => (a.sortNumber || 0) - (b.sortNumber || 0))
);

const isShowTooltip = ref(false);

function visibleTooltip(event: Event, labelText: string) {
	if (!labelText) {
		isShowTooltip.value = true;
		return;
	}
	const { offsetWidth, scrollWidth } = event.target as HTMLElement;
	isShowTooltip.value = offsetWidth >= scrollWidth;
}

const labelStyle = (item: I_Table_Filter_Item): CSSProperties => {
	const labelWidth = addUnit(item.titleWidth || props?.titleWidth || '');
	let titleAlign = item.titleAlign || props.titleAlign;
	if (titleAlign === 'top' || titleAlign === '') titleAlign = 'left';
	if (labelWidth) return { width: labelWidth, textAlign: titleAlign };
	return { textAlign: titleAlign, width: '' };
};

const isFolding = ref(props.folding);

const renderContentTitle = (item: I_Table_Filter_Item) => {
	switch (item.type) {
		case 'text':
			return FilterText;
		case 'number':
			return FilterInputNumber;
		case 'select':
			return FilterSelect;
		case 'time':
			return FilterTime;
		case 'date':
			return FilterDate;
		case 'independentDate':
			return FilterIndependentDate;
		case 'treeSelect':
			return FilterTreeSelect;
		default:
			return FilterText;
	}
};

function isStringNumber(val: string | number) {
	if (!isString(val)) {
		return false;
	}
	return !Number.isNaN(Number(val));
}

function addUnit(value?: string | number, defaultUnit = 'px') {
	if (!value) return '';
	if (isNumber(value) || isStringNumber(value)) {
		return `${value}${defaultUnit}`;
	} else if (isString(value)) {
		return value;
	}
}

// 设置初始值
function handleInitialValue() {
	itemsModelValue.value.forEach((item) => {
		form[item.field] = item.defaultValue;
	});
}

function getFormData() {
	if (props.beforeSave && typeof props.beforeSave === 'function') {
		return props.beforeSave(form, items.value);
	}
	return form;
}

function onHide() {
	isShowQuickSearch.value = false;
}

/// 查询
function handleSave() {
	isShowQuickSearch.value = false;
	if (props.beforeSave && typeof props.beforeSave === 'function') {
		const data = props.beforeSave(form, items.value);
		emit('save', data);
		return;
	}
	emit('save', form);
}

/// 重置查询条件
function handleReset() {
	isShowQuickSearch.value = false;
	setTimeout(() => {
		refForm.value?.resetFields();
		handleInitialValue();
		emit('reset', form);
	}, 0);
}

function handleFolding(bool: boolean) {
	isFolding.value = bool;
	/// 通过 setTimeout 保证折叠动画完成后再触发事件，不然视觉上会出现卡顿
	setTimeout(() => {
		emit('folding', bool);
	});
}

const popoverRef = ref();
const onClickOutside = () => {
	unref(popoverRef).popperRef?.delayHide?.();
};
// 手动关闭快捷搜索
const handleQuickSearchClose = () => {
	isShowQuickSearch.value = false;
};
// 打开快捷搜索
const handleQuickSearch = () => {
	isShowQuickSearch.value = true;
};

defineExpose({
	handleReset,
	handleInitialValue,
	handleFolding,
	getFormData,
	onClickOutside,
	handleQuickSearchClose,
	handleQuickSearch,
	rawFormData: form,
});
</script>
