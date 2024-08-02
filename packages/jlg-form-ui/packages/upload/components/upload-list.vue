<template>
	<div v-for="(file, index) in props.fileList" :key="index" :style="{ marginRight: '12px', marginBottom: '12px', ...props.blockStyle }">
		<div class="content-card flex p-x-2 p-y-2 items-center">
			<span v-if="file[props.typeKey]" class="option-index">{{ file[props.typeKey] }}</span>
			<div class="flex w-50px h-50px flex-shrink-0 relative">
				<div class="mask b-rd-4px">
					<el-icon v-if="file.status === 'uploading' || file.status === 'ready'" class="is-loading"> <Loading /></el-icon>
					<template v-else>
						<el-icon> <ZoomIn /></el-icon>
						<span class="text-12px pl-2px">预览</span>
					</template>
				</div>
				<!--     图片文件显示缩略图       -->
				<template v-if="isImage(file.ext)">
					<el-image
						rounded-3px
						class="w-full h-full b-rd-4px"
						:preview-teleported="true"
						:src="getImageUrl(file).path"
						:preview-src-list="previewSrcList"
						:initial-index="previewSrcList.indexOf(getImageUrl(file).path)"
						fit="cover"
						@click="handlePreview(file)"
					/>
				</template>
				<!--     其他文件   -->
				<template v-else>
					<component :is="getPicture(file)" class="w-full h-full cursor-pointer" @click="handleRestFile(file)" />
				</template>
			</div>
			<div class="flex-auto name-col flex items-center" :title="file.name">
				<p class="g-text-overflow-hidden">
					{{ file.name }}
				</p>
				<span style="width: 35px">
					{{ file.ext }}
				</span>
			</div>
			<div class="handle-col flex items-center w-55px flex-shrink-0">
				<div v-if="!props.disabled" class="delete-icon absolute" @click="deleteRowEvent(file)">
					<el-icon class="close-bold" color="#fff" size="12px">
						<CloseBold />
					</el-icon>
				</div>
				<div v-show="file.status !== 'uploading'" class="handle-wrap display-inherit absolute bottom-5px">
					<slot name="handle" :file="file">
						<button
							v-if="props.showDownload && file?.path"
							v-show="file.status !== 'uploading'"
							class="download-btn"
							type="button"
							@click="downloadFile(file)"
						>
							<el-icon style="color: var(--el-color-primary)" size="14px">
								<Download />
							</el-icon>
							<span class="download-btn"> 下载 </span>
						</button>
					</slot>
				</div>
			</div>
		</div>
		<el-progress v-if="file.status === 'uploading'" type="line" :stroke-width="2" :percentage="Number(file.percentage)" />
	</div>
	<el-image-viewer
		v-if="isShowImageViewer"
		:url-list="previewSrcList"
		:initial-index="currentRow ? previewSrcList.indexOf(getImageUrl(currentRow).path) : 0"
		fit="cover"
		@close="isShowImageViewer = false"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'JlgUploadList',
});
</script>
<!-- 组合式API setup语法糖 -->
<script lang="ts" setup>
import { ElIcon, ElImage, ElImageViewer, ElProgress } from 'element-plus';
import { CloseBold, Download, ZoomIn, Loading } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
import { useUtils } from '../utils';

// 引入svg
import excelComponent from '../assets/excel.svg?component';
import jpegComponent from '../assets/jpeg.svg?component';
import jpgComponent from '../assets/jpg.svg?component';
import pdfComponent from '../assets/pdf.svg?component';
import pngComponent from '../assets/png.svg?component';
import wordComponent from '../assets/word.svg?component';
import pptComponent from '../assets/ppt.svg?component';
import unknownFile from '../assets/file-default.svg?component';
import { I_fileListType, uploadListEmits, uploadListProps } from './use-upload-list';

const emit = defineEmits(uploadListEmits);
const props = defineProps(uploadListProps);
const { checkFileType, getFileUrl, getImageUrl, isImage, isPdf, openLink, srcList } = useUtils(props.uploadShowPath as string);

const previewSrcList = computed(() => {
	const list = props.fileList?.length ? props.fileList : [];
	return srcList(list.filter((fileItem) => isImage(fileItem.ext)));
});

const isShowImageViewer = ref(false);
const currentRow = ref<I_fileListType>();
// 预览图片
const handlePreviewImages = (file: any) => {
	currentRow.value = file;
	isShowImageViewer.value = true;
};

function getPicture(file: any) {
	try {
		if (!file.ext && !file.path) return;
		const fileExtension = checkFileType(file.ext || file.path);
		switch (fileExtension) {
			// 图片
			case 'jpg':
				return jpgComponent;
			case 'png':
				return pngComponent;
			case 'jpeg':
				return jpegComponent;
			// 文档
			case 'doc':
			case 'docx':
				return wordComponent;
			case 'xls':
			case 'xlsx':
				return excelComponent;
			// pdf
			case 'pdf':
				return pdfComponent;
			// ppt
			case 'ppt':
			case 'pptx':
				return pptComponent;
			// 其他
			default:
				return unknownFile;
		}
	} catch (e) {
		console.error('[获取文件扩展名失败!]:', e);
	}
}

const downloadFile = async (file: any) => {
	const href = getFileUrl(file)?.path || '';
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
};

const deleteRowEvent = (file: I_fileListType) => {
	emit('delete', file, props.fileList?.indexOf(file));
};
const handlePreview = (file: I_fileListType) => {
	if (props.onPreview && typeof props.onPreview === 'function') return props.onPreview(file);
};

const handleRestFile = (file: I_fileListType) => {
	if (!file) return;
	handlePreview(file);
	if (isImage(file.ext)) {
		handlePreviewImages(file);
	} else {
		// 其余文件优先调用企速通封装的预览
		handlePreviewWord(file);
	}
};

// 企速通 word预览
const handlePreviewWord = (file: any) => {
	try {
		// @ts-expect-error 企速通 word预览
		const electron = window.require('electron');
		const { remote, ipcRenderer } = electron;
		// 判断是否设置了 OnlyOffice 支持的文件格式的预览
		if (props.onlyOfficeFileList && props.onlyOfficeFileList.length) {
			const onlyOfficeFileList = props.onlyOfficeFileList;
			const fileType = checkFileType(file.ext);
			const onlyOfficeFile = onlyOfficeFileList.some((item: any) => item === fileType);
			if (!onlyOfficeFile) {
				return new Error('不支持的文件格式');
			}
		}

		ipcRenderer.send('previewWord', {
			preurl: props.uploadShowPath as string,
			...file,
		});
	} catch (e) {
		// 浏览器环境下
		if (isPdf(file.ext)) {
			openLink(getFileUrl(file)?.path);
		} else {
			downloadFile(file);
		}
	}
};

defineExpose({
	deleteRowEvent,
	openLink,
	downloadFile,
	handleRestFile,
	handlePreviewImages,
	handlePreviewWord,
});
</script>

<style lang="scss" scoped>
@import '../styles/uno-css.scss';
@import '../styles/upload-list.scss';
</style>
