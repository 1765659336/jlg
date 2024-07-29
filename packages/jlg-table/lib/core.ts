import type { App, VNode } from 'vue';
export type defineJlgComponent<P = { [key: string]: any }, E = { [key: string]: any }, S = { [key: string]: (...args: any[]) => any }> = {
	new (): {
		$props: P & E;
		$slots: S;
	};
} & {
	install(app: App): void;
};

/**
 * 组件事件参数
 */
export interface JlgComponentEventParams {
	$event: Event;
}

/**
 * 权限码类型
 */
export type JlgComponentPermissionCodeType = string | number;

/**
 * 权限码判断结果
 */
export type JlgComponentPermissionResult =
	| boolean
	| {
			visible: boolean;
			disabled: boolean;
	  };

/**
 * 权限码判断方法
 */
export type JlgComponentPermissionMethod = (params: { code: JlgComponentPermissionCodeType }) => JlgComponentPermissionResult;

/**
 * 权限码信息
 */
export interface JlgComponentPermissionInfo {
	code?: JlgComponentPermissionCodeType;
	visible: boolean;
	disabled: boolean;
}

/**
 * 全局权限控制
 */
export interface JlgGlobalPermission {
	getCheckInfo(code: JlgComponentPermissionCodeType): JlgComponentPermissionInfo;
	checkVisible(code: JlgComponentPermissionCodeType): boolean;
	checkDisable(code: JlgComponentPermissionCodeType): boolean;
}

/**
 * 组件对齐方式
 */
export type JlgComponentAlignType = null | '' | 'left' | 'right' | 'center';

/**
 * 组件插槽类型
 */
export type JlgComponentSlotType = VNode | string | number;
