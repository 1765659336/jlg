<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-input
			ref="_ref"
			:model-value="props.modelValue"
			v-bind="mergeInputPropsComputed"
			:placeholder="placeholderComputed"
			@update:model-value="updateModelValue"
			@blur="blurInput"
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>
			<template v-for="(index, name) in slots" #[name]>
				<slot :name="name" />
			</template>
		</el-input>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import { I_Jlg_Input_Emits, T_Jlg_Input_Props } from './type';
import { globalComponentConfig } from '../index';
import JlgTooltip from '../tooltip/index.vue';
import { FormItemContext, formItemContextKey, ElInput } from 'element-plus';
import { T_Add_Gather_Fn } from '../form/type';

defineOptions({
	name: 'JlgInput',
});

const slots = useSlots();

const props = withDefaults(defineProps<T_Jlg_Input_Props>(), {
	type: 'text',
	validateEvent: true,
	disabled: false,
	modelValue: '',
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_Input_Emits>();

const _ref = ref(null);

// formItem传递的context
const context: FormItemContext | undefined = inject(formItemContextKey);

const tooltipShow = ref(false);

const valueText = computed(() => String(props.modelValue ?? ''));

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeInputPropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeInputPropsComputed = computed(() => {
	return {
		...globalComponentConfig.input,
		...props,
		...attrs,
	};
});

// 自定义处理placeholder
const placeholderComputed = computed(() => {
	if (props.disabled) return '';

	if (mergeInputPropsComputed.value.placeholder) {
		return mergeInputPropsComputed.value.placeholder;
	} else if (context && context.label) {
		const maxLengthText = mergeInputPropsComputed.value.maxlength ? `，最大可输入${mergeInputPropsComputed.value.maxlength}个字` : '';
		return `请输入${context.label}${maxLengthText}`;
	} else {
		return '请输入';
	}
});

const updateModelValue = (v) => {
	emits('update:modelValue', v);
};

const blurInput = (event) => {
	// 去除两端空格
	emits('update:modelValue', String(props.modelValue ?? '').trim());
	emits('blur', event);
};

const mouseenter = () => {
	if (!mergeInputPropsComputed.value.disabled) {
		return;
	}

	if (props.modelValue === '') {
		return;
	}
	tooltipShow.value = true;
};

const mouseleave = () => {
	if (!mergeInputPropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = false;
};

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
					type: mergeInputPropsComputed.value.type,
					...(mergeInputPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss"></style>
