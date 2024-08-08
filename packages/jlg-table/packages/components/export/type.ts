import { UploadProgressEvent } from 'element-plus';
import { VxeGridInstance } from 'vxe-table';

export interface I_Table_Export_React_Data {
	checkAll: boolean;
	isIndeterminate: boolean;
	//  配置加载中
	isLoading: boolean;
	// 是否正在导出
	isExporting: boolean;
	// 是否记住本次配置
	isSaveConfig: boolean;
	checkedFields: string[];
	config: I_Table_Export_Config[];
}
export interface JlgTableExportConstructor {
	xID: string;
	props: I_Table_Export_Panel_Props;
	reactData: I_Table_Export_React_Data;
	openExportPanel: () => void;
	cancelExportPanel: () => void;
	progressEvt?: UploadProgressEvent;
}

export declare interface I_Table_Export_Panel_Props {
	sortFieId: string;
	xGrid?: VxeGridInstance;
	// 获取页面列导出配置项
	getExportConfig?: () => Promise<I_Table_Export_Config[]>;
	// 保存页面列导出配置项
	saveExportConfig?: (config: { data: I_Table_Export_Config[]; $export: JlgTableExportConstructor }) => void;
}
export declare interface I_Table_Export_Config {
	// 动态配置页面Uid
	dynamicPageColUid?: string;
	// 显示名称
	displayName?: string;
	// 字段名称
	dbFieldName?: string;
	// 字段类型
	dbFieldType?: string;
	// 是否是导出列
	isExportCol?: boolean | 1 | 0;
	[other: string]: any;
}
