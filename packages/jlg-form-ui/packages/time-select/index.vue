<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-time-select
			ref="_ref"
			:model-value="props.modelValue"
			v-bind="mergeTimeSelectPropsComputed"
			:placeholder="placeholderComputed"
			@update:model-value="(v) => emits('update:modelValue', v)"
		/>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import JlgTooltip from '../tooltip/index.vue';
import { globalComponentConfig } from '../index';
import { T_Jlg_TimeSelect_Props, I_Jlg_TimeSelect_Emits } from './type';
import { useAttrs } from 'vue';
import { FormItemContext, formItemContextKey, ElTimeSelect } from 'element-plus';
import { E_JlgForm_FormType, T_Add_Gather_Fn } from '../form/type';

defineOptions({
	name: 'JlgTimeSelect',
});

const props = withDefaults(defineProps<T_Jlg_TimeSelect_Props>(), {
	editable: true,
	clearable: true,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_TimeSelect_Emits>();

const _ref = ref(null);

const context: FormItemContext | undefined = inject(formItemContextKey);

const tooltipShow = ref(false);

const valueText = computed(() => String(props.modelValue ?? ''));

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeTimeSelectPropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeTimeSelectPropsComputed = computed(() => {
	return {
		...globalComponentConfig.timeSelect,
		...props,
		...attrs,
	};
});

const placeholderComputed = computed(() => {
	if (mergeTimeSelectPropsComputed.value.placeholder) {
		return mergeTimeSelectPropsComputed.value.placeholder;
	} else if (context) {
		return `请选择${context.label}`;
	} else {
		return '请选择';
	}
});

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
					type: E_JlgForm_FormType.时间,
					...(mergeTimeSelectPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss"></style>
