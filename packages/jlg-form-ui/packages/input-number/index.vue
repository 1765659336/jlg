<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-input-number
			ref="_ref"
			class="jlg-input-number"
			:model-value="props.modelValue"
			v-bind="mergeNumberPropsComputed"
			@update:model-value="(v) => emits('update:modelValue', v)"
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>
			<template v-for="(index, name) in slots" #[name]>
				<slot :name="name" />
			</template>
		</el-input-number>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import { FormItemContext, formItemContextKey, ElInputNumber } from 'element-plus';
import { E_JlgForm_FormType, T_Add_Gather_Fn } from '../form/type';
import { globalComponentConfig } from '../index';
import { I_Jlg_InputNumber_Emits, T_Jlg_InputNumber_Props } from './type';

defineOptions({
	name: 'JlgInputNumber',
});

const props = withDefaults(defineProps<T_Jlg_InputNumber_Props>(), {
	controls: true,
	validateEvent: true,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_InputNumber_Emits>();

const slots = useSlots();

const _ref = ref(null);

const tooltipShow = ref(false);

const valueText = computed(() => String(props.modelValue ?? ''));

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeNumberPropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeNumberPropsComputed = computed(() => {
	return {
		...globalComponentConfig.inputNumber,
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
					type: E_JlgForm_FormType.数字输入框,
					...(mergeNumberPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

const mouseenter = () => {
	if (!mergeNumberPropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = true;
};

const mouseleave = () => {
	if (!mergeNumberPropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = false;
};

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss">
.jlg-input-number {
	width: var(--jlg-input-number-width);
}
</style>
