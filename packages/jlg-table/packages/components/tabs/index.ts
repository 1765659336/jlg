import type { RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue';
import type { defineJlgComponent } from '../../../lib/core';
import type { ValueOf } from 'vxe-table';
import { withInstall } from '../../../lib/install';
import Tabs from './tabs';
import type { JlgTabsPropTypes } from '../../types/namespace';
import { JlgTabPaneDefines, JlgTabsEvents, JlgTabsSlotTypes } from '../../types/namespace';

export const JlgTabs: defineJlgComponent<JlgTabsProps, JlgTabsEventProps, JlgTabsSlots> = withInstall(Tabs);

export type JlgTabsInstance = ComponentPublicInstance<JlgTabsProps, JlgTabsConstructor>;

export interface JlgTabsConstructor extends JlgTabsMethods {
	props: JlgTabsProps;
	context: SetupContext<JlgTabsEmits>;
	reactData: TabsReactData;
	getRefMaps(): TabsPrivateRef;
	getComputeMaps(): TabsPrivateComputed;
	renderVN: RenderFunction;
}

export interface TabsPrivateRef {
	refElem: Ref<HTMLDivElement | undefined>;
}
export interface JlgTabsPrivateRef extends TabsPrivateRef {}

export type JlgTabsProps = {
	modelValue?: JlgTabsPropTypes['ModelValue'];
	options?: JlgTabsPropTypes['Options'];
	destroyOnClose?: JlgTabsPropTypes['DestroyOnClose'];
	height?: JlgTabsPropTypes['Height'];
	titleWidth?: JlgTabsPropTypes['TitleWidth'];
	titleAlign?: JlgTabsPropTypes['TitleAlign'];
	type?: JlgTabsPropTypes['Type'];
	showClose?: JlgTabsPropTypes['ShowClose'];
	padding?: JlgTabsPropTypes['Padding'];
	beforeChangeMethod?: JlgTabsPropTypes['BeforeChangeMethod'];
	beforeCloseMethod?: JlgTabsPropTypes['BeforeCloseMethod'];
};

export interface TabsPrivateComputed {}
export interface JlgTabsPrivateComputed extends TabsPrivateComputed {}

export interface TabsReactData {
	staticTabs: JlgTabPaneDefines['TabConfig'][];
	activeName: JlgTabsPropTypes['ModelValue'];
	initNames: JlgTabsPropTypes['ModelValue'][];
}

export interface TabsMethods {
	dispatchEvent(type: ValueOf<JlgTabsEmits>, params: Record<string, any>, evnt: Event | null): void;
}
export interface JlgTabsMethods extends TabsMethods {}

export interface TabsPrivateMethods {}
export interface JlgTabsPrivateMethods extends TabsPrivateMethods {}

export type JlgTabsEmits = ['update:modelValue', 'change', 'tab-change-fail', 'tab-remove', 'tab-remove-fail', 'tab-click', 'tab-load'];

export type JlgTabsEventProps = {
	onChange?: JlgTabsEvents['Change'];
	onTabChangeFail?: JlgTabsEvents['TabChangeFail'];
	onTabRemove?: JlgTabsEvents['TabRemove'];
	onTabRemoveFail?: JlgTabsEvents['TabRemoveFail'];
	onTabClick?: JlgTabsEvents['TabClick'];
	onTabLoad?: JlgTabsEvents['TabLoad'];
};

export interface JlgTabsListeners {
	change?: JlgTabsEvents['Change'];
	tabChangeFail?: JlgTabsEvents['TabChangeFail'];
	tabRemove?: JlgTabsEvents['TabRemove'];
	tabRemoveFail?: JlgTabsEvents['TabRemoveFail'];
	tabClick?: JlgTabsEvents['TabClick'];
	tabLoad?: JlgTabsEvents['TabLoad'];
}

export interface JlgTabsSlots {
	default?: (params: JlgTabsSlotTypes['DefaultSlotParams']) => any;
}

export default JlgTabs;
