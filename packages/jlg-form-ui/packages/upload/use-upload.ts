import { uploadContentProps } from './components/use-upload-content';
import type { ExtractPropTypes, PropType } from 'vue';
import { globalComponentConfig } from '../index';
import { uploadListProps } from './components/use-upload-list';
import { definePropType, UploadHooks } from './types';

export type T_AsideTypes = { text: string; value: any }[];

export interface I_MultipleTypeConfig {
	// 是否显示左侧边栏
	showAside: boolean;
	// 后端返回的文件类型字段名
	typeKey: string;
	types: T_AsideTypes;
	// 点击左侧边栏的回调
	onAsideClick: (type: string, types: T_AsideTypes) => boolean | Error | Promise<Error> | void;
}

export const uploadProps = {
	...uploadContentProps,
	...uploadListProps,
	// 是否显示上传区域
	showContent: {
		type: Boolean,
		default: () => globalComponentConfig.upload.showContent,
	},
	// 是否显示文件列表
	showFileList: {
		type: Boolean,
		default: () => globalComponentConfig.upload.showFileList,
	},
	multipleTypeConfig: {
		type: Object as PropType<I_MultipleTypeConfig>,
		default: () => globalComponentConfig.upload.multipleTypeConfig,
	},
	// 上传组件的类型,可选参数 single-type-card | multiple-type-card
	type: {
		type: String as PropType<'single-type-card' | 'multiple-type-card'>,
		default: () => globalComponentConfig.upload.type,
	},
	// 数据采集相关
	gatherProps: {
		type: Object,
	},
	// 数据采集相关
	propsName: {
		type: String as PropType<string>,
	},
	/**
	 * @description 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
	 */
	beforeUpload: {
		type: definePropType<UploadHooks['beforeUpload']>(Function),
		default: () => {},
	},
	/**
	 * @description 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
	 */
	beforeRemove: {
		type: definePropType<UploadHooks['beforeRemove']>(Function),
	},
	/**
	 * @description 删除文件时的钩子函数
	 */
	onRemove: {
		type: definePropType<UploadHooks['onRemove']>(Function),
		default: () => {},
	},
	/**
	 * @description 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
	 */
	onChange: {
		type: definePropType<UploadHooks['onChange']>(Function),
		default: () => {},
	},
	/**
	 * @description 点击文件列表中已上传的文件时的钩子
	 */
	onPreview: {
		type: definePropType<UploadHooks['onPreview']>(Function),
		default: () => {},
	},
	/**
	 * @description 成功上传时的钩子函数
	 */
	onSuccess: {
		type: definePropType<UploadHooks['onSuccess']>(Function),
		default: () => {},
	},
	/**
	 * @description 监听文件上传进展的钩子函数
	 */
	onProgress: {
		type: definePropType<UploadHooks['onProgress']>(Function),
		default: () => {},
	},
	/**
	 * @description 发生某些错误时的钩子函数
	 */
	onError: {
		type: definePropType<UploadHooks['onError']>(Function),
		default: () => {},
	},
	/**
	 * @description 超过限制时的钩子功能
	 */
	onExceed: {
		type: definePropType<UploadHooks['onExceed']>(Function),
		default: () => {},
	},
} as const;

export type UploadAllProps = ExtractPropTypes<typeof uploadProps>;
