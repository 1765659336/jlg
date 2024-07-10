<template>
	<el-config-provider :locale="zhCn">
		<el-form ref="refForm" :model="form" :disabled="props.disabled">
			<div class="jlg-filter-panel">
				<div class="filter-panel__header">
					<el-select
						ref="ElSelectRef"
						v-model="templateStore.currentTemplateUId"
						class="filter-panel__select"
						size="default"
						placeholder="请选择常用筛选方案"
						clearable
					>
						<el-option
							v-for="item in templateStore.loadTemplateList"
							:key="item.templateUid"
							:value="item.templateUid"
							:label="item.templateName"
						></el-option>
						<template #footer>
							<div style="width: 100%">
								<el-button style="width: 100%" :icon="Plus" size="small" type="primary" text @click="handleAddTemplate">新增</el-button>
							</div>
						</template>
					</el-select>
					<div class="filter-panel__scrollbar">
						<el-scrollbar v-show="isFolding && !basicTemplateRef?.isShow">
							<div class="filter-panel__options">
								<basic-tag v-for="item in itemsValue" :key="item.field" :item="item" :form="form" @close="handleTagClose" />
							</div>
						</el-scrollbar>
					</div>
					<div class="filter-panel__button">
						<el-button class="save-btn" type="primary" @click="handleSave">查询</el-button>
						<el-button v-show="!templateStore.currentTemplateUId" class="reset-btn" @click="handleReset">重置</el-button>
					</div>
				</div>
				<div class="jlg-filter-pane__divider">
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
				<div class="jlg-filter-panel__body">
					<div
						v-show="!isFolding && !basicTemplateRef?.isShow"
						class="jlg-table-filter__container"
						:class="'is--' + (isFolding ? 'folding' : 'unfold')"
					>
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
					</div>
					<div v-show="!isFolding && basicTemplateRef?.isShow">
						<basic-template
							ref="basicTemplateRef"
							:current-template-details="currentTemplateDetails"
							:load-template-list="templateStore.loadTemplateList"
							@option-click="handleOptionClick"
						>
							<template #panel>
								<basic-template-edit
									ref="basicTemplateEditRef"
									:items="itemsValue"
									:current-template-details="currentTemplateDetails"
									@save="handePanelSave"
									@cancel-event="handePanelCancel"
								/>
							</template>
						</basic-template>
					</div>
				</div>
			</div>
		</el-form>
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
			:on-handle-save="handlePopoverSave"
		/>
	</el-config-provider>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { ElConfigProvider, ElOption, ElSelect, ElTooltip, FormInstance } from 'element-plus';
import { I_Table_Filter_Item, I_Table_Filter_Props, I_User_Search_Template_Model } from './type';
import GlobalConfig from '../../../lib/useGlobalConfig';
import { usePopover } from './hooks/usePopover';
import { useBaseData } from './hooks/useBaseData';
import BasicTag from './compontent/basic-tag.vue';
import BasicTemplate from './compontent/basic-template.vue';
import BasicTemplateEdit from './compontent/basic-template-edit.vue';
import PopoverComponent from './compontent/basic-popover.vue';
import { ArrowDown, ArrowUp, Plus } from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

defineOptions({
	name: 'TableFilterTwo',
});
const refForm = ref<FormInstance>();
const basicTemplateEditRef = ref<InstanceType<typeof BasicTemplateEdit>>();
const props = withDefaults(defineProps<I_Table_Filter_Props>(), {
	titleAlign: () => GlobalConfig.tableFilter.titleAlign,
	titleWidth: () => GlobalConfig.tableFilter.titleWidth,
	folding: () => GlobalConfig.tableFilter.folding,
	beforeSave: GlobalConfig.tableFilter.beforeSave,
});
const emit = defineEmits<{
	save: [data: Record<string, any>];
	reset: [data: Record<string, any>];
	saveTemplate: [data: I_User_Search_Template_Model, type: 'edit' | 'add' | 'delete'];
	folding: [bool: boolean];
}>();

const itemsModelValue = defineModel<I_Table_Filter_Item[]>('items', { required: true });

const { form, schemeForm, isHideTooltip, isFolding, labelStyle, visibleTooltip } = useBaseData({ props });
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

const templateStore = reactive({
	currentTemplateUId: '' as string | null,
	loadTemplateList: [] as I_User_Search_Template_Model[],
});
const currentTemplateDetails = computed(() => {
	return templateStore.loadTemplateList.find((item) => item.templateUid === templateStore.currentTemplateUId);
});
const setTemplateList = (list?: I_User_Search_Template_Model[], currentTemplateUId?: string) => {
	return new Promise((resolve) => {
		isShowQuickSearch.value = false;
		if (currentTemplateUId && typeof currentTemplateUId === 'string') {
			templateStore.currentTemplateUId = currentTemplateUId;
		}
		if (list && Array.isArray(list)) {
			templateStore.loadTemplateList = list;
		}
		resolve({
			currentTemplateUId: templateStore.currentTemplateUId,
			loadTemplateList: templateStore.loadTemplateList,
			$template: basicTemplateRef.value,
			$templateEdit: basicTemplateEditRef.value,
		});
	});
};

