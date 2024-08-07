<template>
	<el-form label-position="top" class="percentage-col" :model="formData">
		<div class="file-content">
			<el-form-item label="上传类型" prop="currentType" :rules="[{ required: true, message: '必填项', trigger: 'blur' }]">
				<el-select v-model="formData.currentType" style="width: 100%">
					<el-option v-for="(item, index) in props.multipleTypeConfig.types" :key="index" :label="item.text" :value="item.value"> </el-option>
				</el-select>
			</el-form-item>
			<upload-content
				ref="uploadContentRef"
				v-model:file-list="uploadFiles"
				class="multiple-upload-content"
				v-bind="$attrs"
				:upload-content-style="{ width: '100%', height: '150px' }"
				:before-upload="onBeforeUpload"
				:on-success="handleSuccess"
			/>
		</div>
	</el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'JlgUploadFileModel',
});
</script>
<script setup lang="ts">
import { reactive, PropType, nextTick, ref, defineModel, shallowRef } from 'vue';
import { ElForm, ElFormItem, ElSelect, ElOption, ElMessage } from 'element-plus';
import { uploadProps } from '../use-upload';
import UploadContent from './upload-content.vue';
import { UploadContentInstance, uploadContentProps, type UploadContentProps } from './use-upload-content';
import { isFunction } from 'lodash-unified';
import { I_uploadUserFile, T_uploadUserFiles, UploadRawFile } from '../types';

const emit = defineEmits(['handleBefore']);
const props = defineProps({
	multipleTypeConfig: uploadProps.multipleTypeConfig,
	fileList: {
		type: Array as PropType<T_uploadUserFiles>,
		default: () => [],
	},
	beforeUpload: uploadContentProps.beforeUpload,
	onSuccess: uploadContentProps.onSuccess,
});

const uploadFiles = defineModel<T_uploadUserFiles>('fileList', { default: () => [] });

const formData = reactive({
	currentType: null as any,
});

// multiple-type-card类型下，上传成功后，添加type字段
const handleSuccess: UploadContentProps['onSuccess'] = (response, rawFile) => {
	const typeKey = props.multipleTypeConfig?.typeKey ?? ('type' as string);
	response.content[typeKey] = formData.currentType ?? null;
	// 上传成功后，重新向外部暴露 onSuccess 属性
	if (props.onSuccess && isFunction(props.onSuccess)) {
		nextTick(() => {
			props.onSuccess?.(response, rawFile);
		});
	}
};

async function onBeforeUpload(rawFile: UploadRawFile) {
	if (!formData.currentType) {
		ElMessage.warning('请选择上传类型');
		return false;
	}
	let hookResult = true;
	if (props.beforeUpload && isFunction(props.beforeUpload)) {
		try {
			hookResult = (await props.beforeUpload?.(rawFile)) as boolean;
		} catch (error) {
			hookResult = false;
		}
	}
	if (hookResult) {
		// 上传前的校验通过，触发handleBefore事件
		emit('handleBefore');
	}
	return hookResult;
}

const uploadContentRef = shallowRef<UploadContentInstance>();
function abort(uploadFile?: I_uploadUserFile) {
	return uploadContentRef.value?.abort(uploadFile);
}
defineExpose({
	abort,
	formData,
});
</script>
<style lang="scss" scoped>
@import '../styles/upload-file-model.scss';
</style>
