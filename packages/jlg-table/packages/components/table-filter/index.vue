<template>
	<el-form ref="refForm" class="jlg-table-filter" :model="form" :disabled="props.disabled">
		<div class="jlg-table-filter__container" :class="'is--' + (isFolding ? 'folding' : 'unfold')">
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
							:disabled="isHideTooltip || item.titleOverflow === false || item.titleOverflow === 'title' || item.titleOverflow === 'ellipsis'"
						>
							<span
								:title="item.titleOverflow === 'title' ? item.title : ''"
								:style="labelStyle(item)"
								class="jlg-text-overflow-hidden"
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
				<el-button v-if="props?.isBtnOrTemplate" class="screen-btn" @click="handleSave">
					{{ isFolding ? '展开筛选' : '收起筛选' }}
					<el-icon class="el-icon--right">
						<ArrowDown v-if="isFolding" />
						<ArrowUp v-else />
					</el-icon>
				</el-button>
				<el-button class="save-btn" type="primary" @click="handleSave">查询</el-button>
				<el-button class="reset-btn" @click="handleReset">重置</el-button>
			</div>
		</div>
		<!--  展开/折叠 操作区域   -->
		<div v-show="items.length > 0 && !props?.isBtnOrTemplate" class="table-filter__operation">
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
		<popover-component
			v-model:form="form"
			:visible="isShowQuickSearch"
			:virtual-ref="props.virtualRef"
			:disabled="props.disabled"
			:is-show-quick-search="isShowQuickSearch"
			:items-value="itemsValue"
			:render-content-title="renderContentTitle"
			:on-hide="onHide"
			:on-handle-reset="handleReset"
			:on-handle-save="handleSave"
		/>
	</el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { I_Table_Filter_Item, I_Table_Filter_Props } from './type';
import GlobalConfig from '../../../lib/useGlobalConfig';
import { ElTooltip, FormInstance } from 'element-plus';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { usePopover } from './hooks/usePopover';
import { useBaseData } from './hooks/useBaseData';
import PopoverComponent from './compontent/basic-popover.vue';

defineOptions({
	name: 'TableFilter',
});
const refForm = ref<FormInstance>();
const props = withDefaults(defineProps<I_Table_Filter_Props>(), {
	titleAlign: () => GlobalConfig.tableFilter.titleAlign,
	titleWidth: () => GlobalConfig.tableFilter.titleWidth,
	folding: () => GlobalConfig.tableFilter.folding,
});
const emit = defineEmits<{
	save: [data: Record<string, any>];
	reset: [data: Record<string, any>];
	folding: [bool: boolean];
}>();

const itemsModelValue = defineModel<I_Table_Filter_Item[]>('items', { required: true });

const { form, isHideTooltip, isFolding, labelStyle, visibleTooltip } = useBaseData({ props });
// 搜索弹框内存在有效数据时，触发回调
const { isShowQuickSearch, renderContentTitle, onClickOutside, handleQuickSearchClose, handleQuickSearch } = usePopover({ props, form });

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

// 设置初始值
function handleInitialValue() {
	itemsModelValue.value.forEach((item) => {
		form[item.field] = item.defaultValue;
	});
}

function getFormData() {
	return form;
}

function onHide() {
	isShowQuickSearch.value = false;
}

/// 查询
function handleSave() {
	isShowQuickSearch.value = false;
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
