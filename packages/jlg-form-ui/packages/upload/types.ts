import { I_MultipleTypeConfig, UploadAllProps as JlgUploadAllProps, T_AsideTypes } from './use-upload';
import type { PropType } from 'vue';
import type { UploadAjaxError } from 'element-plus/es/components/upload/src/ajax';
import type { UploadContentProps as JlgUploadContentProps, UploadContentInstance as JlgUploadContentInstance } from './components/use-upload-content';

export type T_Jlg_Upload_Global_Props = {
	showDownload?: undefined | null | boolean;
	showContent?: undefined | null | boolean;
	showFileList?: undefined | null | boolean;
	uploadShowPath?: undefined | null | string;
	multipleTypeConfig?: I_MultipleTypeConfig;
	type?: undefined | null | string;
	action?: string;
	text?: undefined | null | string;
	uploadContentStyle?: any;
	limit?: undefined | null | number;
	multiple?: undefined | null | boolean;
	fileSize?: undefined | null | number;
	fileType?: any;
	data?: Record<string, any>;
	name?: undefined | null | string;
	drag?: undefined | null | boolean;
	autoUpload?: undefined | null | boolean;
	headers?: undefined | null | Record<string, any>;
	beforeUpload?: any;
	beforeRemove?: any;
	onRemove?: any;
	onChange?: any;
	onPreview?: any;
	onSuccess?: any;
	onProgress?: any;
	onError?: any;
	onExceed?: any;
	onUploadingStatus?: any;
	onlyOfficeFileList?: any;
	[key: string]: any;
};

export declare type Awaitable<T> = Promise<T> | T;

/**
 * 将一个类型 T 的所有属性从只读变为可变
 * */
export const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>;
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * 传入的值转换为 Vue 的 PropType 类型
 * */
export const definePropType = <T>(val: any): PropType<T> => val;

export const entriesOf = <T>(arr: T) => Object.entries(arr);

export declare type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
export interface UploadProgressEvent extends ProgressEvent {
	percent: number;
}
export interface UploadRequestOptions {
	action: string;
	method: string;
	data: Record<string, string | Blob | [string | Blob, string]>;
	filename: string;
	file: UploadRawFile;
	headers: Headers | Record<string, string | number | null | undefined>;
	onError: (evt: UploadAjaxError) => void;
	onProgress: (evt: UploadProgressEvent) => void;
	onSuccess: (response: any) => void;
	withCredentials: boolean;
}
export interface I_uploadUserFile {
	name: string;
	percentage?: number;
	$uid: number;
	size?: number;
	response?: unknown;
	uid?: string;
	url?: string;
	raw?: UploadRawFile;
	status?: UploadStatus;
	ext?: string;
	path?: string;
	icon?: string;
	[key: string]: any;
}
export declare type T_uploadUserFiles = I_uploadUserFile[];
export interface UploadRawFile extends File {
	$uid: number;
}

export declare type UploadRequestHandler = (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>;
export interface UploadHooks {
	beforeUpload: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
	beforeRemove: (uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => Awaitable<boolean>;
	onRemove: (uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => void;
	onChange: (uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => void;
	onPreview: (uploadFile: I_uploadUserFile) => void;
	onSuccess: (response: any, uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => void;
	onProgress: (evt: UploadProgressEvent, uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => void;
	onError: (error: Error, uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => void;
	onExceed: (files: File[], uploadFiles: T_uploadUserFiles) => void;
	onUploadingStatus: (loading: boolean) => void;
}

/**
 *  对外暴露的其他类型
 * */
export type { I_MultipleTypeConfig, JlgUploadAllProps, T_AsideTypes, JlgUploadContentProps, JlgUploadContentInstance };
