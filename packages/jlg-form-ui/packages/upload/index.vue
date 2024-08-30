<!-- 文件上传 -->
<template>
	<div v-if="props.type === 'multiple-type-card'" class="multiple-type-card" :data-jlg-form-item="props.propsName">
		<el-container>
			<el-aside v-if="props.multipleTypeConfig.showAside !== false" width="200px">
				<file-type-list v-bind="props.multipleTypeConfig" ref="fileTypeListRef" />
			</el-aside>
			<el-main :class="{ 'multiple-card-main': props.multipleTypeConfig?.showAside !== false }">
				<div class="w-full flex flex-wrap">
					<upload-content
						v-if="props.showContent !== false"
						ref="uploadContentRef"
						v-model:file-list="uploadFiles"
						:class="{ 'multiple-upload-content': !props.disabled }"
						:wrap-style="{ marginRight: '12px', marginBottom: '12px' }"
						:disabled="true"
						:drag="false"
						@click.stop="showFileModalFunc"
					>
						<slot name="trigger" />
					</upload-content>
					<template v-if="props.showFileList">
						<slot name="uploadList" :file-list="siftUploadFiles">
							<upload-list
								:file-list="siftUploadFiles"
								:type-key="props.multipleTypeConfig?.typeKey"
								:block-style="props.uploadContentStyle"
								:show-download="props.showDownload"
								:upload-show-path="props.uploadShowPath"
								:on-preview="props?.onPreview || null"
								:only-office-file-list="props?.onlyOfficeFileList || null"
								:disabled="props.disabled"
								@delete="onDeleteFileEvent"
							/>
						</slot>
					</template>
				</div>
			</el-main>
		</el-container>
		<el-dialog
			v-model="showFileModal"
			class="jlg-upload-file-modal"
			style="--el-dialog-padding-primary: 10px"
			width="420"
			min-width="350"
			draggable
			lock-scroll
			:show-close="false"
			:close-on-press-escape="false"
			:close-on-click-modal="false"
			@open="onOpened"
		>
			<template #header="{ close }">
				<div class="modal--header">
					<div class="modal--header-title">上传附件</div>
					<div class="modal--header-right">
						<i class="modal--close-btn trigger--btn vxe-icon-close" title="关闭" @click="close"></i>
					</div>
				</div>
			</template>
			<template #default>
				<slot name="modalContainer">
					<upload-file-model
						ref="uploadFileModelRef"
						v-bind="uploadContentProps"
						v-model:file-list="uploadFiles"
						:multiple-type-config="props.multipleTypeConfig"
						:before-upload="props.beforeUpload"
						:on-success="handleSuccess"
						@handle-before="handleBefore"
					/>
				</slot>
			</template>
		</el-dialog>
	</div>

	<div v-else class="flex flex-wrap" :data-jlg-form-item="props.propsName">
		<upload-content
			v-if="props.showContent !== false"
			ref="uploadRef"
			v-bind="uploadContentProps"
			v-model:file-list="uploadFiles"
			:wrap-style="{ marginRight: '12px', marginBottom: '12px' }"
		>
			<slot name="trigger" />
		</upload-content>
		<template v-if="props.showFileList">
			<slot name="uploadList" :file-list="uploadFiles">
				<upload-list
					:file-list="uploadFiles"
					:block-style="props.uploadContentStyle"
					:show-download="props.showDownload"
					:upload-show-path="props.uploadShowPath"
					:on-preview="props?.onPreview || null"
					:only-office-file-list="props?.onlyOfficeFileList || null"
					:disabled="props.disabled"
					@delete="onDeleteFileEvent"
				/>
			</slot>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'JlgUpload',
});
</script>
<script lang="ts" setup>
import { computed, defineModel, shallowRef, ref } from 'vue';
import { FormItemContext, formItemContextKey, uploadContextKey } from 'element-plus';
import { ElAside, ElContainer, ElMain, ElDialog } from 'element-plus';
import UploadContent from './components/upload-content.vue';
import UploadList from './components/upload-list.vue';
import FileTypeList from './components/file-type-list.vue';
import UploadFileModel from './components/upload-file-model.vue';

