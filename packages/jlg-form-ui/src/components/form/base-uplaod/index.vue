<template>
	<div class="demo-collapse">
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="基础用法" name="1">
				<div>
					通过 slot 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 limit 和 on-exceed 来限制上传文件的个数和定义超出限制时的行为。 可通过设置
					before-remove 来阻止文件移除操作。
				</div>
				<pre>{{ formData.fileList }}</pre>
				<jlg-upload
					v-model:file-list="formData.fileList"
					action="http://218.77.107.37:48999/Upload/Sys5011G/File"
					upload-show-path="http://218.77.107.37:49000/"
					:on-uploading-status="formData.onUploadingStatus"
					:show-download="true"
					:before-upload="formData.beforeUpload"
					:on-change="formData.onChange"
					:on-success="formData.onSuccess"
					:on-preview="formData.onPreview"
					:before-remove="formData.beforeRemove"
					:on-remove="formData.onRemove"
					:on-exceed="formData.onExceed"
					:disabled="false"
					:limit="1"
				/>
			</el-collapse-item>
			<el-collapse-item title="覆盖前一个文件" name="2">
				<div>设置 limit 和 on-exceed 可以在选中时自动替换上一个文件。</div>
				<pre>{{ formData2.fileList }}</pre>
				<jlg-upload
					ref="upload"
					v-model:file-list="formData2.fileList"
					action="http://218.77.107.37:48999/Upload/Sys5011G/File"
					upload-show-path="http://218.77.107.37:49000/"
					:on-uploading-status="formData.onUploadingStatus"
					:show-download="false"
					:limit="1"
					:on-exceed="formData2.handleExceed"
					:auto-upload="true"
				>
					<template #trigger>
						<el-button type="primary">select file</el-button>
					</template>
				</jlg-upload>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script lang="ts" setup>
import { JlgUpload } from '../../../../packages';
import { reactive, ref } from 'vue';
import { genFileId } from 'element-plus';
import { JlgUploadInstance } from '@pac/upload';
defineOptions({
	name: 'FormBaseUpload',
});
const activeNames = ref(['1']);
const handleChange = (val: string[]) => {
	console.log(val);
};

const formData = reactive({
	fileList: [
		{
			name: 'Snipaste_2024-07-04_09-32-13',
			path: 'access/4f8c3a86e62b49508e7aebd9512611d6.png',
			icon: 'access/4f8c3a86e62b49508e7aebd9512611d6.png',
			ext: '.png',
			size: 85905,
			type: 1,
		},
	],
	onUploadingStatus: (isLoading: boolean) => {
		console.log('[onUploadingStatus]', isLoading);
	},
	onSuccess: (res: any) => {
		console.log('[onSuccess]', res);
	},
	onPreview: (res: any) => {
		console.log('[onPreview]', res);
	},
	onExceed: (files, uploadFiles) => {
		console.log('[onExceed]', files, uploadFiles);
	},
	beforeRemove: (uploadFile, uploadFiles) => {
		console.log('[beforeRemove]', uploadFile, uploadFiles);
		return true;
	},
	onRemove: (uploadFile, uploadFiles) => {
		console.log('[onRemove]', uploadFile, uploadFiles);
	},
	onChange: (uploadFile, uploadFiles) => {
		console.log('[onChange]', uploadFile, uploadFiles);
	},
	beforeUpload: (rawFile) => {
		console.log('[beforeUpload]', rawFile);
		return true;
	},
});

const upload = ref<JlgUploadInstance>();
const formData2 = reactive({
	fileList: [],
	handleExceed: (files) => {
		debugger;
		const file = files[0];
		upload.value!.clearFiles();
		file.$uid = genFileId();
		upload.value!.handleStart(file);
	},
});
const submitUpload = () => {
	upload.value!.submit();
};
</script>
<style scoped lang="scss"></style>
