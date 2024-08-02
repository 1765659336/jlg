import { PropType, ExtractPropTypes } from 'vue';
import { UploadHooks, UploadUserFile } from 'element-plus';
import { I_fileListType } from './use-upload-list';
import { globalComponentConfig } from '../../index';

export const uploadContentEmits = [];
export const uploadContentProps = {
	// 上传区域的提示文本
	text: {
		type: String,
		default: () => globalComponentConfig.upload.text,
	},
	// 请求 URL
	action: {
		type: String,
		default: () => globalComponentConfig.upload.action,
	},
	uploadContentStyle: {
		type: Object,
		default: () => globalComponentConfig.upload.uploadContentStyle,
	},
	// 上传文件数量
	limit: {
		type: Number,
		default: () => globalComponentConfig.upload.limit,
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false,
	},
	// 是否允许多选
	multiple: {
		type: Boolean,
		default: () => globalComponentConfig.upload.multiple,
	},
	// 单个上传文件大小限制(M)
	fileSize: {
		type: Number,
		default: () => globalComponentConfig.upload.fileSize,
	},
	// 允许上传的文件类型, 例如['png', 'jpg', 'jpeg']
	fileType: {
		type: Array as PropType<string[] | null | undefined | false>,
		default: () => globalComponentConfig.upload.fileType,
	},
	// 上传列表
	fileList: {
		type: Array as PropType<Array<UploadUserFile & { [x: string]: any }>>,
		default: () => [],
	},
	// 上传文件的额外参数
	data: {
		type: Object as PropType<Record<string, any>>,
		default: () => globalComponentConfig.upload.data,
	},
	// 上传的文件字段名
	name: {
		type: String,
		default: () => globalComponentConfig.upload.name,
	},
	// 是否允许拖拽上传
	drag: {
		type: Boolean,
		default: () => globalComponentConfig.upload.drag,
	},
	// 是否自动上传
	autoUpload: {
		type: Boolean,
		default: () => globalComponentConfig.upload.autoUpload,
	},
	// 设置上传的请求头部
	headers: {
		type: Object as PropType<Record<string, any>>,
		default: () => ({}),
	},
	beforeUpload: {
		type: Function as PropType<UploadHooks['beforeUpload']>,
		default: () => globalComponentConfig.upload.beforeUpload,
	},
	beforeRemove: {
		type: Function as PropType<UploadHooks['beforeRemove']>,
		default: () => globalComponentConfig.upload.beforeRemove,
	},
	onRemove: {
		type: Function as PropType<UploadHooks['onRemove']>,
		default: () => globalComponentConfig.upload.onRemove,
	},
	onChange: {
		type: Function as PropType<UploadHooks['onChange']>,
		default: () => globalComponentConfig.upload.onChange,
	},
	// 点击文件列表中已上传的文件时的钩子
	onPreview: {
		type: Function as PropType<(file: I_fileListType) => void>,
		default: () => globalComponentConfig.upload.onPreview,
	},
	onSuccess: {
		type: Function as PropType<UploadHooks['onSuccess']>,
		default: () => globalComponentConfig.upload.onSuccess,
	},
	onProgress: {
		type: Function as PropType<UploadHooks['onProgress']>,
		default: () => globalComponentConfig.upload.onProgress,
	},
	onError: {
		type: Function as PropType<UploadHooks['onError']>,
		default: () => globalComponentConfig.upload.onError,
	},
	onExceed: {
		type: Function as PropType<UploadHooks['onExceed']>,
		default: () => globalComponentConfig.upload.onExceed,
	},
	// 文件上传状态发生变化时触发的钩子（成功或失败都返回false，上传中返回 true）
	onUploadingStatus: {
		type: Function as PropType<(file: boolean) => void>,
		default: () => globalComponentConfig.upload.onUploadingStatus,
	},
	onlyOfficeFileList: {
		type: Array as PropType<I_fileListType[]>,
		default: () => globalComponentConfig.upload.onlyOfficeFileList,
	},
};
export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;
