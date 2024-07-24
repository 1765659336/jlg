import { I_Dynamic_Modal_Store, I_Modal_Controller, T_Modal_Params } from './type';
import uniqueId from 'xe-utils/uniqueId';
import find from 'xe-utils/find';
import { nextTick, reactive, markRaw } from 'vue';
import DynamicModal from './index.vue';
import ModalTemplate from './modal-template.vue';
import { withInstall } from '../../../lib/install';

export const dynamicModalStore = reactive<I_Dynamic_Modal_Store>({
	modals: [],
	eventType: 'close',
});

function existModal(options: T_Modal_Params) {
	return dynamicModalStore.modals.findIndex((vm) => vm.component.name === options.component.name);
}

function openModal(options: T_Modal_Params): Promise<I_Modal_Controller> {
	return new Promise((resolve, reject) => {
		options.component = markRaw(options.component);
		if (options.component?.name === 'AsyncComponentWrapper' && !!options.modalOptions?.id) {
			options.component.name = options.modalOptions.id;
		}
		const name = options.component?.name;

		function addModal() {
			if (!options.key) {
				options.key = uniqueId();
			}
			const modalOpts = Object.assign(options.modalOptions, {
				modelValue: true,
				cancelButtonText: options.modalOptions.cancelButtonText ?? '关闭',
				confirmButtonText: options.modalOptions.confirmButtonText ?? '完成',
			});
			const modalItem = { ...options, modalOptions: modalOpts };
			dynamicModalStore.modals.push(modalItem);
			const modalController = {
				get: () => modalItem,
				hide: () => closeModal(name, 'hide'),
				close: () => closeModal(name, 'close'),
			};
			resolve(modalController);
		}
		if (!name) {
			reject('error');
			return Error('component.name 不能为空');
		}
		const index = existModal(options);
		if (index !== -1) {
			dynamicModalStore.modals.splice(index, 1);
			// 这里添加定时器是为了让原modal删除之后，再重新添加一个新的modal
			setTimeout(() => {
				addModal();
			}, 0);
		} else {
			addModal();
		}
	});
}

function getModal(name: string) {
	return find(dynamicModalStore.modals, ($modal: T_Modal_Params) => $modal.component?.name === name);
}

/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 name 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal(name?: string, type: I_Dynamic_Modal_Store['eventType'] = 'close') {
	const modals = name ? [getModal(name)] : dynamicModalStore.modals;
	const _close = ($modal: T_Modal_Params, type: I_Dynamic_Modal_Store['eventType']) => {
		switch (type) {
			// 销毁
			case 'close':
				dynamicModalStore.eventType = 'close';
				break;
			// 隐藏
			case 'hide':
				dynamicModalStore.eventType = 'hide';
		}
		// 将modal的 modelValue 设置为 false，会自动触发 onHide 事件，再在 onHide 事件中控制分发 onHide 与 onClose。
		if ($modal.modalOptions.modelValue === false) {
			// 如果已经处于最小化状态,不会自动触发 onHide 事件,需要手动执行 xModalRef.value.close
			$modal.ref.reactData.visible = true;
			$modal.ref.close().then(() => {
				$modal.ref.reactData.visible = false;
			});
		} else {
			$modal.modalOptions.modelValue = false;
		}

		return nextTick();
	};

	const restPromises: Promise<any>[] = [];
	modals.forEach(($modal) => {
		if ($modal) {
			restPromises.push(_close($modal, type));
		}
	});
	return Promise.all(restPromises);
}

export const useDynamicModal = () => {
	return {
		getModal,
		openModal,
		closeModal,
	};
};

// 注册组件
export const JlgDynamicModal = withInstall(DynamicModal);
export const JlgModalTemplate = withInstall(ModalTemplate);
export * from './type';
