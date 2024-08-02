import type { ComponentInternalInstance, VNode } from 'vue';
import { createVNode, render } from 'vue';
import FileViewerConstructor from './file-viewer.vue';

export interface FileViewerHandler {
	close: () => void;
}
export type FileViewerContext = {
	vnode: VNode;
	handler: FileViewerHandler;
	vm: ComponentInternalInstance;
	props: any;
};
const createFileViewer = (options: any): FileViewerContext => {
	const container = document.createElement('div');

	const props = {
		...options,
		// 销毁图片预览组件
		onDestroy: () => {
			render(null, container);
		},
	};
	const vnode = createVNode(FileViewerConstructor, props);

	render(vnode, container);

	const vm = vnode.component!;
	const handler = {
		close: () => {
			vm.exposed!.closeViewer();
		},
	};

	return {
		vnode,
		vm,
		handler,
		props: (vnode.component as any).props,
	};
};

// 判断某种文件类型是否支持对应的预览方式
function isPreviewSupported(filePath: string, list: Array<string>): boolean {
	const fileExtension = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();
	return list.includes(fileExtension);
}

/**
 * @description 单个文件预览, 支持图片预览和的office 文件（企速通环境）预览
 * @param {Object} file 文件对象
 * @param {Object} defaultConfig 默认配置
 * */
export const FileViewer = (file: Record<string, any>, defaultConfig: Record<string, any>) => {
	const config = {
		preurl: defaultConfig.preurl || '',
		urlKey: defaultConfig.urlKey || 'path',
		nameKey: defaultConfig.nameKey || 'name',
		extKey: defaultConfig.extKey || 'ext',
		onlyOfficeFileList: defaultConfig.onlyOfficeFileList || [],
		initialIndex: defaultConfig.initialIndex || 0,
		hideOnClickModal: defaultConfig.hideOnClickModal || false,
		onClose: defaultConfig.onClose || undefined,
	};
	// 图片预览
	if (file && typeof file === 'object' && isPreviewSupported(file[config.urlKey], ['jpg', 'png', 'jpeg', 'gif'])) {
		const props = {
			urlList: [file[config.urlKey]],
			initialIndex: config?.initialIndex || 0,
			hideOnClickModal: config?.hideOnClickModal || false,
			onClose: config?.onClose || undefined,
		};
		return createFileViewer(props).handler;
	}

	// 其他文件类型的预览
	if (file && typeof file === 'object') {
		if (!config.preurl) {
			console.error('请配置预览地址');
			return;
		}
		try {
			// @ts-expect-error 控制 企速通 环境下的预览
			const electron = window.require('electron');
			const { ipcRenderer } = electron;
			// 判断是否设置了 OnlyOffice 支持的文件格式的预览
			if (config.onlyOfficeFileList && config.onlyOfficeFileList.length) {
				if (!isPreviewSupported(file[config.urlKey], config.onlyOfficeFileList)) {
					return new Error('不支持的文件格式');
				}
			}

			ipcRenderer.send('previewWord', {
				preurl: config.preurl,
				...file,
			});
		} catch (e) {
			// 浏览器环境下的预览 或者 electron 环境下的预览失败
			if (isPreviewSupported(file[config.urlKey], ['pdf'])) {
				// pdf 预览, 直接打开新窗口
				const link: string = config.preurl + file[config.urlKey];
				const $a: HTMLElement = document.createElement('a');
				$a.setAttribute('href', link || '');
				$a.setAttribute('target', '_blank');
				$a.setAttribute('rel', 'noreferrer noopener');
				$a.setAttribute('id', 'external');
				document.getElementById('external') && document.body.removeChild(document.getElementById('external') as HTMLElement);
				document.body.appendChild($a);
				$a.click();
				$a.remove();
			} else {
				const downloadFile = async (file: any) => {
					const href = config.preurl + file[config.urlKey];
					const name = file[config.nameKey] + file[config.extKey];
					// 如果图片有跨域问题，可能会因为获取不到资源而下载失败
					const fetchRes = await fetch(href);
					const blob = await fetchRes.blob();
					// 下载（不考虑IE）
					const a = document.createElement('a');
					a.download = name;
					a.href = URL.createObjectURL(blob);
					a.style.display = 'none';
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
				};
				// 其他文件类型, 直接下载
				downloadFile(file).then(() => {});
			}
		}
	}
};

/**
 * @description 图片预览
 * @param {Object} props 配置项,参数与 ElImageViewer 一致
 * */
export function ImageViewer(props: any) {
	const instance = createFileViewer(props);
	return instance.handler;
}

export default {
	file: FileViewer,
	image: ImageViewer,
};
