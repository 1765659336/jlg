<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-date-picker
			ref="_ref"
			:model-value="props.modelValue"
			v-bind="mergeDatePickerPropsComputed"
			:placeholder="placeholderComputed"
			@update:model-value="updateModelValue"
		>
			<template v-for="(_index, name) in slots" #[name]>
				<slot :name="name" />
			</template>
		</el-date-picker>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import JlgTooltip from '../tooltip/index.vue';
import { globalComponentConfig } from '../index';
import { T_Jlg_DatePicker_Props, I_Jlg_DatePicker_Emits } from './type';
import { FormItemContext, formItemContextKey } from 'element-plus';
import { T_Add_Gather_Fn } from '../form/type';
import { ElDatePicker } from 'element-plus';

defineOptions({
	name: 'JlgDatePicker',
});

const props = withDefaults(defineProps<T_Jlg_DatePicker_Props>(), {
	editable: true,
	clearable: true,
	validateEvent: true,
	teleported: true,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_DatePicker_Emits>();

const slots = useSlots();

const _ref = ref(null);

const context: FormItemContext | undefined = inject(formItemContextKey);

const tooltipShow = ref(false);

const valueText = computed(() => String(props.modelValue ?? ''));

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeDatePickerPropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeDatePickerPropsComputed = computed(() => {
	return {
		...globalComponentConfig.datePicker,
		...props,
		...attrs,
	};
});

const placeholderComputed = computed(() => {
	if (props.disabled) return '';

	if (mergeDatePickerPropsComputed.value.placeholder) {
		return mergeDatePickerPropsComputed.value.placeholder;
	} else if (context) {
		return `请选择${context.label}`;
	} else {
		return '请选择日期';
	}
});

const updateModelValue = (v: T_Jlg_DatePicker_Props['modelValue']) => emits('update:modelValue', v);

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
					type: mergeDatePickerPropsComputed.value.type,
					...(mergeDatePickerPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss"></style>
