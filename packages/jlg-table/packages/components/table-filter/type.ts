import { VxeFormItemProps, VxeFormPropTypes } from 'vxe-table';
import {} from 'vxe-table/types/form';
import { VxeFormItemPropTypes } from 'vxe-table/types/form-item';
import type Node from 'element-plus/lib/components/tree/src/model/node';
import { TreeNodeData } from 'element-plus/lib/components/tree/src/tree.type';

type T_Vxe_Form_Item_Props_Pick = 'title' | 'field' | 'titleWidth' | 'className' | 'titleClassName' | 'titleOverflow' | 'visible';
type Align = 'left' | 'top' | 'right' | '' | null;

export declare interface I_Table_Filter_Item extends Pick<VxeFormItemProps, T_Vxe_Form_Item_Props_Pick> {
	type: 'text' | 'number' | 'select' | 'time' | 'date' | 'independentDate' | 'treeSelect';
	/**
	 * 默认值
	 */
	defaultValue?: VxeFormItemPropTypes.ResetValue;
	/**
	 * 筛选类型
	 */
	searchType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
	/**
	 * 是否快捷搜索
	 */
	quickSearch?: boolean;
	/**
	 * 标题对齐方式
	 */
	titleAlign?: Align;
	/**
	 * 是否为纯净模式（不显示筛选类型）
	 */
	isPure?: boolean;
	/**
	 * element-plus 表单组件的其余参数与事件
	 */
	props?: Record<string, any>;
	/**
	 * 排序
	 */
	sortNumber?: number;
	/**
	 * 其他参数
	 */
	params?: Record<string, any>;
}

export declare interface I_Table_Filter_Props {
	// 所有项的标题对齐方式
	titleAlign?: Align;
	// 所有项的标题宽度
	titleWidth?: VxeFormPropTypes.TitleWidth;
	// 是否折叠
	folding?: boolean;
	// 是否禁用所有组件， 如果设置为 true, 它将覆盖内部组件的 disabled 属性
	disabled?: boolean;
	// 标识虚拟触发时的触发元素
	virtualRef?: HTMLElement;
	// 筛选条件状态(存在有效值/不存在有效值)改变或者打开关闭筛选弹窗时触发
	onSearchStatusChange?: (isShow: boolean, isSearch: boolean) => void;
	// 是否启用筛选方案模式
	isFilterTemplate?: boolean;
	items: I_Table_Filter_Item[];
}

export interface TreeOptionProps {
	// tree 组件指定子树为节点对象的某个属性值
	children?: string;
	label?: string | ((data: TreeNodeData, node: Node) => string);
	disabled?: string | ((data: TreeNodeData, node: Node) => boolean);
	isLeaf?: string | ((data: TreeNodeData, node: Node) => boolean);
	class?: (
		data: TreeNodeData,
		node: Node
	) =>
		| string
		| {
				[key: string]: boolean;
		  };
}

export interface SelectOptionProps {
	label?: string;
	value?: string;
	disabled?: string;
	// [el-select-v2] 指定选项的子选项为选项对象的某个属性值
	options?: string;
}

export declare interface I_User_Search_Template_Model {
	/** @description 搜索模板雪花id */
	templateUid: string;
	/** @description 搜索模板名称 */
	templateName: string;
	/** @description 页面路由雪花id */
	routeUId?: string | null;
	/** @description 是否默认 */
	isDefault?: boolean | 1 | 0;
	userSearchTemplateDetails: I_User_Search_Template_Details_Model[];
}

export type I_User_Search_Template_Props_Model = Omit<I_User_Search_Template_Model, 'userSearchTemplateDetails'> & {
	templateDetails?: string;
};

export declare interface I_User_Search_Template_Details_Model {
	/** @description 数据库字段名 */
	dbFieldName: string | null;
	/** @description 动态页面列雪花id */
	dynamicPageColUid: string | null;
	/** @description 后端存储的筛选框类型 */
	searchColType: number | null;
	/**
	 * Format: int32
	 * @description 搜索类型（模糊，精确...）
	 */
	searchType: number;
	/** @description 默认值 */
	defaultValue: string | null;
	// 其他非必要参数
	[key: string]: unknown;
}

// 当前点击的查询按钮类型
export enum SearchType {
	popoverSearch = 'popoverSearch',
	quickSearch = 'quickSearch',
	tagClose = 'tagClose',
	toggleTemplate = 'toggleTemplate',
}
