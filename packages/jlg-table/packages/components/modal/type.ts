import { VxeModalProps, VxeModalEventProps, VxeModalInstance } from 'vxe-table';
import { Ref } from 'vue';
export interface I_Options {
	[key: string]: unknown;
}

export interface T_Modal_Options
	extends Omit<VxeModalProps, 'type' | 'duration' | 'top' | 'storage' | 'storageKey' | 'content' | 'remember' | 'destroyOnClose'>,
		VxeModalEventProps {
	/**
	 * 是否显示右上角的收缩按钮
	 */
	showShrink?: boolean;
	/**
	 * 是否显示右上角的自定义按钮
	 */
	showCustom?: boolean;
	/**
	 * 是否显示右上角的最小化按钮
	 */
	showHide?: boolean;
	onHide?: () => void;
	onClose?: () => void;
}

export type T_Modal_Params = {
	component: any;
	modalOptions: T_Modal_Options;
	props: I_Options;
	ref?: VxeModalInstance;
	key?: string;
};

export interface I_Dynamic_Modal_Store {
	modals: T_Modal_Params[];
	// 用来区分是隐藏还是关闭
	eventType: 'hide' | 'close';
}

export interface I_Modal_Controller {
	get: () => T_Modal_Params;
	hide: () => void;
	close: () => void;
}

export type T_Buttons = 'shrink' | 'custom' | 'zoom' | 'hide' | 'close';

export interface I_Modal_Methods {
	/**
	 * 手动打开窗口
	 */
	open(): Promise<any>;
	/**
	 * 手动关闭窗口
	 */
	close(): Promise<any>;
	/**
	 * 手动隐藏窗口
	 */
	hide(): Promise<any>;
	/**
	 * 获取当前窗口元素
	 */
	getBox(): HTMLElement;
	/**
	 * 获取窗口位置
	 */
	getPosition(): {
		top?: number;
		left?: number;
	} | null;
	/**
	 * 设置窗口位置
	 */
	setPosition(top?: number, left?: number): Promise<any>;
	/**
	 * 判断是否最大化显示
	 */
	isMaximized(): boolean;
	/**
	 * 切换窗口最大化/还原
	 */
	zoom(): Promise<boolean>;
	/**
	 * 如果窗口处于常规状态，则最大化窗口
	 */
	maximize(): Promise<any>;
	/**
	 * 如果窗口处于最大化状态，则还原窗口
	 */
	revert(): Promise<any>;
	/**
	 *  手动触发点击取消按钮时的事件
	 * */
	cancel(event: Event): void;
	/**
	 *  手动触发点击确定按钮时的事件
	 * */
	confirm(event: Event): void;
	/**
	 *  手动打开自定义设置窗口
	 * */
	custom(): Promise<any>;

	/**
	 *  手动切换右上角操作按钮的显示隐藏
	 * */
	toggleCorner(val: boolean | T_Buttons[]): void;
}

export interface I_Modal_Constructor {
	/**
	 * vxe-table 的 Modal 组件原始实例,一般情况下不需要使用
	 */
	ref: Ref<VxeModalInstance>;
}

export type T_Jlg_Modal_Instance = I_Modal_Constructor & I_Modal_Methods;
