<template>
	<div ref="uploadContentRef" class="jlg-upload-content">
		<el-upload
			ref="upload"
			v-model:file-list="fileList"
			:name="props.name"
			:data="props.data || {}"
			:headers="props.headers || {}"
			:action="props.action"
			:multiple="props.multiple"
			:before-upload="beforeUpload"
			:limit="props.limit"
			:disabled="props.disabled"
			:show-file-list="false"
			:drag="props.drag"
			:auto-upload="props.autoUpload"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:on-progress="handleProgress"
			:on-change="handleChange"
			:on-success="handleSuccess"
			:on-exceed="handleExceed"
		>
			<slot>
				<div :class="{ 'file-upload-container': true, 'is-disabled': props.disabled }" :style="{ ...props.uploadContentStyle }">
					<div class="uploader">
						<el-icon color="#ECEDED" size="20px">
							<Plus class="uploader-icon" />
						</el-icon>
						<p class="uploader-text">{{ placeholderText }}</p>
					</div>
				</div>
			</slot>
		</el-upload>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'JlgUploadContent',
});
</script>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { ElIcon, ElUpload, UploadInstance, UploadUserFile } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { uploadContentProps } from './use-upload-content';
import { useHandlers } from '../use-handlers';
import { isFunction } from 'lodash-unified';

const props = defineProps(uploadContentProps);
// 上传组件实例
const upload = ref<UploadInstance>();
const fileList = defineModel('fileList', { type: Array<UploadUserFile & { [x: string]: any }> });

/**
 * @description 监听上传状态
 * @param {boolean} isLoading 是否正在上传（成功或失败都返回false，上传中返回 true）
 * */
const isLoading = computed(() => {
	return fileList.value.some((item) => item.status === 'uploading');
});
watch(isLoading, (v) => {
	if (props.onUploadingStatus && isFunction(props.onUploadingStatus)) {
		props.onUploadingStatus(v);
	}
});

// 手动打开文件选择面板
const uploadContentRef = ref<HTMLDivElement>();
const openFilePanel = () => {
	const elUploadDragDom = uploadContentRef.value!.querySelector('.el-upload-dragger') as HTMLDivElement;
	elUploadDragDom?.click();
};

const placeholderText = computed(() => {
	if (props.drag) {
		return props.text || '点击或拖拽文件到此区域上传';
	}
	return props.text || '点击此区域上传';
});

const { beforeUpload, handleRemove, handleChange, handlePreview, handleSuccess, handleProgress, handleExceed } = useHandlers(props, fileList);

defineExpose({
	upload,
	isLoading,
	openFilePanel,
});
</script>

<style lang="scss" scoped>
@import '../styles/upload-content.scss';
</style>
