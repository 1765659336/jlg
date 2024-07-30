import type { PropType } from 'vue';
import { defineComponent, h, inject, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import XEUtils from 'xe-utils';
import { assembleAnchorTab, destroyAnchorTab } from '../../../../lib/util';

import type { JlgTabPaneConstructor, JlgTabPanePrivateComputed, JlgTabPanePrivateMethods, TabPanePrivateRef, TabPaneReactData } from './index';
import type { JlgTabsConstructor, JlgTabsPrivateMethods } from '../index';
import { JlgTabPaneDefines, JlgTabPanePropTypes } from '../../../types/namespace';

export default defineComponent({
	name: 'JlgTabPane',
	props: {
		title: [String, Number] as PropType<JlgTabPanePropTypes['Title']>,
		name: [String, Number] as PropType<JlgTabPanePropTypes['Name']>,
		icon: String as PropType<JlgTabPanePropTypes['Icon']>,
		titleWidth: [String, Number] as PropType<JlgTabPanePropTypes['TitleWidth']>,
		titleAlign: [String, Number] as PropType<JlgTabPanePropTypes['TitleAlign']>,
		permissionCode: [String, Number] as PropType<JlgTabPanePropTypes['PermissionCode']>,
	},
	emits: [],
	setup(props, context) {
		const { slots, attrs } = context;

		const xID = XEUtils.uniqueId();

		const refElem = ref<HTMLDivElement>();

		const $xeTabs = inject<(JlgTabsConstructor & JlgTabsPrivateMethods) | null>('$xeTabs', null);

		const reactData = reactive<TabPaneReactData>({});

		const tabConfig = reactive<JlgTabPaneDefines['TabConfig']>({
			id: xID,
			title: props.title,
			name: props.name,
			icon: props.icon,
			titleWidth: props.titleWidth,
			titleAlign: props.titleAlign,
			permissionCode: props.permissionCode,
			slots: {
				default: slots.default,
			},
		});

		const refMaps: TabPanePrivateRef = {
			refElem,
		};

		const computeMaps: JlgTabPanePrivateComputed = {};

		const $xeTabPane = {
			xID,
			props,
			context,
			reactData,

			getRefMaps: () => refMaps,
			getComputeMaps: () => computeMaps,
		} as unknown as JlgTabPaneConstructor & JlgTabPanePrivateMethods;

		watch(
			() => props.title,
			(val) => {
				tabConfig.title = val;
			}
		);

		watch(
			() => props.name,
			(val) => {
				tabConfig.name = val;
			}
		);

		watch(
			() => props.icon,
			(val) => {
				tabConfig.icon = val;
			}
		);

		watch(
			() => props.permissionCode,
			(val) => {
				tabConfig.permissionCode = val;
			}
		);

		onMounted(() => {
			if ($xeTabs && refElem.value) {
				assembleAnchorTab($xeTabs, refElem.value, tabConfig);
			}
		});

		onUnmounted(() => {
			if ($xeTabs) {
				destroyAnchorTab($xeTabs, tabConfig);
			}
		});

		$xeTabPane.renderVN = () => {
			return h(
				'div',
				{
					ref: refElem,
				},
				attrs?.isDefault && slots.default ? slots.default({}) : []
			);
		};
		return $xeTabPane;
	},
	render() {
		return this.renderVN();
	},
});
