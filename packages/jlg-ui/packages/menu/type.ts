import { PopoverProps } from 'element-plus';

export declare interface I_JlgMenu_MenuDataItem {
	title: string | number;
	iconClass: string;
	key: number | string;
	children?: I_JlgMenu_MenuDataItem[];
}

export declare type T_MenuDataRecord = {
	[k in keyof I_JlgMenu_MenuDataItem]: string;
};

export interface I_Jlg_Menu_Props {
	menuData: I_JlgMenu_MenuDataItem[];
	commonMenuData?: I_JlgMenu_MenuDataItem[];
	collectMenuKeys: I_JlgMenu_MenuDataItem['key'][];
	menuDataRecord?: T_MenuDataRecord;
	transition?: string;
	idKey?: string;
	childKey?: string;
	parentKey?: string;
	columnCount?: number;
	isLockModal?: boolean;
	searchTrigger?: 'change' | 'input';
	defaultActive?: I_JlgMenu_MenuDataItem['key'][];
	elPopoverProps?: PopoverProps;
}

export declare interface I_Jlg_Menu_Emits {
	(
		e: 'collectClick',
		jlgMenuDataItem: I_JlgMenu_MenuDataItem,
		meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]
	): void;
	(
		e: 'threeLevelMenuClick',
		jlgMenuDataItem: I_JlgMenu_MenuDataItem,
		meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]
	): void;
}
