<template>
	<el-button @click="gather">收集数据</el-button>
	<el-button @click="validator">校验</el-button>
	<el-button @click="deleteUid">删除uid</el-button>
	<pre>{{ isLoad }}</pre>
	<pre>
  {{ formData.fileList }}
</pre
	>
	<jlg-form
		ref="JlgFormRef"
		:label-position="E_JlgForm_LabelPosition['居上']"
		:gather-props="{ col: 1, allCol: 3 }"
		label-width="120px"
		:model="formData"
	>
		<jlg-grid-layout v-bind="gridLayoutProps">
			<jlg-grid-cell :width="5" :height="1">
				<jlg-form-item label="Input测试文件上传2"> </jlg-form-item>
				<jlg-upload
					v-model:file-list="formData.fileList"
					action="http://218.77.107.37:48999/Upload/Sys5011G/File"
					upload-show-path="http://218.77.107.37:49000/"
					:on-uploading-status="onUploadingStatus"
					:show-download="true"
					:on-success="onSuccess"
					type="multiple-type-card"
					:multiple-type-config="multipleTypeConfig"
				/>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item
					label="Input测试placeholder"
					prop="input.value"
					:validate-rules="[[E_FormValidatorRulesValidateFunEnum.必填校验], [E_FormValidatorRulesValidateFunEnum.小数位校验, 0]]"
				>
					<jlg-input
						v-model="formData.input.value"
						:tooltip-props="{
							effect: 'light',
						}"
						disabled
					></jlg-input>
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item label="datePicker" prop="datePicker" :validate-rules="[[E_FormValidatorRulesValidateFunEnum.必填校验]]">
					<jlg-date-picker v-model="formData.datePicker" type="date" disabled />
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item label="number">
					<jlg-input-number v-model="formData.number" disabled @change="valueChange"> </jlg-input-number>
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item prop="select.value" label="Select测试placeholder">
					<jlg-select v-model="formData.select.value" filterable>
						<jlg-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
					</jlg-select>
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item label="time-select">
					<jlg-time-select v-model="formData.timeSelect" start="08:30" step="00:15" end="18:30" disabled />
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item label="rate">
					<jlg-rate v-model="formData.rate" />
				</jlg-form-item>
			</jlg-grid-cell>
			<jlg-grid-cell :width="1" :height="1">
				<jlg-form-item label="radio">
					<jlg-radio-group v-model="formData.radio">
						<jlg-radio value="1" label="Option1">Option 1</jlg-radio>
						<jlg-radio value="2" label="Option2">Option 2</jlg-radio>
					</jlg-radio-group>
				</jlg-form-item>
			</jlg-grid-cell>
		</jlg-grid-layout>
	</jlg-form>

	<div style="width: 400px">
		<el-form :model="formData" label-width="220" label-position="top">
			<el-form-item required>
				<template #label>
					<el-tooltip content="Activity name" placement="top">
						<span>Activity name</span>
					</el-tooltip>
				</template>
				<el-input v-model="formData.input.value" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { T_JlgForm_Props, E_JlgForm_LabelPosition } from '@pac/form/type';
import { JlgGridLayout, JlgGridCell } from 'jlg-ui';
import { E_FormValidatorRulesValidateFunEnum } from '@pac/rule';
import { I_uploadUserFile, T_uploadUserFiles } from '../../../../packages/upload/types';

defineOptions({
	name: 'FormBaseUseNotJson',
});

const JlgFormRef = ref();

const formData = ref({
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
	input: {
		value: '',
	},
	select: {
		value: '1',
	},
	number: 0,
	datePicker: '',
	timeSelect: '',
	rate: 0,
	radio: '',
});

// const rules = reactive({
// 	// input: {
// 	// 	value: [{ required: true, message: 'Please input input', trigger: 'blur' }],
// 	// },
// });

const gridLayoutProps = ref<T_JlgForm_Props['gridLayoutProps']>({
	padding: '0px',
	flow: 'row',
	columns: 5,
	gap: '10px',
	inline: true,
	border: false,
});

const options = computed(() => {
	return new Array(10).fill(0, 0, 10).map((i, index) => {
		return {
			value: index,
			label: 'Option' + index,
		};
	});
});

const valueChange = (v) => {
	console.log(v);
};

const gather = () => {
	console.log(JlgFormRef.value.getGatherData());
};

const validator = () => {
	JlgFormRef.value._ref.validate((valid, fields) => {
		if (valid) {
			alert('submit!');
		} else {
			console.log(fields);
			alert('error submit!');
		}
	});
};

const deleteUid = () => {
	formData.value.fileList.forEach((item, index) => {
		item.$uid = '';
	});
};
const isLoad = ref(false);
const onUploadingStatus = (v) => {
	isLoad.value = v;
};
const onSuccess = (response: any, uploadFile: I_uploadUserFile, uploadFiles: T_uploadUserFiles) => {
	alert('2');
};
// 用于多种类型多个文件上传时（type = 'multiple-type-card'），配置项
const multipleTypeConfig = reactive({
	// 是否显示左侧边栏（默认显示可不传，这里写了只是为了展示有这个配置项）
	showAside: true,
	// 是否显示上传区域（默认显示可不传，这里写了只是为了展示有这个配置项）
	showContent: true,
	// 后端返回的文件类型字段名（必传，默认 type）
	typeKey: 'type',
	// 下拉框选项
	types: [
		{
			value: 1,
			text: '身份证正面',
		},
		{
			value: 2,
			text: '身份证反面',
		},
		{
			value: 3,
			text: '营业执照',
		},
		{
			value: 4,
			text: '其他',
		},
	] as any,
	// 点击左侧边栏的回调（非必须，这里写了只是为了展示有这个配置项）
	onAsideClick: (type: number, types: any) => {
		console.log(type, types);
	},
});
</script>

<style scoped lang="scss"></style>
