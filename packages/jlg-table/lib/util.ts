import XEUtils from 'xe-utils';

import type { JlgTabsConstructor, JlgTabsPrivateMethods, JlgTabPaneDefines } from '../packages';
import { JlgComponentPermissionCodeType, JlgComponentPermissionInfo, JlgComponentPermissionMethod } from './core';
import GlobalConfig from './useGlobalConfig';

export function assembleAnchorTab($xeTabs: JlgTabsConstructor & JlgTabsPrivateMethods, elem: HTMLElement, tabConfig: JlgTabPaneDefines['TabConfig']) {
	const staticLinks = $xeTabs.reactData.staticTabs;
	const parentElem = elem.parentNode;
	if (parentElem) {
		staticLinks.splice(XEUtils.arrayIndexOf(parentElem.children, elem), 0, tabConfig);
		$xeTabs.reactData.staticTabs = staticLinks.slice(0);
	}
}

export function destroyAnchorTab($xeTabs: JlgTabsConstructor & JlgTabsPrivateMethods, tabConfig: JlgTabPaneDefines['TabConfig']) {
	const staticTabs = $xeTabs.reactData.staticTabs;
	const matchObj = XEUtils.findTree(staticTabs, (item) => item.id === tabConfig.id, { children: 'children' });
	if (matchObj) {
		matchObj.items.splice(matchObj.index, 1);
	}
	$xeTabs.reactData.staticTabs = staticTabs.slice(0);
}

export function getSlotVNs(vns: any) {
	if (XEUtils.isArray(vns)) {
		return vns;
	}
	return [vns];
}

export function toCssUnit(val?: number | string) {
	if (/^\d+$/.test(`${val}`)) {
		return `${val}px`;
	}
	return `${val || ''}`;
}

/*
 * 检测权限
 * */
export function handleCheckInfo(code?: JlgComponentPermissionCodeType, permissionMethod?: JlgComponentPermissionMethod) {
	let visible = true;
	let disabled = false;
	const checkMethod = permissionMethod || GlobalConfig.permissionMethod;
	if (code && checkMethod) {
		const rest = checkMethod({ code });
		if (XEUtils.isBoolean(rest)) {
			visible = rest;
		} else if (rest) {
			visible = !!rest.visible;
			disabled = !!rest.disabled;
		}
	}
	const info: JlgComponentPermissionInfo = {
		code,
		visible,
		disabled,
	};
	return info;
}
