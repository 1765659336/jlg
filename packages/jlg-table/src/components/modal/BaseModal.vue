<script setup lang="ts">
import ModalTemplate from '@pac/components/modal/modal-template.vue';
import { T_Jlg_Modal_Instance } from '@pac/components/modal/type';
import { onMounted, ref } from 'vue';

defineOptions({
	name: 'BaseModal',
});

const props = defineProps<{
	text: string;
}>();

const jlgModalRef = ref<T_Jlg_Modal_Instance>(null);

onMounted(() => {
	console.log(jlgModalRef.value);
});

const beforeHideMethod = ({ type }) => {
	console.log('beforeHideMethod 在窗口隐藏之前执行:', type);
	return Promise.resolve(true);
};

const isCustom = ref(false);

const onHide = () => {
	console.log('onHide 隐藏窗口后触发');
};
const onClose = () => {
	console.log('onClose 关闭窗口后触发');
};
const onShow = () => {
	console.log('onShow 窗口显示后触发');
};
const onZoom = (params) => {
	console.log('onZoom 窗口最大化还原后触发, params:', params);
};
const onConfirm = () => {
	console.log('onConfirm 点击确认按钮后触发');
};

const onCustom = () => {
	console.log('onCustom 点击确认按钮后触发');
	isCustom.value = true;
	jlgModalRef.value?.toggleCustom(isCustom.value);
};
const handleExitCustom = () => {
	isCustom.value = false;
	jlgModalRef.value?.toggleCustom(isCustom.value);
};

const handleMinModal = () => {
	console.log(jlgModalRef.value?.hide());
};
</script>

<template>
	<modal-template
		ref="jlgModalRef"
		:before-hide-method="beforeHideMethod"
		@close="onClose"
		@hide="onHide"
		@show="onShow"
		@zoom="onZoom"
		@confirm="onConfirm"
		@custom="onCustom"
	>
		<div>{{ props.text }}</div>
		<el-button @click="handleMinModal">最小化弹窗</el-button>
		<el-button @click="handleExitCustom">退出编辑模式</el-button>
	</modal-template>
</template>

<style lang="scss">
.custom-setting {
	.vxe-modal--box {
		border: 1px dashed red;
	}
}
</style>
