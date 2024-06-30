import { VxeFormItemProps, VxeFormPropTypes } from 'vxe-table';
import {} from 'vxe-table/types/form';
import { VxeFormItemPropTypes } from 'vxe-table/types/form-item';

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
	// 提交前之前的钩子，参数为表单数据和筛选项配置。可用于对表单数据进一步处理
	beforeSave?: (formData: Record<string, any>, filterConfig: I_Table_Filter_Item[]) => Record<string, any>;
	// 是否禁用所有组件， 如果设置为 true, 它将覆盖内部组件的 disabled 属性
	disabled?: boolean;
	// 标识虚拟触发时的触发元素
	virtualRef?: HTMLElement;
	// 筛选条件状态(存在有效值/不存在有效值)改变或者打开关闭筛选弹窗时触发
	onSearchStatusChange?: (isShow: boolean, isSearch: boolean) => void;
	items: I_Table_Filter_Item[];
}
