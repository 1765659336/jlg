import { JlgTabsConstructor } from '../components/tabs';
import type { JlgComponentAlignType, JlgComponentEventParams, JlgComponentPermissionCodeType } from '../../lib/core';
import type { JlgTabPaneProps } from '../components/tabs/pane';
import { JlgTabPaneConstructor } from '../components/tabs/pane';

export interface JlgTabsSlotTypes {
	DefaultSlotParams: NonNullable<unknown>;
}

interface TabsEventParams extends JlgComponentEventParams {
	$tabs: JlgTabsConstructor;
}

interface ChangeEventParams extends TabsEventParams {
	value: JlgTabsPropTypes['ModelValue'];
	name: JlgTabsPropTypes['ModelValue'];
	oldName: JlgTabsPropTypes['ModelValue'];
	newName: JlgTabsPropTypes['ModelValue'];
}

interface TabChangeFailEventParams extends TabsEventParams {
	value: JlgTabsPropTypes['ModelValue'];
	name: JlgTabsPropTypes['ModelValue'];
}

interface TabRemoveEventParams extends TabsEventParams {
	name: JlgTabsPropTypes['ModelValue'];
}

interface TabRemoveFailEventParams extends TabsEventParams {
	name: JlgTabsPropTypes['ModelValue'];
}

interface TabClickEventParams extends TabsEventParams {
	name: JlgTabsPropTypes['ModelValue'];
}

interface TabLoadEventParams extends TabsEventParams {
	name: JlgTabsPropTypes['ModelValue'];
}
export interface JlgTabsDefines {
	TabsEventParams: TabsEventParams;
	ChangeEventParams: ChangeEventParams;
	TabChangeFailEventParams: TabChangeFailEventParams;
	TabRemoveEventParams: TabRemoveEventParams;
	TabRemoveFailEventParams: TabRemoveFailEventParams;
	TabClickEventParams: TabClickEventParams;
	TabLoadEventParams: TabLoadEventParams;
}

interface TabPaneEventParams extends JlgComponentEventParams {
	$tabPane: JlgTabPaneConstructor;
}

interface TabConfig extends JlgTabPaneProps {
	id: string;
}
export interface JlgTabPaneDefines {
	TabPaneEventParams: TabPaneEventParams;
	TabConfig: TabConfig;
}
export interface JlgTabPaneEvents {}

export interface JlgTabPaneSlotTypes {
	DefaultSlotParams: NonNullable<unknown>;
}

export interface JlgTabPanePropTypes {
	Title: string | number;
	Name: string | number;
	Icon: string;
	TitleWidth: string | number;
	TitleAlign: JlgComponentAlignType;
	PermissionCode: JlgComponentPermissionCodeType;
}

export interface JlgTabsEvents {
	Change?: (params: ChangeEventParams) => void;
	TabChangeFail?: (params: TabChangeFailEventParams) => void;
	TabRemove?: (params: TabRemoveEventParams) => void;
	TabRemoveFail?: (params: TabRemoveFailEventParams) => void;
	TabClick?: (params: TabClickEventParams) => void;
	TabLoad?: (params: TabLoadEventParams) => void;
}

export interface JlgTabsPropTypes {
	ModelValue: undefined | null | JlgTabPanePropTypes['Name'];
	Options: JlgTabPaneProps[];
	DestroyOnClose: boolean;
	Height: string | number;
	TitleWidth: JlgTabPanePropTypes['TitleWidth'];
	TitleAlign: JlgTabPanePropTypes['TitleAlign'];
	Type: null | '' | 'default' | 'card' | 'border-card' | 'round-card';
	ShowClose: boolean;
	Padding: boolean;
	BeforeChangeMethod: (params: { $tabs: JlgTabsConstructor; name: JlgTabsPropTypes['ModelValue'] }) => boolean;
	BeforeCloseMethod: (params: { $tabs: JlgTabsConstructor; name: JlgTabsPropTypes['ModelValue'] }) => boolean;
}
