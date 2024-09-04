<script setup lang="ts">
import ModalTemplate from '@pac/components/modal/modal-template.vue';
import { T_Jlg_Modal_Instance } from '@pac/components/modal/type';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useDynamicModal } from '@pac';

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
	jlgModalRef.value.toggleBtnLoading(true);
	jlgModalRef.value.close().then(() => {
		console.log('关闭窗口后执行');
		jlgModalRef.value.toggleBtnLoading(false);
	});
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

// 打开子弹窗
const { openModal } = useDynamicModal();
const openChildModal = () => {
	const ChildModal = defineAsyncComponent(() => import('./ChildModal.vue'));
	openModal({
		component: ChildModal,
		modalOptions: {
			id: 'ChildModal',
			size: 'mini',
			status: 'error',
			iconStatus: 'error',
			className: 'error',
			title: 'ChildModal',
			// cancelButtonText: '取消',
			confirmButtonText: '完成',
			// 是否锁住页面，不允许窗口之外的任何操作
			lockView: false,
			// 是否锁住滚动条，不允许页面滚动
			lockScroll: false,
			mask: false,
			// 是否允许点击遮罩层关闭窗口
			maskClosable: false,
			// 是否允许按 Esc 键关闭窗口
			escClosable: true,
			// 是否允许窗口边缘拖动调整窗口大小
			resize: true,
			showShrink: true,
			showCustom: true,
			showHide: true,
			showHeader: true,
			showFooter: true,
			// 标题是否标显示最大化与还原按钮
			showZoom: true,
			// 是否显示关闭按钮
			showClose: true,
			// 是否允许通过双击头部放大或还原窗口
			dblclickZoom: true,
			// 是否启用窗口拖动
			draggable: true,
			width: 800,
			height: 400,
			minWidth: 200,
			minHeight: 200,
			// 自定义堆叠顺序（对于某些特殊场景，比如被遮挡时可能会用到）
			zIndex: 99,
			// 只对 resize 启用后有效，用于设置可拖动界限范围，如果为负数则允许拖动超出屏幕边界,默认0
			marginSize: 0,
			// 窗口打开时自动最大化显示
			fullscreen: false,
			transfer: true,
			// 设置标题内容过长时显示为省略号
			showTitleOverflow: true,
			// 在窗口隐藏之前执行，可以返回 Error 阻止关闭，支持异步
			beforeHideMethod: ({ type }) => {
				console.log(`在窗口隐藏之前执行，可以返回 Error 阻止关闭，支持异步,type:${type}`);
				// return Error('阻止关闭');
				// return Promise.resolve(Error('阻止关闭'));
			},
			onHide: () => {
				console.log('onHide 1');
			},
			onClose: () => {
				console.log('onClose 1');
			},
			onShow: () => {
				console.log('onShow 1');
			},
			onZoom: () => {
				console.log('onZoom 1');
			},
			onCancel: (data) => {
				console.log('onCancel 1', data);
			},
			onConfirm: (data) => {
				console.log('onConfirm 1', data);
			},
			slots: {},
		},
		props: {
			text: '这是传递的文本',
		},
	});
};
</script>

<template>
	<modal-template
		ref="jlgModalRef"
		:before-hide-method="beforeHideMethod"
		:loading="loading"
		confirm-button-text="完2成"
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
		<el-button @click="openChildModal">打开子弹窗</el-button>
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
