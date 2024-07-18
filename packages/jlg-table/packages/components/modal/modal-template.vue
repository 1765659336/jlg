<template>
	<vxe-modal
		ref="xModalRef"
		v-bind="modalOptions"
		:class-name="modalClass"
		type="modal"
		:destroy-on-close="false"
		:show-close="showClose"
		:show-zoom="showZoom"
	>
		<template #default>
			<slot></slot>
		</template>
		<!--   窗口头部的模板（如果使用了，则 slot title 与  slot corner无效） -->
		<template v-if="slots.header" #header>
			<slot name="header"></slot>
		</template>
		<!--   窗口标题的模板 -->
		<template v-if="slots.title" #title>
			<slot name="title"></slot>
		</template>
		<!--   窗口右上角的模板 -->
		<template #corner>
			<slot name="corner">
				<i
					v-if="_buttonsMap.shrink !== false"
					:class="`vxe-modal--zoom-btn trigger--btn ${shrinkStore.isShrink ? GlobalConfig.icon.MODAL_FOLD : GlobalConfig.icon.MODAL_UNFOLD}`"
					:title="shrinkStore.isShrink ? '展开' : '收缩'"
					@dblclick.stop
					@click.stop="shrinkStore.toggleShrinkEvent()"
				></i>
				<i
					v-if="_buttonsMap.custom !== false"
					:class="`vxe-modal--zoom-btn trigger--btn ${GlobalConfig.icon.SETTING_CUSTOM}`"
					title="设置"
					@dblclick.stop
					@click="custom"
				></i>
				<i
					v-if="_buttonsMap.hide !== false"
					:class="`vxe-modal--zoom-btn trigger--btn ${GlobalConfig.icon.MODAL_MINUS}`"
					title="最小化"
					@dblclick.stop
					@click="hide"
				></i>
			</slot>
		</template>
		<!--   窗口底部的模板 -->
		<template #footer>
			<div v-show="!shrinkStore.isShrink" class="modal--footer">
				<slot name="footer">
					<el-button @click="cancel">{{ modalOptions.cancelButtonText }}</el-button>
					<el-button type="primary" @click="confirm">{{ modalOptions.confirmButtonText }}</el-button>
				</slot>
			</div>
		</template>
	</vxe-modal>
</template>

<script setup lang="ts">
import { computed, defineOptions, nextTick, onMounted, reactive, useAttrs, watch } from 'vue';
import { T_Buttons, T_Jlg_Modal_Instance, T_Modal_Options } from './type';
import { VxeModalDefines, VxeModalInstance } from 'vxe-table';
import { dynamicModalStore, useDynamicModal } from './index';
import { ElButton } from 'element-plus';
import GlobalConfig from '../../../lib/useGlobalConfig';
import debounce from 'xe-utils/debounce';

defineOptions({
	name: 'ModalTemplate',
	inheritAttrs: false,
});

const { getModal, closeModal } = useDynamicModal();
const xModalRef = ref<VxeModalInstance>(null);

const emit = defineEmits<{
	close: [];
	hide: [];
	cancel: [params: VxeModalDefines.CancelEventParams];
	confirm: [params: VxeModalDefines.ConfirmEventParams];
	show: [params: VxeModalDefines.ShowEventParams];
	zoom: [params: VxeModalDefines.ZoomEventParams];
	custom: [params: T_Modal_Options];
	resize: [params: VxeModalDefines.ResizeEventParams];
}>(); // 定义事件

const attrs = useAttrs();
const slots = useSlots();

function toNumber(str: unknown) {
	if (typeof str === 'string') {
		const num = parseFloat(str.replace(/,/g, ''));
		if (!isNaN(num)) {
			return num;
		}
	} else if (typeof str === 'number') {
		return str;
	}
	return 0;
}

/**
 * 功能扩展,添加收缩展开功能
 * */