import { uploadProps } from './use-upload';
import { T_Add_Gather_Fn } from '../form/type';
import { useHandlers } from './use-handlers';
import { UploadContentInstance, UploadContentProps } from './components/use-upload-content';
import { I_uploadUserFile, T_uploadUserFiles } from './types';

const uploadFileModelRef = ref<any>();

const props = defineProps(uploadProps);

const uploadFiles = defineModel<T_uploadUserFiles>('fileList', { default: () => [] });
const uploadRef = shallowRef<UploadContentInstance>();
const { abort, submit, clearFiles, handleStart, handleError, handleRemove, handleSuccess, handleProgress, revokeFileObjectURL } = useHandlers(
	props,
	uploadRef,
	uploadFiles
);

const uploadContentProps = computed<UploadContentProps>(() => ({
	...props,
	fileList: uploadFiles.value,
	onStart: handleStart,
	onProgress: handleProgress,
	onSuccess: handleSuccess,
	onError: handleError,
	onRemove: handleRemove,
}));

onBeforeUnmount(() => {
	uploadFiles.value.forEach(revokeFileObjectURL);
});

const accept = computed(() => {
	if (props.accept) {
		return props.accept;
	}
	return '';
});
provide(uploadContextKey, {
	accept: accept,
});

const showFileModal = ref(false);

function showFileModalFunc() {
	if (!props.disabled) showFileModal.value = true;
}

const fileTypeListRef = ref<{ fileType: number }>();

const siftUploadFiles = computed(() => {
	const fileType = fileTypeListRef.value?.fileType ?? null;
	if (props.type === 'multiple-type-card' && fileType !== null) {
		return uploadFiles.value.filter((file) => {
			const typeKey = props.multipleTypeConfig?.typeKey ?? ('type' as string);
			return file.status === 'uploading' || file[typeKey] === fileTypeListRef.value?.fileType;
		});
	} else {
		return uploadFiles.value;
	}
});

function onOpened() {
	nextTick(() => {
		if (uploadFileModelRef.value && props.type === 'multiple-type-card') {
			if (uploadFileModelRef.value?.formData) {
				// Dialog 打开时，重置上传文件类型
				uploadFileModelRef.value!.formData.currentType = null;
			}
		}
	});
}

function handleBefore() {
	showFileModal.value = false;
}

// 删除文件
function onDeleteFileEvent(uploadFile: I_uploadUserFile) {
	if (uploadFile.status === 'uploading' || uploadFile.status === 'ready') {
		// 如果文件正在上传或者等待上传，点击关闭按钮时调用abort方法停止上传
		if (uploadFileModelRef.value && props.type === 'multiple-type-card') {
			uploadFileModelRef.value!.abort(uploadFile);
		} else {
			uploadRef.value?.abort(uploadFile);
		}
	}
	handleRemove(uploadFile);
}

defineExpose({
	epRef: uploadRef,
	onDeleteFileEvent,
	/** @description 取消上传请求 */
	abort,
	/** @description 手动上传文件列表*/
	submit,
	/** @description 清除文件列表  */
	clearFiles,
	/** @description 手动选择文件 */
	handleStart,
	/** @description 手动删除文件 */
	handleRemove,
});

// formItem传递的context
const context: FormItemContext | undefined = inject(formItemContextKey);
const formAddGatherFn: T_Add_Gather_Fn | undefined = inject('formAddGatherFn');
onMounted(() => {
	const label = context?.label ?? props.gatherProps?.label;
	formAddGatherFn &&
		formAddGatherFn({
			formItemLabel: label ?? '',
			fn() {
				return {
					label: props.propsName,
					remotePath: uploadContentProps.value.uploadShowPath,
					value: uploadFiles.value,
					realValue: uploadFiles.value,
					type: 'up-load',
					...(props.gatherProps as Record<string, any>),
				};
			},
		});
});
</script>
<style lang="scss" scoped>
@import './styles/uno-css';
@import './styles/index';
</style>
<style lang="scss">
// 重置 el-dialog 样式
.jlg-upload-file-modal {
	.el-dialog__header {
		padding: 0;
		margin-right: 0;
	}
}
</style>
