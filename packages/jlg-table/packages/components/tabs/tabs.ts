import { defineComponent, ref, h, reactive, provide, computed, createCommentVNode, watch } from 'vue';
import type { PropType } from 'vue';
import XEUtils from 'xe-utils';
import JlgTabPaneComponent from './pane/tab-pane';
import { getSlotVNs, toCssUnit } from '../../../lib/util';

import type {
	JlgTabsEmits,
	TabsReactData,
	TabsPrivateRef,
	JlgTabsPrivateComputed,
	JlgTabsConstructor,
	JlgTabsPrivateMethods,
	TabsMethods,
	TabsPrivateMethods,
} from './index';
import type { JlgTabPaneProps } from './pane';
import type { JlgTabsPropTypes } from '../../types/namespace';
import { JlgTabPaneDefines } from '../../types/namespace';
import { T_Global_Config_Props } from '../../../lib/useGlobalConfig';

export default defineComponent({
	name: 'JlgTabs',
	props: {
		modelValue: [String, Number, Boolean] as PropType<JlgTabsPropTypes['ModelValue']>,
		options: Array as PropType<JlgTabsPropTypes['Options']>,
		height: [String, Number] as PropType<JlgTabsPropTypes['Height']>,
		destroyOnClose: Boolean as PropType<JlgTabsPropTypes['DestroyOnClose']>,
		titleWidth: [String, Number] as PropType<JlgTabsPropTypes['TitleWidth']>,
		titleAlign: [String, Number] as PropType<JlgTabsPropTypes['TitleAlign']>,
		type: String as PropType<JlgTabsPropTypes['Type']>,
		showClose: Boolean as PropType<JlgTabsPropTypes['ShowClose']>,
		padding: {
			type: Boolean as PropType<JlgTabsPropTypes['Padding']>,
			default: () => false,
		},
		beforeChangeMethod: Function as PropType<JlgTabsPropTypes['BeforeChangeMethod']>,
		beforeCloseMethod: Function as PropType<JlgTabsPropTypes['BeforeCloseMethod']>,
		permissionMethod: Function as PropType<T_Global_Config_Props['permissionMethod']>,
	},
	emits: ['update:modelValue', 'change', 'tab-change-fail', 'tab-remove', 'tab-remove-fail', 'tab-click', 'tab-load'] as JlgTabsEmits,
	setup(props, context) {
		type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
		const { slots, emit } = context;

		const xID = XEUtils.uniqueId();

		const refElem = ref<HTMLDivElement>();
		const refHeaderElem = ref<HTMLDivElement>();

		const reactData = reactive<TabsReactData>({
			staticTabs: [],
			activeName: props.modelValue,
			initNames: props.modelValue ? [props.modelValue] : [],
		});

		const refMaps: TabsPrivateRef = {
			refElem,
		};

		const handleFilterTab = (item: JlgTabPaneProps | JlgTabPaneDefines['TabConfig']) => {
			const { permissionCode } = item;
			const { permissionMethod } = props;
			if (permissionCode && permissionMethod) {
				if (!permissionMethod({ code: permissionCode })) {
					return false;
				}
			}
			return true;
		};

		const computeTabOptions = computed(() => {
			const { options } = props;
			return (options || []).filter(handleFilterTab);
		});

		const computeTabStaticOptions = computed(() => {
			const { staticTabs } = reactData;
			return staticTabs.filter(handleFilterTab);
		});

		const computeActiveOptionTab = computed(() => {
			const { activeName } = reactData;
			const tabOptions = computeTabOptions.value;
			return tabOptions.find((item) => item.name === activeName);
		});

		const computeActiveDefaultTab = computed(() => {
			const { activeName } = reactData;
			const tabStaticOptions = computeTabStaticOptions.value;
			return tabStaticOptions.find((item) => item.name === activeName);
		});

		const computeMaps: JlgTabsPrivateComputed = {};

		const $xeTabs = {
			xID,
			props,
			context,
			reactData,

			getRefMaps: () => refMaps,
			getComputeMaps: () => computeMaps,
		} as unknown as JlgTabsConstructor & JlgTabsPrivateMethods;

		const callSlot = (slotFunc: any, params: any) => {
			if (slotFunc) {
				if (XEUtils.isString(slotFunc)) {
					slotFunc = slots[slotFunc] || null;
				}
				if (XEUtils.isFunction(slotFunc)) {
					return getSlotVNs(slotFunc(params));
				}
			}
			return [];
		};

		const dispatchEvent = (type: ValueOf<JlgTabsEmits>, params: Record<string, any>, event: Event | null) => {
			emit(type, Object.assign({ $event: event, $tabs: $xeTabs }, params));
		};

		const clickEvent = (event: KeyboardEvent, item: JlgTabPaneProps | JlgTabPaneDefines['TabConfig'], isClick = true) => {
			const beforeMethod = props.beforeChangeMethod;
			const { initNames, activeName } = reactData;
			const { name } = item;
			let isInit = false;
			const value = name;
			if (!initNames.includes(name)) {
				isInit = true;
				initNames.push(name);
			}
			reactData.activeName = name;
			emit('update:modelValue', value);
			isClick && dispatchEvent('tab-click', { name }, event);
			if (name !== activeName) {
				if (!beforeMethod || beforeMethod({ $tabs: $xeTabs, name })) {
					dispatchEvent('change', { value, name, oldName: activeName, newName: name }, event);
				} else {
					dispatchEvent('tab-change-fail', { value, name, oldName: activeName, newName: name }, event);
				}
				if (isInit) {
					dispatchEvent('tab-load', { name }, event);
				}
			}
		};

		const handleCloseTabEvent = (event: KeyboardEvent, item: JlgTabPaneDefines['TabConfig'] | JlgTabPaneProps) => {
			const beforeMethod = props.beforeCloseMethod;
			const { activeName } = reactData;
			const { name } = item;
			const value = name;
			event.stopPropagation();
			if (!beforeMethod || beforeMethod({ $tabs: $xeTabs, name })) {
				const defaultSlot = slots ? slots.default : null;
				const options = defaultSlot ? computeTabStaticOptions.value : computeTabOptions.value;
				options.splice(
					options.findIndex((item2) => item2.name === name),
					1
				);
				let newItem = null;
				if (name === activeName && options.length) {
					newItem = options[0];
				} else if (name !== activeName) {
					newItem = options.find((item) => item.name === activeName);
				}
				// 重置激活状态,不然视图肯呢个不会更新
				reactData.activeName = '';
				!!newItem && clickEvent(event, newItem, false);
				dispatchEvent('tab-remove', { value, name }, event);
			} else {
				dispatchEvent('tab-remove-fail', { value, name }, event);
			}
		};

		const tabsMethods: TabsMethods = {
			dispatchEvent,
		};

		const tabsPrivateMethods: TabsPrivateMethods = {};

		Object.assign($xeTabs, tabsMethods, tabsPrivateMethods);

		const renderTabHeader = (list: JlgTabsPropTypes['Options'] | JlgTabPaneDefines['TabConfig'][]) => {
			const { titleWidth: allTitleWidth, titleAlign: allTitleAlign, showClose } = props;
			const { activeName } = reactData;
			return h(
				'div',
				{
					class: 'jlg-tabs-header',
				},
				[
					h(
						'div',
						{
							ref: refHeaderElem,
							class: 'jlg-tabs-header--wrapper',
						},
						list.map((item) => {
							const { title, titleWidth, titleAlign, icon, name, slots } = item;
							const tabSlot = slots ? slots.tab : null;
							const itemWidth = titleWidth || allTitleWidth;
							const itemAlign = titleAlign || allTitleAlign;
							return h(
								'div',
								{
									key: `${name}`,
									class: [
										'jlg-tabs-header--item',
										itemAlign ? `align--${itemAlign}` : '',
										{
											'is--active': activeName === name,
										},
									],
									style: itemWidth
										? {
												width: toCssUnit(itemWidth),
											}
										: null,
									onClick(event: KeyboardEvent) {
										clickEvent(event, item);
									},
								},
								[
									h(
										'div',
										{
											class: 'jlg-tabs-header--item-inner',
										},
										[
											icon
												? h(
														'div',
														{
															class: 'jlg-tabs-header--item-icon',
														},
														[
															h('i', {
																class: icon,
															}),
														]
													)
												: createCommentVNode(),
											h(
												'div',
												{
													class: 'jlg-tabs-header--item-name',
												},
												tabSlot ? callSlot(tabSlot, { name, title }) : `${title}`
											),
											showClose
												? h(
														'div',
														{
															class: 'jlg-tabs-header--close-btn',
															onClick(event: KeyboardEvent) {
																handleCloseTabEvent(event, item);
															},
														},
														[
															h('i', {
																class: 'vxe-icon-' + 'error-circle-fill',
															}),
														]
													)
												: createCommentVNode(),
										]
									),
								]
							);
						})
					),
				]
			);
		};

		const renderOptionPane = (item: JlgTabPaneProps) => {
			const { initNames, activeName } = reactData;
			const { name, slots } = item;
			const defaultSlot = slots ? slots.default : null;
			return h(
				JlgTabPaneComponent,
				{
					key: name,
					...item,
					isDefault: true,
				},
				{
					default: () => {
						return name && initNames.includes(name)
							? h(
									'div',
									{
										key: name,
										class: [
											'jlg-tabs-pane--item',
											{
												'is--visible': activeName === name,
											},
										],
									},
									callSlot(defaultSlot, {})
								)
							: createCommentVNode();
					},
				}
			);
		};

		const renderOptionContent = (tabList: JlgTabsPropTypes['Options']) => {
			const { destroyOnClose } = props;
			const activeOptionTab = computeActiveOptionTab.value;
			if (destroyOnClose) {
				return activeOptionTab ? [renderOptionPane(activeOptionTab)] : createCommentVNode();
			}
			return tabList.map(renderOptionPane);
		};

		const renderDefaultPane = (item: JlgTabPaneDefines['TabConfig']) => {
			const { initNames, activeName } = reactData;
			const { name, slots } = item;
			const defaultSlot = slots ? slots.default : null;
			return name && initNames.includes(name)
				? h(
						'div',
						{
							key: name,
							class: [
								'jlg-tabs-pane--item',
								{
									'is--visible': activeName === name,
								},
							],
						},
						callSlot(defaultSlot, {})
					)
				: createCommentVNode();
		};

		const renderDefaultContent = (staticTabList: JlgTabPaneDefines['TabConfig'][]) => {
			const { destroyOnClose } = props;
			const activeDefaultTab = computeActiveDefaultTab.value;
			if (destroyOnClose) {
				return activeDefaultTab ? [renderDefaultPane(activeDefaultTab)] : createCommentVNode();
			}
			return staticTabList.map(renderDefaultPane);
		};

		const renderVN = () => {
			const { type, height, padding } = props;
			const tabOptions = computeTabOptions.value;
			const tabStaticOptions = computeTabStaticOptions.value;
			const defaultSlot = slots.default;
			return h(
				'div',
				{
					ref: refElem,
					class: [
						'jlg-tabs',
						`jlg-tabs--${type || 'default'}`,
						{
							'is--padding': padding,
						},
					],
					style: height
						? {
								height: toCssUnit(height),
							}
						: null,
				},
				[
					h(
						'div',
						{
							class: 'jlg-tabs-slots',
						},
						defaultSlot ? defaultSlot({}) : []
					),
					renderTabHeader(defaultSlot ? tabStaticOptions : tabOptions),
					h(
						'div',
						{
							class: 'jlg-tabs-pane',
						},
						defaultSlot ? renderDefaultContent(tabStaticOptions) : renderOptionContent(tabOptions)
					),
				]
			);
		};

		watch(
			() => props.modelValue,
			(val) => {
				reactData.activeName = val;
			}
		);

		$xeTabs.renderVN = renderVN;

		provide('$xeTabs', $xeTabs);

		return $xeTabs;
	},
	render() {
		return this.renderVN();
	},
});
