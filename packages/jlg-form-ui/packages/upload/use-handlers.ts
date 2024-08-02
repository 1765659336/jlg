import type { UploadContentProps } from './components/use-upload-content';
import { useUtils } from './utils';
import { ElMessage, UploadProps } from 'element-plus';
import { isFunction } from 'lodash-unified';

export const useHandlers = (props: UploadContentProps, fileList: any) => {
	const { checkFileType } = useUtils('');
	const beforeUpload: UploadProps['beforeUpload'] = async (rawFile) => {
		// 校验文件类型
		if (props.fileType) {
			const fileExtension = checkFileType(rawFile.name);
			const isTypeOk = props.fileType.some((type: string) => {
				return fileExtension && fileExtension.indexOf(type) > -1;
			});
			if (!isTypeOk) {
				ElMessage.warning(`文件格式不正确，请上传${props.fileType.join('/')}格式文件`);
				return false;
			}
		}
		let hookResult = true;
		if (props.beforeUpload) {
			try {
				hookResult = (await props.beforeUpload(rawFile)) as boolean;
			} catch (error) {
				hookResult = false;
			}
		}
		// if (props.disabled === true) return false;
		return hookResult;
	};

	const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
		props.onRemove && props.onRemove(file, uploadFiles);
	};

	const handleChange: UploadProps['onChange'] = (file, uploadFiles) => {
		props.onChange && props.onChange(file, uploadFiles);
	};

	const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
		props.onPreview && props.onPreview(uploadFile);
	};

	const handleSuccess: UploadProps['onSuccess'] = async (response, uploadFile, uploadFiles) => {
		const { status, content } = response;
		if (status === 1) {
			if (props.onSuccess && isFunction(props.onSuccess)) {
				await props.onSuccess(response, uploadFile, uploadFiles);
			}
			const index = fileList.value.findIndex((item: any) => item.uid === uploadFile.uid);
			fileList.value[index] = {
				...content,
				status: response.status,
			};
		} else {
			ElMessage.error('上传失败!');
		}
	};

	const handleProgress: UploadProps['onProgress'] = (uploadProgressEvent, uploadFile, uploadFiles) => {
		props.onProgress && props.onProgress(uploadProgressEvent, uploadFile, uploadFiles);
	};
	const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
		// 自定义超出限制时的钩子函数
		if (props.onExceed && isFunction(props.onExceed)) {
			props.onExceed(files, uploadFiles);
		} else {
			ElMessage.warning(`当前限制选择 ${props.limit} 个, 本次选择了 ${files.length}个文件, 加起来是 ${files.length + uploadFiles.length} 个文件`);
		}
	};

	return {
		beforeUpload,
		handleRemove,
		handleChange,
		handlePreview,
		handleSuccess,
		handleProgress,
		handleExceed,
	};
};
