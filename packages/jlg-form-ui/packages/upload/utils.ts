import { I_uploadUserFile } from './types';

export function useUtils(fileRemotePath: string) {
	const openLink = (link: string): void => {
		const $a: HTMLElement = document.createElement('a');
		$a.setAttribute('href', link);
		$a.setAttribute('target', '_blank');
		$a.setAttribute('rel', 'noreferrer noopener');
		$a.setAttribute('id', 'external');
		document.getElementById('external') && document.body.removeChild(document.getElementById('external') as HTMLElement);
		document.body.appendChild($a);
		$a.click();
		$a.remove();
	};

	function checkFileType(fileName: string) {
		let fileExtension = '';
		if (fileName.lastIndexOf('.') > -1) {
			fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
		}
		return fileExtension;
	}

	function getFileSize(size: number) {
		if (size < 1024) {
			return `${size}B`;
		} else if (size < 1024 * 1024) {
			return `${(size / 1024).toFixed(2)}KB`;
		} else if (size < 1024 * 1024 * 1024) {
			return `${(size / 1024 / 1024).toFixed(2)}MB`;
		} else {
			return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
		}
	}

	function isImage(fileExt: string): boolean {
		if (!fileExt) return false;
		const fileType = checkFileType(fileExt);
		return fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg' || fileType === 'gif';
	}

	function isPdf(fileExt: string) {
		if (!fileExt) return false;
		const fileType = checkFileType(fileExt);
		return fileType === 'pdf';
	}

	function isDoc(fileExt: string) {
		if (!fileExt) return false;
		const fileType = checkFileType(fileExt);
		return fileType === 'doc' || fileType === 'docx';
	}

	function isXls(fileExt: string) {
		if (!fileExt) return false;
		const fileType = checkFileType(fileExt);
		return fileType === 'xls' || fileType === 'xlsx';
	}

	function srcList(fileList: Array<any>, fileName = 'name') {
		return fileList.map((item) => {
			return getImageUrl(item, fileName)?.path;
		});
	}
	function getFileUrl(file: any, fileName = 'name') {
		const path = file.path;
		const name = file[fileName];
		if (path && name) {
			return {
				path: fileRemotePath + path,
				name: name,
			};
		}
	}
	/**
	 * 使用 fetch 获取 url 得到 blob 对象, 并使用 a 标签下载。
	 */
	async function downloadBlob(file: any) {
		const href = getFileUrl(file)?.path as string;
		const name = getFileUrl(file)?.name + file.ext;
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
	}
	// 获取图片的地址
	function getImageUrl(file: I_uploadUserFile, fileName = 'name') {
		const path = file.path;
		const name = file[fileName];
		return {
			path: path ? fileRemotePath + path : '',
			name: name,
		};
	}
	return {
		openLink,
		checkFileType,
		getFileSize,
		getFileUrl,
		getImageUrl,
		isImage,
		isPdf,
		isDoc,
		isXls,
		srcList,
		downloadBlob,
	};
}