const shrinkStore = reactive({
	isShrink: false,
	oldHeight: 0,
	loading: false,
	toggleShrinkEvent: () => {
		if (shrinkStore.loading) return;
		nextTick(async () => {
			const _sMaximized = isMaximized();
			const modalElement = xModalRef.value.getBox();
			// header 高度
			const headerHeight: number = modalElement.querySelector('.vxe-modal--header')?.clientHeight + 2 || 38;
			if (_sMaximized) {
				await revert();
			}
			shrinkStore.isShrink = !shrinkStore.isShrink;
			if (shrinkStore.isShrink) {
				shrinkStore.oldHeight = modalElement.offsetHeight;
				modalElement.style.height = `${headerHeight}px`;
			} else {
				modalElement.style.height = `${shrinkStore.oldHeight}px`;
				await shrinkStore.updatePosition();
			}
			shrinkStore.loading = false;
		});
	},
	updatePosition: async () => {
		return nextTick().then(() => {
			const props = xModalRef.value.props;
			const { position } = props;
			const marginSize = toNumber(props.marginSize);
			const boxElem = getBox();
			const clientVisibleWidth = document.documentElement.clientWidth || document.body.clientWidth;
			const clientVisibleHeight = document.documentElement.clientHeight || document.body.clientHeight;
			const isPosCenter = position === 'center';
			const { top, left }: any = typeof position === 'string' ? { top: position, left: position } : Object.assign({}, position);
			const topCenter = isPosCenter || top === 'center';
			const leftCenter = isPosCenter || left === 'center';
			let posTop = '';
			let posLeft = '';
			if (left && !leftCenter) {
				posLeft = isNaN(left) ? left : `${left}px`;
			} else {
				posLeft = `${Math.max(marginSize, clientVisibleWidth / 2 - boxElem.offsetWidth / 2)}px`;
			}
			if (top && !topCenter) {
				posTop = isNaN(top) ? top : `${top}px`;
			} else {
				posTop = `${Math.max(marginSize, clientVisibleHeight / 2 - boxElem.offsetHeight / 2)}px`;
			}
			boxElem.style.top = posTop;
			boxElem.style.left = posLeft;
		});
	},
});

// 劫持vxe-modal 的  beforeHideMethod
const beforeHideMethod = ({ type }) => {
	let _type = type;
	// 通过切换 modelValue 的值控制modal的显示隐藏时，type === 'model'
	if (type === 'model') {
		_type = dynamicModalStore.eventType === 'close' ? 'close' : 'model';
	}
	const _beforeHideMethod = attrs?.['before-hide-method'] || attrs?.['beforeHideMethod'];
	if (_beforeHideMethod && typeof _beforeHideMethod === 'function') {
		return _beforeHideMethod?.({ type: _type });
	}
	const _beforeHideMethodTwo = attrs?.modalOptions?.['before-hide-method'] || attrs?.modalOptions?.['beforeHideMethod'];
	if (_beforeHideMethod) {
		return _beforeHideMethodTwo({ type: _type });
	}
	return Promise.resolve(true);
};

const $modal = getModal((attrs?.name as string) ?? '');

function handleResize() {
	// 如果是全屏状态，重新设置为全屏
	if (isMaximized()) {
		const oldZoomData = JSON.parse(JSON.stringify(xModalRef.value.reactData.zoomLocat));
		xModalRef.value.reactData.zoomLocat = null;
		maximize().then(() => {
			xModalRef.value.reactData.zoomLocat = oldZoomData;
		});
	}
}

const debounceResize = debounce(handleResize, 300);
onMounted(() => {
	// 监听window的resize事件
	window.addEventListener('resize', debounceResize);
	if ($modal) {
		$modal.ref = xModalRef.value;
	}
});
onUnmounted(() => {
	window.removeEventListener('resize', debounceResize);
});

/**
 * 重写默认的 onHide 事件,由于原生 vxe-modal 没有最小化弹窗的功能,所以需要自定义。
 *  1.  关闭弹窗不能使用默认的 xModalRef.value.close 方法, 而是统一调用  closeModal 来触发 onHide 事件，再在 onHide 事件中控制分发。
 * */
const onHide = (params?: VxeModalDefines.HideEventParams) => {
	if (params?.type === 'close') dynamicModalStore.eventType = 'close';
	if (dynamicModalStore.eventType === 'close') {
		const _close = attrs?.modalOptions?.['on-close'] || attrs?.modalOptions?.['onClose'];
		_close && _close();
		emit('close');
		const index = dynamicModalStore.modals.findIndex((vm) => vm.component.name === attrs.name);
		dynamicModalStore.modals.splice(index, 1);
	} else if (dynamicModalStore.eventType === 'hide') {
		const _hide = attrs?.modalOptions?.['on-hide'] || attrs?.modalOptions?.['onHide'];
		_hide && _hide();
		emit('hide');
	}
};

const onShow = (params: VxeModalDefines.ShowEventParams) => {
	const _show = attrs?.modalOptions?.['on-show'] || attrs?.modalOptions?.['onShow'];
	_show && _show(params);
	emit('show', params);
};

const onZoom = (params: VxeModalDefines.ZoomEventParams) => {
	const _zoom = attrs?.modalOptions?.['on-zoom'] || attrs?.modalOptions?.['onZoom'];
	_zoom && _zoom(params);
	emit('zoom', params);
};

