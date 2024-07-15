<template>
	<el-radio
		ref="_ref"
		:model-value="props.modelValue"
		v-bind="mergeRadioPropsComputed"
		@update:model-value="
			(v) => {
				emits('update:modelValue', v);
			}
		"
	>
		<slot>
			{{ props.title }}
		</slot>
	</el-radio>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { I_Jlg_Radio_Emits, T_Jlg_Radio_Props } from './type';
import { globalComponentConfig } from '../index';
import { RadioInstance, ElRadio } from 'element-plus';

defineOptions({
	name: 'JlgRadio',
});

const props = withDefaults(defineProps<T_Jlg_Radio_Props>(), {});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_Radio_Emits>();

const _ref = ref(null);

const mergeRadioPropsComputed = computed(() => {
	return {
		...globalComponentConfig.radio,
		...props,
		...attrs,
	};
});

onMounted(() => {
	radioRefSet.value.add(_ref.value);
});

const radioRefSet: Ref<Set<RadioInstance>> = inject('radioRefSet');

defineExpose({ _ref });
</script>

<style scoped lang="scss"></style>
