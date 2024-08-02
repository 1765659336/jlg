import type { PropType } from 'vue';
import type { UploadUserFile } from 'element-plus';

export const uploadListEmits = ['delete'];

export interface I_fileListType extends UploadUserFile {
	[key: string]: any;
}
export const uploadListProps = {
	fileList: {
		type: Array as PropType<I_fileListType[]>,
		default: () => [],
	},
	onlyOfficeFileList: {
		type: Array as PropType<I_fileListType[]>,
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
		default: true,
	},
	uploadShowPath: {
		type: String,
		default: '',
	},
	// 点击文件列表中已上传的文件时的钩子
	onPreview: {
		type: Function as PropType<(file: I_fileListType) => void>,
		default: null,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
};