const onCancel = (params: VxeModalDefines.CancelEventParams) => {
	const _cancel = attrs?.modalOptions?.['on-cancel'] || attrs?.modalOptions?.['onCancel'];
	_cancel && _cancel(params);
	emit('cancel', params);
};

const onConfirm = (params: VxeModalDefines.ConfirmEventParams) => {
	const _confirm = attrs?.modalOptions?.['on-confirm'] || attrs?.modalOptions?.['onConfirm'];
	_confirm && _confirm(params);
	emit('confirm', params);
};

const onResize = (params: VxeModalDefines.ResizeEventParams) => {
	const _confirm = attrs?.modalOptions?.['on-resize'] || attrs?.modalOptions?.['onResize'];
	_confirm && _confirm(params);
	emit('resize', params);
};

const modalOptions = computed<T_Modal_Options>({
	get: () => {
		if (attrs?.modalOptions && typeof attrs.modalOptions === 'object') {
			return {
				...attrs.modalOptions,
				beforeHideMethod: beforeHideMethod,
				// events
				onHide,
				onShow,
				onZoom,
				onCancel,
				onConfirm,
				onResize,
				// 覆盖 vxe-modal 默认的 关闭按钮点击时触发的事件
				onClose: () => {},
			};
		}
		return {};
	},
	set: () => {},
});

// 手动打开窗口
const open = () => {
	return xModalRef.value.open();
};
// 手动关闭窗口
const close = () => {
	return closeModal(attrs.name as string, 'close');
};
//  手动隐藏窗口
const hide = () => {
	return closeModal(attrs.name as string, 'hide');
};

// 手动打开自定义设置窗口
const custom = () => {
	return new Promise((resolve) => {
		const params = { ...modalOptions.value };
		emit('custom', params);
		resolve(params);
	});
};

// 获取当前窗口元素
const getBox = () => {
	return xModalRef.value.getBox();
};

// 获取窗口位置
const getPosition = () => {
	return xModalRef.value.getPosition();
};
// 设置窗口位置
const setPosition = (top?: number, left?: number) => {
	return xModalRef.value.setPosition(top, left);
};
/**
 * 判断是否最大化显示
 */
const isMaximized = () => {
	return xModalRef.value.isMaximized();
};
/**
 * 切换窗口最大化/还原
 */
const zoom = () => {
	return xModalRef.value.zoom();
};
/**
 * 如果窗口处于常规状态，则最大化窗口
 */
// maximize(): Promise<any>
const maximize = () => {
	return xModalRef.value.maximize();
};
/**
 * 如果窗口处于最大化状态，则还原窗口
 */
const revert = () => {
	return xModalRef.value.revert();
};

// 手动触发点击取消按钮时的事件
const cancel = (event: Event) => {
	const type = 'cancel';
	xModalRef.value.dispatchEvent(type, { type }, event);
	close();
};

// 动触发点点击确认按钮时的事件
const confirm = (event: Event) => {
	const type = 'confirm';
	xModalRef.value.dispatchEvent(type, { type }, event);
};

const _buttonsMap: { [key in T_Buttons]?: boolean } = reactive({
	shrink: attrs?.modalOptions['showShrink'] ?? true,
	custom: attrs?.modalOptions['showCustom'] ?? true,
	hide: attrs?.modalOptions['showHide'] ?? true,
	zoom: attrs?.modalOptions['showZoom'] ?? false,
	close: attrs?.modalOptions['showClose'] ?? false,
});
const showClose = computed(() => _buttonsMap.close);
const showZoom = computed(() => _buttonsMap.zoom);
watch(
	() => _buttonsMap,
	(newVal) => {
		modalOptions.value.showZoom = newVal.zoom;
		modalOptions.value.showClose = newVal.close;
	},
	{ deep: true }
);

const toggleCorner = (buttons: boolean | T_Buttons[]) => {
	const _buttons = typeof buttons === 'boolean' ? ['shrink', 'zoom', 'custom', 'hide', 'close'] : buttons;

	_buttons.forEach((item) => {
		_buttonsMap[item] = typeof buttons === 'boolean' ? buttons : true;
	});
};

const isCustom = ref(false);
const modalClass = computed(() => {
	if (isCustom.value) {
		return 'custom-setting';
	}
	return '';
});
const toggleCustom = (_isCustom: boolean) => {
	isCustom.value = _isCustom;
};

// 暴露常用方法
defineExpose<T_Jlg_Modal_Instance>({
	open,
	close,
	hide,
	getBox,
	getPosition,
	setPosition,
	isMaximized,
	zoom,
	maximize,
	revert,
	cancel,
	confirm,
	custom,
	toggleCorner,
	toggleCustom,
	ref: xModalRef,
});
</script>

<style lang="scss"></style>
