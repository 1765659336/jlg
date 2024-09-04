<template>
	<div ref="uploadContentRef" class="jlg-upload-content" :class="props.wrapClass" :style="{ ...props.wrapStyle }">
		<div
			:class="['el-upload', 'el-upload--text', props.drag ? 'is-drag' : '']"
			tabindex="0"
			@click="handleClick"
			@keydown.self.enter.space="handleKeydown"
		>
			<template v-if="drag">
				<upload-dragger :disabled="disabled" @file="handleUploadFiles">
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
				</upload-dragger>
			</template>
			<template v-else>
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
			</template>
			<input
				ref="inputRef"
				class="el-upload__input"
				:name="props.name"
				:multiple="props.multiple"
				:accept="props.accept"
				type="file"
				style="display: none"
				@change="handleChange"
				@click.stop
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, defineModel, shallowRef } from 'vue';
import { genFileId, useFormDisabled } from 'element-plus';
import { UploadContentProps, uploadContentProps } from './use-upload-content';
import { cloneDeep, isEqual, isFunction, isPlainObject } from 'lodash-unified';
import UploadDragger from './upload-dragger.vue';
import { entriesOf, I_uploadUserFile, T_uploadUserFiles, UploadHooks, UploadRawFile, UploadRequestOptions } from '../types';
import { Plus } from '@element-plus/icons-vue';

defineOptions({
	name: 'JlgUploadContent',
	inheritAttrs: false,
});
const props = defineProps(uploadContentProps);
const disabled = useFormDisabled();
const requests = shallowRef<Record<string, XMLHttpRequest | Promise<unknown>>>({});
const inputRef = shallowRef<HTMLInputElement>();
const handleUploadFiles = (files: File[]) => {
	if (files.length === 0) return;

	const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;

	if (limit && fileList.length + files.length > limit) {
		onExceed(files, fileList);
		return;
	}

	if (!multiple) {
		files = files.slice(0, 1);
	}

	for (const file of files) {
		const rawFile = file as UploadRawFile;
		rawFile.$uid = genFileId();
		onStart(rawFile);
		if (autoUpload) upload(rawFile);
	}
};

const upload = async (rawFile: UploadRawFile): Promise<void> => {
	inputRef.value!.value = '';

	if (!props.beforeUpload) {
		return doUpload(rawFile);
	}

	let hookResult: Exclude<ReturnType<UploadHooks['beforeUpload']>, Promise<any>>;
	let beforeData: UploadContentProps['data'] = {};

	try {
		// origin data: Handle data changes after synchronization tasks are executed
		const originData = props.data;
		const beforeUploadPromise = props.beforeUpload(rawFile);
		beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data;
		hookResult = await beforeUploadPromise;
		if (isPlainObject(props.data) && isEqual(originData, beforeData)) {
			beforeData = cloneDeep(props.data);
		}
	} catch {
		hookResult = false;
	}

	if (hookResult === false) {
		props.onRemove(rawFile);
		return;
	}

	let file: File = rawFile;
	if (hookResult instanceof Blob) {
		if (hookResult instanceof File) {
			file = hookResult;
		} else {
			file = new File([hookResult], rawFile.name, {
				type: rawFile.type,
			});
		}
	}

	await doUpload(
		Object.assign(file, {
			$uid: rawFile.$uid,
		}),
		beforeData
	);
};

const resolveData = async (data: UploadContentProps['data'], rawFile: UploadRawFile): Promise<Record<string, any>> => {
	if (isFunction(data)) {
		return data(rawFile);
	}

	return data;
};

const doUpload = async (rawFile: UploadRawFile, beforeData?: UploadContentProps['data']) => {
	const { headers, data, method, withCredentials, name: filename, action, onProgress, onSuccess, onError, httpRequest } = props;

	try {
		beforeData = await resolveData(beforeData ?? data, rawFile);
	} catch {
		props.onRemove(rawFile);
		return;
	}

	const { $uid } = rawFile;
	const options: UploadRequestOptions = {
		headers: (headers as Record<string, any>) || {},
		withCredentials,
		file: rawFile,
		data: beforeData,
		method,
		filename,
		action,
		onProgress: (evt) => {
			onProgress(evt, rawFile);
		},
		onSuccess: (res) => {
			onSuccess(res, rawFile);
			delete requests.value[$uid];
		},
		onError: (err) => {
			onError(err, rawFile);
			delete requests.value[$uid];
		},
	};
	const request = httpRequest(options);
	requests.value[$uid] = request;
	if (request instanceof Promise) {
		request.then(options.onSuccess, options.onError);
	}
};

const handleChange = (e: Event) => {
	const files = (e.target as HTMLInputElement).files;
	if (!files) return;
	handleUploadFiles(Array.from(files));
};

const handleClick = () => {
	debugger;
	if (!disabled.value) {
		inputRef.value!.value = '';
		inputRef.value!.click();
	}
};

const handleKeydown = () => {
	handleClick();
};

const abort = (file?: I_uploadUserFile) => {
	const _reqs = entriesOf(requests.value).filter(file ? ([$uid]) => String(file.$uid) === $uid : () => true);
	_reqs.forEach(([$uid, req]) => {
		if (req instanceof XMLHttpRequest) req.abort();
		delete requests.value[$uid];
	});
};

/**
 * @description 监听上传状态
 * @param {boolean} isLoading 是否正在上传（成功或失败都返回false，上传中返回 true）
 * */
const fileList = defineModel<T_uploadUserFiles>('fileList', { default: () => [] });
const isLoading = computed(() => {
	return fileList.value.some((item) => item.status === 'uploading');
});
watch(isLoading, (v) => {
	if (props.onUploadingStatus && isFunction(props.onUploadingStatus)) {
		props.onUploadingStatus(v);
	}
});

const placeholderText = computed(() => {
	if (props.drag) {
		return props.text || '点击或拖拽文件到此区域上传';
	}
	return props.text || '点击此区域上传';
});

defineExpose({
	abort,
	upload,
	isLoading,
});
</script>

<style lang="scss">
@import '../styles/upload-content.scss';
</style>
