import type { RenderFunction, SetupContext, Ref, ComponentPublicInstance } from 'vue';
import type { defineJlgComponent, JlgComponentSlotType } from '../../../../lib/core';
import { withInstall } from '../../../../lib/install';
import TabPane from './tab-pane';
import { JlgTabPanePropTypes, JlgTabPaneSlotTypes } from '../../../types/namespace';

export const JlgTabPane: defineJlgComponent<JlgTabPaneProps, JlgTabPaneEventProps, JlgTabPaneSlots> = withInstall(TabPane);

export type JlgTabPaneInstance = ComponentPublicInstance<JlgTabPaneProps, JlgTabPaneConstructor>;

export interface JlgTabPaneConstructor extends JlgTabPaneMethods {
	props: JlgTabPaneProps;
	context: SetupContext<JlgTabPaneEmits>;
	reactData: TabPaneReactData;

	getRefMaps(): TabPanePrivateRef;

	getComputeMaps(): TabPanePrivateComputed;

	renderVN: RenderFunction;
}

export interface TabPanePrivateRef {
	refElem: Ref<HTMLDivElement | undefined>;
}

export interface JlgTabPanePrivateRef extends TabPanePrivateRef {}

export type JlgTabPaneProps = {
	title?: JlgTabPanePropTypes['Title'];
	name?: JlgTabPanePropTypes['Name'];
	icon?: JlgTabPanePropTypes['Icon'];
	titleWidth?: JlgTabPanePropTypes['TitleWidth'];
	titleAlign?: JlgTabPanePropTypes['TitleAlign'];
	permissionCode?: JlgTabPanePropTypes['PermissionCode'];

	slots?: {
		tab?: string | ((params: { [key: string]: any }) => JlgComponentSlotType | JlgComponentSlotType[]);
		default?: string | ((params: { [key: string]: any }) => JlgComponentSlotType | JlgComponentSlotType[]);
	};
};

export interface TabPanePrivateComputed {}

export interface JlgTabPanePrivateComputed extends TabPanePrivateComputed {}

export interface TabPaneReactData {}

export interface TabPaneMethods {}

export interface JlgTabPaneMethods extends TabPaneMethods {}

export interface TabPanePrivateMethods {}

export interface JlgTabPanePrivateMethods extends TabPanePrivateMethods {}

export type JlgTabPaneEmits = [];

export type JlgTabPaneEventProps = NonNullable<unknown>;

export interface JlgTabPaneListeners {}

export interface JlgTabPaneSlots {
	tab?: (params: JlgTabPaneSlotTypes['DefaultSlotParams']) => any;
	default?: (params: JlgTabPaneSlotTypes['DefaultSlotParams']) => any;
}

export default JlgTabPane;
