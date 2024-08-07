import type { PropType } from 'vue';
import { globalComponentConfig } from '../../index';
import { definePropType, I_uploadUserFile } from '../types';

export const uploadListEmits = ['delete'];

export const uploadListProps = {
	onlyOfficeFileList: {
		type: Array as PropType<I_uploadUserFile[]>,
		default: null,
	},
	typeKey: {
		type: String,
		default: 'type',
	},
	// 自定义块样式
	blockStyle: {
		type: Object,
		default: () => ({
			width: '220px',
			height: '70px',
		}),
	},
	// 是否显示下载按钮
	showDownload: {
		type: Boolean,
		default: () => globalComponentConfig.upload.showDownload,
	},
	// 点击文件列表中已上传的文件时的钩子
	onPreview: {
		type: Function as PropType<(file: I_uploadUserFile) => void>,
		default: () => {},
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	fileList: {
		type: definePropType<I_uploadUserFile[]>(Array),
		default: () => [],
	},
	// 上传文件的地址
	uploadShowPath: {
		type: String as PropType<string>,
		default: () => globalComponentConfig.upload.uploadShowPath,
	},
} as const;
