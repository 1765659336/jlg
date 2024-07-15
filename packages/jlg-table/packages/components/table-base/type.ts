import { VxeGridInstance, VxeGridProps, VxeToolbarPropTypes } from 'vxe-table';
import { I_Table_Filter_Props } from '../table-filter/type';
import { VxeTableDataRow, VxeTableDefines } from 'vxe-table/types/table';
import { AppContext, Ref, VNodeTypes } from 'vue';
import TableFilter from '../table-filter/index.vue';
import TableFilterTemplate from '../table-filter/template-index.vue';
// import { ComponentPublicInstance } from 'vue';

export type T_Msg = boolean | (() => boolean) | Promise<boolean>;
type T_Destroy = {
	onDestroy: () => void;
};
export type T_Table_Filter = InstanceType<typeof TableFilter>;
export type T_Table_Filter_Template = InstanceType<typeof TableFilterTemplate>;
export type T_RenderCustomTemplate = <P = Record<string, any>>(customComponent: VNodeTypes, appContext: AppContext, props: P) => T_Destroy;
/**
 * @description 保存配置类型
 * @enum {string} resizable - 拖动列宽调整大小
 * @enum {string} sortable - 拖动列排序
 * @enum {string} reset - 重置表格配置
 * @enum {string} save - 保存表格列配置
 * @enum {string} template - 保存筛选方案模版
 * @enum {string} customize - 自定义表格列配置
 * */
export type T_Save_Config_Type = 'resizable' | 'sortable' | 'reset' | ' save' | 'customize' | 'template';

export type JlgGridInstance<T = any> = {
	xGrid: VxeGridInstance<T>;
	$filter: T_Table_Filter | T_Table_Filter_Template;
	reactData: Record<string, any>;
	customStore: Record<string, any>;
	commitProxy: (code: string | VxeToolbarPropTypes.ButtonConfig, msg: T_Msg, ...args: any[]) => Promise<any>;
	refresh: (refreshToFirstPage: boolean) => void;
	resetCustomEvent: (data: Record<string, any>) => Promise<boolean>;
	saveCustomEvent: (columns: (VxeTableDefines.ColumnOptions<any> | VxeTableDefines.ColumnInfo<any>)[]) => Promise<any>;
	renderCustomTemplate: T_RenderCustomTemplate;
	saveConfig: (type?: T_Save_Config_Type) => void;
	getTableFilterConfig: (deep: boolean) => I_Table_Filter_Props;
	getFormElementWidth: () => number;
	setTableGlobalConfig: (data: Record<string, any>) => void;
	setTableFilterConfig: (data: I_Table_Filter_Props) => void;
	initPopoverButton: (popoverRef: HTMLElement | Ref<HTMLElement>) => Promise<void>;
	onClickOutside: () => void;
};

export declare interface I_Table_Grid_Props<D = VxeTableDataRow> extends Omit<VxeGridProps<D>, 'formConfig' | 'filterConfig'> {
	tableFilterConfig?: I_Table_Filter_Props;
	operationConfig?: {
		/**
		 * 操作列宽度
		 */
		width?: number;
		/**
		 * 操作列固定
		 */
		fixed?: 'left' | 'right';
		/**
		 * 操作列标题
		 */
		title?: string;
		/**
		 * 操作列标题对齐方式
		 */
		align?: 'left' | 'center' | 'right';
	};
	storageConfig?: {
		/**
		 * 是否启用服务端存储
		 */
		enabled?: boolean;
		/**
		 * 是否启用自动存储，开启后，拖拽列宽、拖拽列顺序、列隐藏等操作将通过触发 saveSysConfig 函数自动保存到服务端
		 */
		autoStorage?: boolean;
	};
}
