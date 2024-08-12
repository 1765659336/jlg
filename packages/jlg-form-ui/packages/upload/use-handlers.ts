import type { UploadContentInstance, UploadContentProps } from './components/use-upload-content';
import type { UploadStatus } from 'element-plus';
import { genFileId, ElMessage } from 'element-plus';
import { isNil } from 'lodash-unified';
import { Ref, ShallowRef } from 'vue';
import { watch } from 'vue';
import { UploadAllProps } from './use-upload';
import { I_uploadUserFile, T_uploadUserFiles, UploadRawFile } from './types';
const revokeFileObjectURL = (file: I_uploadUserFile) => {
	if (file.url?.startsWith('blob:')) {
		URL.revokeObjectURL(file.url);
	}
};
export const useHandlers = (props: UploadAllProps, uploadRef: ShallowRef<UploadContentInstance | undefined>, uploadFiles: Ref<T_uploadUserFiles>) => {
	const getFile = (rawFile: UploadRawFile) => uploadFiles.value.find((file) => file.$uid === rawFile.$uid);
	const getFileIndex = (rawFile: UploadRawFile) => uploadFiles.value.findIndex((file) => file.$uid === rawFile.$uid);

	function abort(file: I_uploadUserFile) {
		uploadRef.value?.abort(file);
	}

	function clearFiles(
		/** @default ['ready', 'uploading', 'success', 'fail'] */
		states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail']
	) {
		// uploadFiles.value = uploadFiles.value.filter((row) => !states.includes(row.status));
		/**
		 * @description fix: 直接修改 uploadFiles.value 可能会导致 uploadFiles.value 的实际值与修改后的值不一致,具体原因并不清楚,所以改成 splice
		 * @description uploadFiles.value = [];
		 * @description 按照直觉来说,这里下面代码打印出来的 uploadFiles.value.length 应该是 0,但是实际上是 大于 0
		 * @description  console.log('uploadFiles.value', uploadFiles.value.length, states);
		 *
		 *  */
		for (let i = uploadFiles.value.length - 1; i >= 0; i--) {
			if (states.includes(uploadFiles.value[i].status)) {
				uploadFiles.value.splice(i, 1);
			}
		}
	}

	const handleError: UploadContentProps['onError'] = (err, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;
		file.status = 'fail';
		uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1);
		props.onError(err, file, uploadFiles.value);
		props.onChange(file, uploadFiles.value);
	};

	const handleProgress: UploadContentProps['onProgress'] = (evt, rawFile) => {
		const file = getFile(rawFile);
		if (!file) return;

		props.onProgress(evt, file, uploadFiles.value);
		file.status = 'uploading';
		file.percentage = Math.round(evt.percent);
	};

	const handleSuccess: UploadContentProps['onSuccess'] = (response, rawFile) => {
		const { status, content } = response;
		if (status === 1) {
			const index = getFileIndex(rawFile);
			if (index === -1) return;
			uploadFiles.value[index] = {
				...content,
				status: 'success',
			};
			const file = uploadFiles.value[index];
			props.onSuccess(response, file, uploadFiles.value);
			props.onChange(file, uploadFiles.value);
		} else {
			ElMessage.error('上传失败!');
		}
	};

	const handleStart: UploadContentProps['onStart'] = (file) => {
		if (isNil(file.$uid)) file.$uid = genFileId();
		const uploadFile: I_uploadUserFile = {
			name: file.name,
			percentage: 0,
			status: 'ready',
			size: file.size,
			raw: file,
			$uid: file.$uid,
		};
		uploadFiles.value = [...uploadFiles.value, uploadFile];
		props.onChange(uploadFile, uploadFiles.value);
	};

	const handleRemove: UploadContentProps['onRemove'] = async (file): Promise<void> => {
		const uploadFile = file instanceof File ? getFile(file) : file;
		if (!uploadFile) throw new Error('未找到要删除的文件');

		const doRemove = (file: I_uploadUserFile) => {
			abort(file);
			const fileList = uploadFiles.value;
			fileList.splice(fileList.indexOf(file), 1);
			props.onRemove(file, fileList);
			revokeFileObjectURL(file);
		};

		if (props.beforeRemove) {
			const before = await props.beforeRemove(uploadFile, uploadFiles.value);
			if (before !== false) doRemove(uploadFile);
		} else {
			doRemove(uploadFile);
		}
	};

	function submit() {
		uploadFiles.value.filter(({ status }) => status === 'ready').forEach(({ raw }) => raw && uploadRef.value?.upload(raw));
	}

	watch(
		uploadFiles,
		(files) => {
			for (const file of files) {
				file.$uid ||= genFileId();
				file.status ||= 'success';
			}
		},
		{ immediate: true, deep: true }
	);

	return {
		abort,
		clearFiles,
		handleError,
		handleProgress,
		handleStart,
		handleSuccess,
		handleRemove,
		submit,
		revokeFileObjectURL,
	};
};
