<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-rate
			ref="_ref"
			:model-value="props.modelValue"
			v-bind="mergeRatePropsComputed"
			@update:model-value="(v) => emits('update:modelValue', v)"
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>
		</el-rate>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import { FormItemContext, formItemContextKey, ElRate } from 'element-plus';
import { E_JlgForm_FormType, T_Add_Gather_Fn } from '../form/type';
import { globalComponentConfig } from '../index';
import { I_Jlg_Rate_Emits, T_Jlg_Rate_Props } from './type';
import { useAttrs } from 'vue';

defineOptions({
	name: 'JlgRate',
});

const props = withDefaults(defineProps<T_Jlg_Rate_Props>(), {
	max: 5,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_Rate_Emits>();

const _ref = ref(null);

const tooltipShow = ref(false);

const valueText = computed(() => `${String(props.modelValue ?? 0)}/${mergeRatePropsComputed.value.max}`);

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeRatePropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeRatePropsComputed = computed(() => {
	return {
		...globalComponentConfig.rate,
		...props,
		...attrs,
	};
});

const context: FormItemContext | undefined = inject(formItemContextKey);

const formAddGatherFn: T_Add_Gather_Fn | undefined = inject('formAddGatherFn');

onMounted(() => {
	formAddGatherFn &&
		formAddGatherFn({
			formItemLabel: context.label,
			fn() {
				return {
					label: context.label ?? '',
					key: context.prop ?? '',
					value: valueText.value,
					type: E_JlgForm_FormType.评分,
					...(mergeRatePropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

const mouseenter = () => {
	if (!mergeRatePropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = true;
};

const mouseleave = () => {
	if (!mergeRatePropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = false;
};

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss"></style>