// 根据模板uid删除模板
const handleDeleteTemplate = (templateUid: string) => {
	const index = templateStore.loadTemplateList.findIndex((item) => item.templateUid === templateUid);
	if (index > -1) {
		templateStore.currentTemplateUId = undefined;
		templateStore.loadTemplateList.splice(index, 1);
	}
};

const handleOptionClick = (templateItem?: I_User_Search_Template_Model) => {
	debugger;
	if (!templateItem) {
		handleAddTemplate();
	} else {
		templateStore.currentTemplateUId = templateItem.templateUid;
	}
};

function pascalToCamel(str: string) {
	// 字符串首字符转小写
	return str.charAt(0).toLowerCase() + str.slice(1);
}

const basicTemplateRef = ref<InstanceType<typeof BasicTemplate>>();
const ElSelectRef = ref<InstanceType<typeof ElSelect>>();
const handleSchemeChange = (templateUid?: string) => {
	Object.keys(schemeForm).forEach((key) => {
		schemeForm[key] = undefined;
	});
	const userSearchTemplateDetails = templateStore.loadTemplateList.find((item) => item.templateUid === templateUid)?.userSearchTemplateDetails;
	if (userSearchTemplateDetails) {
		userSearchTemplateDetails.forEach((item) => {
			const field = pascalToCamel(item.dbFieldName);
			schemeForm[field] = item.defaultValue;
		});
	}
	isShowQuickSearch.value = false;
	if (templateUid === '') return;
	emit('save', schemeForm);
};
watch(
	() => templateStore.currentTemplateUId,
	(value) => {
		handleSchemeChange(value);
	}
);
/**
 * 高级搜索数据变化时,重新计算 userSearchTemplateDetails
 * */
watch(
	() => itemsValue.value?.length ?? 0,
	(value, oldValue) => {
		if (value === 0) {
			templateStore.currentTemplateUId = undefined;
			templateStore.loadTemplateList?.forEach((item) => {
				item.userSearchTemplateDetails = [];
			});
		}
		if (value < oldValue) {
			templateStore.loadTemplateList?.forEach((item) => {
				item.userSearchTemplateDetails = item.userSearchTemplateDetails.filter((detail) => {
					return itemsValue.value.some((item) => item.params.dynamicPageColUid === pascalToCamel(detail.dynamicPageColUid));
				});
			});
		}
	}
);

const handleAddTemplate = () => {
	//  将 templateStore.currentTemplateUId 设置为空字符串是为了区分新增与 el-select清空
	templateStore.currentTemplateUId = '';
	nextTick(() => {
		ElSelectRef.value.blur();
		if (isFolding.value) handleFolding(false);
		basicTemplateRef.value?.show(true);
	});
};

const handePanelSave = (data: I_User_Search_Template_Model) => {
	emit('saveTemplate', data, templateStore.currentTemplateUId ? 'edit' : 'add');
};

const handePanelCancel = (data: I_User_Search_Template_Model) => {
	basicTemplateRef.value?.show(false);
	if (data.templateUid) {
		// 编辑-删除
		emit('saveTemplate', data, 'delete');
	} else {
		// 新增-取消
		basicTemplateEditRef.value?.resetNewTemplateDetails();
		if (templateStore.loadTemplateList.length > 0) {
			handleOptionClick(templateStore.loadTemplateList[0]);
		}
	}
};

// 设置初始值
function handleInitialValue() {
	itemsModelValue.value.forEach((item) => {
		form[item.field] = item.defaultValue;
	});
}

function getFormData() {
	return templateStore.currentTemplateUId ? schemeForm : form;
}

function onHide() {
	isShowQuickSearch.value = false;
}

/// 查询
function handleSave() {
	isShowQuickSearch.value = false;
	const _form = templateStore.currentTemplateUId ? schemeForm : form;
	if (props.beforeSave && typeof props.beforeSave === 'function') {
		const data = props.beforeSave(_form, items.value);
		emit('save', data);
		return;
	}
	emit('save', _form);
}

const handlePopoverSave = () => {
	templateStore.currentTemplateUId = '';
	if (props.beforeSave && typeof props.beforeSave === 'function') {
		const data = props.beforeSave(form, items.value);
		emit('save', data);
		return;
	}
	emit('save', form);
};

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

const handleTagClose = (field: string) => {
	refForm.value?.resetFields([field]);
	form[field] = null;
	handleSave();
};

defineExpose({
	handleReset,
	handleInitialValue,
	handleFolding,
	getFormData,
	onClickOutside,
	handleSchemeChange,
	handleDeleteTemplate,
	handleQuickSearchClose,
	handleQuickSearch,
	setTemplateList,
	currentTemplateDetails,
	templateStore,
	rawFormData: form,
});
</script>
