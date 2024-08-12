<template>
	<vxe-modal
		:model-value="modelVisible"
		title="导出"
		class-name="jlg-table-export-popup-wrapper"
		width="720"
		show-footer
		mask
		lock-view
		@show="showEvent"
		@close="cancelExportPanel"
	>
		<template v-if="(reactData.isLoading || reactData.isExporting) && GlobalConfig.modal?.loadingComponent">
			<component :is="GlobalConfig.modal.exportLoadingComponent" v-bind="$export" />
		</template>
		<div class="jlg-export--panel">
			<div class="jlg-export--panel__header">
				<el-checkbox v-model="reactData.checkAll" :indeterminate="reactData.isIndeterminate" @change="handleCheckAllChange"
					>选择需要导出的字段：</el-checkbox
				>
			</div>
			<div class="jlg-export--panel__content">
				<el-checkbox-group v-model="reactData.checkedFields" @change="handleCheckedChange">
					<el-checkbox v-for="item in reactData.config" :key="item.dynamicPageColUid" :value="item.dynamicPageColUid">
						<span class="text" :title="item.displayName">{{ item.displayName }}</span>
					</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<!--   窗口底部的模板 -->
		<template #footer>
			<div class="modal--footer">
				<div class="modal--footer__left">
					<el-checkbox v-model="reactData.isSaveConfig">记住本次选择</el-checkbox>
				</div>
				<div class="modal--footer__right">
					<el-button @click="cancelExportPanel">取消</el-button>
					<el-button type="primary" :loading="reactData.isExporting" @click="confirm">确定</el-button>
				</div>
			</div>
		</template>
	</vxe-modal>
</template>
<script setup lang="ts">
import { I_Table_Export_Panel_Props, I_Table_Export_React_Data, JlgTableExportConstructor } from './type';
import { reactive } from 'vue';
import { uniqueId } from 'xe-utils';
import GlobalConfig from '../../../lib/useGlobalConfig';
import { ElButton } from 'element-plus';

defineOptions({
	name: 'JlgTableExportPanel',
});

const props = withDefaults(defineProps<I_Table_Export_Panel_Props>(), {
	sortFieId: () => GlobalConfig.table?.exportConfig?.sortFieId || 'sortIndex',
});
const xID = uniqueId();
const reactData = reactive<I_Table_Export_React_Data>({
	checkAll: true,
	checkedFields: [],
	config: [],
	isIndeterminate: false,
	isLoading: false,
	isExporting: false,
	isSaveConfig: false,
});
const modelVisible = ref(false);

const handleCheckAllChange = (val: boolean) => {
	reactData.checkedFields = val ? reactData.config.map((item) => item.dynamicPageColUid) : [];
	reactData.isIndeterminate = false;
};
const handleCheckedChange = (value: string[]) => {
	const checkedCount = value.length;
	reactData.checkAll = checkedCount === reactData.config.length;
	reactData.isIndeterminate = checkedCount > 0 && checkedCount < reactData.config.length;
};

const showEvent = async () => {
	reactData.isLoading = true;
	Promise.resolve(props.getExportConfig?.())
		.then((config) => {
			if (config) {
				reactData.config = config;
				reactData.checkedFields = reactData.config.filter((item) => item.isExportCol).map((item) => item.dynamicPageColUid);
				handleCheckedChange(reactData.checkedFields);
			} else {
				throw new Error('[jlg-grid] 获取导出配置失败');
			}
		})
		.catch((e) => {
			throw new Error(e);
		})
		.finally(() => {
			reactData.isLoading = false;
		});
};

const confirm = () => {
	reactData.isExporting = true;
	const columns = props.xGrid.getColumns();
	const orderByData = columns.reduce((previousValue, currentValue, currentIndex) => {
		// 普通页面默认使用 field,动态页面使用 dbFieldName
		const field = currentValue.params?.dbFieldName ?? currentValue.field;
		previousValue[field] = currentIndex;
		return previousValue;
	}, {});
	const data = reactData.config.filter((item, index) => {
		item.isExportCol = 0;
		item[props.sortFieId] = orderByData[item.dbFieldName] ?? index;
		if (reactData.checkedFields.includes(item.dynamicPageColUid)) {
			item.isExportCol = 1;
			return item;
		}
		return false;
	});
	props.saveExportConfig({
		data: data,
		$export,
	});
};
// 打开弹窗
const openExportPanel = () => {
	modelVisible.value = true;
};
const cancelExportPanel = () => {
	modelVisible.value = false;
};

const $export: JlgTableExportConstructor = {
	xID,
	props,
	reactData,
	openExportPanel,
	cancelExportPanel,
};
defineExpose($export);
</script>
