import { uploadContentProps } from './components/use-upload-content';
import type { ExtractPropTypes, PropType } from 'vue';
import { globalComponentConfig } from '../index';

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

export const uploadListTypes = ['text', 'picture', 'picture-card'] as const;

export const uploadProps = {
	...uploadContentProps,
	// 是否显示下载按钮
	showDownload: {
		type: Boolean,
		default: () => globalComponentConfig.upload.showDownload,
	},
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
	// 上传文件的地址
	uploadShowPath: {
		type: String as PropType<string>,
		default: () => globalComponentConfig.upload.uploadShowPath,
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
	gatherProps: {
		type: Object,
	},
	propsName: {
		type: String as PropType<string>,
	},
} as const;

export type UploadAllProps = ExtractPropTypes<typeof uploadProps>;
