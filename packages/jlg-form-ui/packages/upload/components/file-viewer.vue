<template>
	<el-image-viewer
		fit="cover"
		v-bind="$attrs"
		:url-list="props.urlList || []"
		:initial-index="props.initialIndex || 0"
		:infinite="props.infinite || false"
		:hide-on-click-modal="props.hideOnClickModal || false"
		:teleported="true"
		@close="closeViewer"
	/>
</template>
<script setup lang="ts">
import { ElImageViewer } from 'element-plus';
import { PropType } from 'vue';

const emit = defineEmits(['destroy']);
const props = defineProps({
	urlList: {
		type: Array as PropType<string[]>,
		default: () => {
			return [];
		},
	},
	/**
	 * @description 初始预览图像索引，小于 url-list 的长度
	 */
	initialIndex: {
		type: Number,
		default: 0,
	},
	/**
	 * @description 是否可以无限循环预览
	 */
	infinite: {
		type: Boolean,
		default: true,
	},
	/**
	 * @description 是否可以通过点击遮罩层关闭预览
	 */
	hideOnClickModal: {
		type: Boolean,
		default: false,
	},
});

const prevOverflow = document.body.style.overflow;
document.body.style.overflow = 'hidden';

function closeViewer() {
	document.body.style.overflow = prevOverflow;
	emit('destroy');
}
defineExpose({
	closeViewer,
});
</script>

<style scoped lang="scss"></style>
