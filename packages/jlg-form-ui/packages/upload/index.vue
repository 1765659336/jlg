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
						style="margin-right: 12px; margin-bottom: 12px"
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
						v-bind="contentProps"
						v-model:file-list="uploadFiles"
						:multiple-type-config="props.multipleTypeConfig"
						@handle-before="handleBefore"
					/>
				</slot>
			</template>
		</el-dialog>
	</div>

	<div v-else class="flex flex-wrap" :data-jlg-form-item="props.propsName">
		<upload-content
			v-if="props.showContent !== false"
			ref="uploadContentRef"
			v-bind="contentProps"
			v-model:file-list="uploadFiles"
			style="margin-right: 12px; margin-bottom: 12px"
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
import { computed, nextTick, ref } from 'vue';
import { FormItemContext, formItemContextKey, UploadFile, UploadFiles } from 'element-plus';
import { ElAside, ElContainer, ElMain, ElDialog, UploadUserFile } from 'element-plus';
import { isFunction } from 'lodash-unified';
import UploadContent from './components/upload-content.vue';
import UploadList from './components/upload-list.vue';
import FileTypeList from './components/file-type-list.vue';
import UploadFileModel from './components/upload-file-model.vue';

import { uploadProps } from './use-upload';
import { T_Add_Gather_Fn } from '../form/type';

const props = defineProps(uploadProps);
const uploadContentRef = ref<any>();
const uploadFileModelRef = ref<any>();

const uploadFiles = defineModel('fileList', { type: Array<UploadUserFile> });

const contentProps = computed(() => ({
	...props,
	fileList: uploadFiles.value,
}));

const showFileModal = ref(false);
function showFileModalFunc() {
	if (!props.disabled) showFileModal.value = true;
}

const fileTypeListRef = ref<{ fileType: number }>();

const siftUploadFiles = computed(() => {
	const fileType = fileTypeListRef.value?.fileType ?? null;
	if (props.type === 'multiple-type-card' && fileType !== null) {
		return (uploadFiles.value as UploadFiles).filter((file: Record<string, any>) => {
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
function onDeleteFileEvent(uploadFile: UploadFile) {
	const index = uploadFiles.value.findIndex((item: Partial<UploadFile>) => item.uid === uploadFile.uid);
	uploadFiles.value.splice(index, 1);
	if (uploadFile.status === 'uploading' || uploadFile.status === 'ready') {
		// 如果文件正在上传或者等待上传，点击关闭按钮时调用abort方法停止上传
		if (uploadFileModelRef.value && props.type === 'multiple-type-card') {
			uploadFileModelRef.value!.abort(uploadFile);
		} else {
			uploadContentRef.value!.upload?.abort(uploadFile);
		}
	}
	if (props.onRemove && isFunction(props.onRemove)) {
		props.onRemove(uploadFile, uploadFiles.value as UploadFiles);
	}
}
defineExpose({
	epRef: uploadContentRef,
	onDeleteFileEvent,
});

// formItem传递的context
const context: FormItemContext | undefined = inject(formItemContextKey);
const formAddGatherFn: T_Add_Gather_Fn | undefined = inject('formAddGatherFn');
onMounted(() => {
	formAddGatherFn &&
		formAddGatherFn({
			formItemLabel: context.label,
			fn() {
				return {
					label: props.propsName,
					remotePath: contentProps.value.uploadShowPath,
					value: uploadFiles.value,
					realValue: uploadFiles.value,
					type: 'up-load',
					...props.gatherProps,
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
