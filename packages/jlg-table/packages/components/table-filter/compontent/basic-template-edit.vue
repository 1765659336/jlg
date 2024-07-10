<template>
	<div class="jlg-basic_template--edit">
		<el-scrollbar class="top-wrap">
			<div class="item-wrap">
				<div v-for="(item, index) in computedTemplateDetails.userSearchTemplateDetails" :key="item.dynamicPageColUid" class="item-flex--wrap">
					<el-select v-model="item.dynamicPageColUid" @change="() => getSearchTypes(item, false)">
						<el-option
							v-for="item2 in props.items"
							:key="item2.field"
							:value="item2.params.dynamicPageColUid"
							:label="item2.title"
							:disabled="isExists(item2.params.dynamicPageColUid)"
						></el-option>
					</el-select>
					<el-select v-if="!!item.dynamicPageColUid" v-model="item.searchType" @change="() => handleSelectToChange(item)">
						<el-option
							v-for="item3 in dynamicPageColMap[item.dynamicPageColUid]?.options ?? []"
							:key="item3.value"
							:value="item3.value"
							:label="item3.label"
						></el-option>
					</el-select>
					<component
						:is="useRenderContentTitle(dynamicPageColMap[item.dynamicPageColUid].type)"
						v-if="!!dynamicPageColMap[item.dynamicPageColUid]?.type"
						v-model="item.defaultValue"
						v-model:search-type="item.searchType"
						style="width: 200px; margin-right: 20px"
						:item="dynamicPageColMap[item.dynamicPageColUid].item"
						:show-label="false"
						:show-select="false"
					/>
					<div class="handle-wrap">
						<el-icon :size="18" @click="handleDeleteClick(index)"><Close /></el-icon>
					</div>
				</div>
			</div>
			<div class="button-wrap">
				<span v-if="props.items.length" class="text-add-button" @click="handleAddEvent">
					<el-icon>
						<Plus></Plus>
					</el-icon>
					添加条件
				</span>
			</div>
		</el-scrollbar>
		<div class="bottom-wrap">
			<div class="bottom-wrap-item">
				<label class="item-label">筛选方案</label>
				<el-input v-model="computedTemplateDetails.templateName"></el-input>
			</div>
			<el-button class="save-btn" @click="handleButtonEvent('save')">保存</el-button>
			<el-button class="cancel-btn" @click="() => handleButtonEvent('cancel')">{{ computedTemplateDetails.templateUid ? '删除' : '取消' }}</el-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
import { ElScrollbar, ElIcon, ElButton, ElSelect, ElOption, ElMessage } from 'element-plus';
import { Close, Plus } from '@element-plus/icons-vue';
import type { I_Table_Filter_Item, I_User_Search_Template_Model, I_User_Search_Template_Details_Model } from '../type';
import { SEARCH_TYPES } from '../constants';
import { useRenderContentTitle } from '../hooks/usePopover';
defineOptions({
	name: 'BasicTemplateEdit',
});
const props = defineProps<{
	items: I_Table_Filter_Item[];
}>();

const emit = defineEmits<{
	save: [data: I_User_Search_Template_Model];
	cancelEvent: [data: I_User_Search_Template_Model];
}>();

const currentTemplateDetails = defineModel<I_User_Search_Template_Model | null>('currentTemplateDetails', { required: true });
const newTemplateDetails = ref<I_User_Search_Template_Model>({
	templateUid: '',
	templateName: '',
	userSearchTemplateDetails: [],
});
const computedTemplateDetails = computed({
	get: () => {
		return currentTemplateDetails.value ?? newTemplateDetails.value;
	},
	set: () => {},
});

const handleAddEvent = () => {
	const item: I_User_Search_Template_Details_Model = {
		dbFieldName: '',
		dynamicPageColUid: '',
		searchType: 0,
		defaultValue: null,
	};
	if (currentTemplateDetails.value) {
		currentTemplateDetails.value.userSearchTemplateDetails.push(item);
		return;
	}
	newTemplateDetails.value.userSearchTemplateDetails.push(item);
};

type SearchType = {
	options: Array<{ label: string; value: number }>;
	type: I_Table_Filter_Item['type'];
	item: I_Table_Filter_Item;
};
const dynamicPageColMap = reactive<Record<string, SearchType>>({});
const getSearchTypes = (searchItem: I_User_Search_Template_Details_Model, isInit?: boolean) => {
	// 恢复默认
	if (!isInit) {
		searchItem.searchType = 0;
		handleSelectToChange(searchItem);
	}

	const findItem = props.items.find((item) => item.params.dynamicPageColUid === searchItem.dynamicPageColUid);
	searchItem.dbFieldName = findItem?.params.dbFieldName ?? '';
	const type = findItem?.type ?? 'text';
	dynamicPageColMap[searchItem.dynamicPageColUid] = {
		options: SEARCH_TYPES[type] ?? [],
		type: type,
		item: findItem,
	};
};

const isExists = (dynamicPageColUid: string) => {
	if (!dynamicPageColMap[dynamicPageColUid]) {
		return false;
	}
	return !!computedTemplateDetails.value.userSearchTemplateDetails.some((item) => item.dynamicPageColUid === dynamicPageColUid);
};

const handleSelectToChange = (searchItem: I_User_Search_Template_Details_Model) => {
	// 选择器改变时，清空默认值
	searchItem.defaultValue = null;
};

const handleDeleteClick = (index: number) => {
	computedTemplateDetails.value.userSearchTemplateDetails.splice(index, 1);
};

const handleButtonEvent = (type: 'save' | 'cancel') => {
	if (type === 'save') {
		if (computedTemplateDetails.value.templateName === '' || computedTemplateDetails.value.templateName == null) {
			ElMessage.warning('请输入筛选方案名称');
			return;
		}
		if (computedTemplateDetails.value.userSearchTemplateDetails.length === 0) {
			ElMessage.warning('请添加筛选条件');
			return;
		}
		const isError = computedTemplateDetails.value.userSearchTemplateDetails.some((item, index) => {
			const _index = index + 1;
			if (!item.dynamicPageColUid) {
				ElMessage.warning(`请选择第${_index}项筛选条件`);
				return true;
			}
			if (!item.defaultValue) {
				ElMessage.warning(`请输入第${_index}项筛选条件值`);
				return true;
			}
			return false;
		});
		if (isError) return;
		emit('save', computedTemplateDetails.value);
	} else {
		emit('cancelEvent', computedTemplateDetails.value);
	}
};
// 数据还原
watch(
	() => currentTemplateDetails.value?.templateUid,
	(value) => {
		if (value) {
			currentTemplateDetails.value.userSearchTemplateDetails.forEach((item) => {
				getSearchTypes(item, true);
			});
		}
	},
	{
		immediate: true,
	}
);

// 将 newTemplateDetails 恢复默认
const resetNewTemplateDetails = () => {
	newTemplateDetails.value = {
		templateUid: '',
		templateName: '',
		userSearchTemplateDetails: [],
	};
};

defineExpose({
	resetNewTemplateDetails,
});
</script>
