<script setup lang="ts">
import ModalTemplate from '@pac/components/modal/modal-template.vue';
import { T_Jlg_Modal_Instance } from '@pac/components/modal/type';
import { onMounted, ref } from 'vue';

defineOptions({
	name: 'ChildModal',
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
	jlgModalRef.value.toggleBtnLoading(true);
	// setTimeout(() => {
	// 	jlgModalRef.value.toggleBtnLoading(false);
	// 	console.log('onConfirm 点击确认按钮后触发');
	// }, 1000);
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

const modalSizeData = ref({
	width: 0,
	height: 0,
});
const onResize = () => {
	getModalSize();
	// setReactData();
};

function getModalSize() {
	const ModalEl = jlgModalRef.value?.getBox() as HTMLDivElement;
	modalSizeData.value.width = ModalEl.offsetWidth;
	modalSizeData.value.height = ModalEl.offsetHeight;

	console.log('ModalEl', ModalEl, ModalEl.offsetWidth, ModalEl.offsetHeight);
	console.log(jlgModalRef.value.ref.reactData);
}
function handleSizeChange() {
	const ModalEl = jlgModalRef.value?.getBox() as HTMLDivElement;
	ModalEl.style.width = modalSizeData.value.width + 'px';
	ModalEl.style.height = modalSizeData.value.height + 'px';
	// setReactData();
}

// function setReactData() {
// 	const ModalEl = jlgModalRef.value?.getBox() as HTMLDivElement;
// 	jlgModalRef.value.ref.reactData.zoomLocat = {
// 		top: parseInt(ModalEl.style.top, 10),
// 		left: parseInt(ModalEl.style.left),
// 		width: parseInt(ModalEl.style.width),
// 		height: parseInt(ModalEl.style.height),
// 	};
// }
const loading = ref(true);
setTimeout(() => {
	loading.value = false;
}, 550);
</script>

<template>
	<modal-template
		ref="jlgModalRef"
		:before-hide-method="beforeHideMethod"
		:loading="loading"
		@close="onClose"
		@hide="onHide"
		@show="onShow"
		@zoom="onZoom"
		@confirm="onConfirm"
		@custom="onCustom"
		@resize="onResize"
	>
		<div>{{ props.text }}</div>
		<el-button @click="handleMinModal">最小化弹窗</el-button>
		<el-button @click="handleExitCustom">退出编辑模式</el-button>
		<el-button @click="getModalSize">获取窗口大小</el-button>

		<div class="setting-modal-size-wrapper">
			宽：
			<el-input-number v-model="modalSizeData.width" size="small" :step="50" controls-position="right" @change="handleSizeChange" />
			<span class="line">-</span>
			高：
			<el-input-number v-model="modalSizeData.height" size="small" :step="50" controls-position="right" @change="handleSizeChange" />
		</div>
	</modal-template>
</template>

<style lang="scss" scoped>
.custom-setting {
	.vxe-modal--box {
		border: 1px dashed red;
	}
}

.setting-modal-size-wrapper {
	cursor: pointer;
	box-sizing: border-box;
	padding: 8px 10px;
	display: flex;
	align-items: center;
	margin-top: 20px;
	height: 40px;
	background: #ffffff;
	box-shadow: 0px 1px 4px 0px rgba(35, 84, 244, 0.21);
	border-radius: 4px;

	font-size: 12px;
	color: #515c79;
	:deep(.el-input) {
		width: 87px;
	}
	.line {
		margin: 0 6px;
	}
}
</style>
