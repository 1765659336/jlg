import { ExtractPropTypes, type PropType } from 'vue';
import { UploadData } from 'element-plus';
import { ajaxUpload, UploadAjaxError } from 'element-plus/es/components/upload/src/ajax';
import type UploadContent from './upload-content.vue';
import { globalComponentConfig } from '../../index';
import {
	Awaitable,
	mutable,
	definePropType,
	T_uploadUserFiles,
	UploadRawFile,
	I_uploadUserFile,
	UploadHooks,
	UploadRequestHandler,
	UploadProgressEvent,
} from '../types';
import string from 'async-validator/dist-types/validator/string';

export const uploadBaseProps = {
	/**
	 * @description 请求 URL, 必须传递
	 */
	action: {
		type: String,
		default: '#',
	},
	/**
	 * @description 请求标头
	 */
	headers: {
		type: definePropType<Headers | Record<string, any>>(Object),
	},
	/**
	 * @description 设置上传请求方式
	 */
	method: {
		type: String,
		default: 'post',
	},
	/**
	 * @description请求的附加选项
	 */
	data: {
		type: definePropType<Awaitable<UploadData> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)>([Object, Function, Promise]),
		default: () => mutable({} as const),
	},
	/**
	 * @description 是否允许上传多个文件
	 */
	multiple: Boolean,
	/**
	 * @description 上传文件的key名
	 */
	name: {
		type: String,
		default: 'file',
	},
	/**
	 * @description 是否支持拖拽上传
	 */
	drag: Boolean,
	/**
	 * @description 指示是否应使用 Cookie、授权标头或 TLS 客户端证书等凭据进行跨站点 Access-Control 请求。该设置 withCredentials 对同源请求没有影响。
	 * 此外，此标志还用于指示何时在响应中忽略 cookie。缺省值为 false。
	 */
	withCredentials: Boolean,
	/**
	 * @description 是否显示已上传的文件列表
	 */
	showFileList: {
		type: Boolean,
		default: true,
	},
	/**
	 * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
	 */
	accept: {
		type: String,
		default: '',
	},
	/**
	 * @description default uploaded files
	 */
	fileList: {
		type: definePropType<T_uploadUserFiles>(Array),
		default: () => [],
	},
	/**
	 * @description whether to auto upload file
	 */
	autoUpload: {
		type: Boolean,
		default: true,
	},
	/**
	 * @description override default xhr behavior, allowing you to implement your own upload-file's request
	 */
	httpRequest: {
		type: definePropType<UploadRequestHandler>(Function),
		default: ajaxUpload,
	},
	/**
	 * @description whether to disable upload
	 */
	disabled: Boolean,
	/**
	 * @description maximum number of uploads allowed
	 */
	limit: Number,
	wrapClass: {
		type: definePropType<string | Record<string, unknown> | Array<string>>(Object),
		default: {},
	},
	wrapStyle: {
		// type: Object,
		type: definePropType<Record<string, string>>(Object),
		default: null,
	},
	uploadContentStyle: {
		// type: Object,
		type: definePropType<Record<string, string>>(Object),
		default: () => globalComponentConfig.upload.uploadContentStyle,
	},
	// 上传文件的地址
	uploadShowPath: {
		type: String as PropType<string>,
		default: () => globalComponentConfig.upload.uploadShowPath,
	},
	// 上传区域的提示文本
	text: {
		type: String,
		default: () => globalComponentConfig.upload.text,
	},
} as const;
export const uploadContentProps = {
	...uploadBaseProps,
	beforeUpload: {
		type: definePropType<UploadHooks['beforeUpload']>(Function),
		default: () => {},
	},
	onRemove: {
		type: definePropType<(file: I_uploadUserFile | UploadRawFile, rawFile?: UploadRawFile) => void>(Function),
		default: () => {},
	},
	onStart: {
		type: definePropType<(rawFile: UploadRawFile) => void>(Function),
		default: () => {},
	},
	onSuccess: {
		type: definePropType<(response: any, rawFile: UploadRawFile) => unknown>(Function),
		default: () => {},
	},
	onProgress: {
		type: definePropType<(evt: UploadProgressEvent, rawFile: UploadRawFile) => void>(Function),
		default: () => {},
	},
	onError: {
		type: definePropType<(err: UploadAjaxError, rawFile: UploadRawFile) => void>(Function),
		default: () => {},
	},
	onExceed: {
		type: definePropType<UploadHooks['onExceed']>(Function),
		default: () => {},
	},
	// 文件上传状态发生变化时触发的钩子（成功或失败都返回false，上传中返回 true）
	onUploadingStatus: {
		type: definePropType<UploadHooks['onUploadingStatus']>(Function),
		default: () => globalComponentConfig.upload.onUploadingStatus,
	},
} as const;
export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;
export type UploadContentInstance = InstanceType<typeof UploadContent>;
