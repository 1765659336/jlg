<template>
	<div
		:class="['el-upload-dragger', dragover ? 'is-dragover' : '']"
		@drop.prevent="onDrop"
		@dragover.prevent="onDragover"
		@dragleave.prevent="dragover = false"
	>
		<slot />
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger';
import { useFormDisabled } from 'element-plus';

defineOptions({
	name: 'JlgUploadDrag',
});

defineProps(uploadDraggerProps);
const emit = defineEmits(uploadDraggerEmits);

const dragover = ref(false);
const disabled = useFormDisabled();

const onDrop = (e: DragEvent) => {
	if (disabled.value) return;
	dragover.value = false;

	e.stopPropagation();

	const files = Array.from(e.dataTransfer!.files);
	emit('file', files);
};

const onDragover = () => {
	if (!disabled.value) dragover.value = true;
};
</script>
