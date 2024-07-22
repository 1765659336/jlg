<template>
	<jlg-tooltip v-bind="mergeTooltipPropsComputed">
		<el-select
			ref="_ref"
			:model-value="props.modelValue"
			v-bind="mergeSelectPropsComputed"
			:placeholder="placeholderComputed"
			@update:model-value="
				(v) => {
					emits('update:modelValue', v);
				}
			"
			@mouseenter="mouseenter"
			@mouseleave="mouseleave"
		>
			<template v-for="name in slotsComputed" #[name]>
				<slot :name="name" />
			</template>
			<slot>
				<jlg-option v-for="(option, index) in props.optionOptions" :key="index" v-bind="option" />
			</slot>
		</el-select>
	</jlg-tooltip>
</template>

<script setup lang="ts">
import JlgTooltip from '../tooltip/index.vue';
import JlgOption from '../option/index.vue';
import { globalComponentConfig } from '../index';
import { I_Jlg_Select_Emits, T_Jlg_Select_Props } from './type';
import { ElSelect, FormItemContext, formItemContextKey, useLocale } from 'element-plus';
import { E_JlgForm_FormType, T_Add_Gather_Fn } from '../form/type';

defineOptions({
	name: 'JlgSelect',
});

const props: T_Jlg_Select_Props = withDefaults(defineProps<T_Jlg_Select_Props>(), {
	reserveKeyword: true,
	validateEvent: true,
	persistent: true,
	teleported: true,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_Select_Emits>();

const slots = useSlots();

const _ref = ref(null);

const slotsComputed = computed(() => {
	return Object.keys(slots).filter((name) => name !== 'default');
});

// formItem传递的context
const context: FormItemContext | undefined = inject(formItemContextKey);

const { t } = useLocale();

const tooltipShow = ref(false);

const valueText = ref('');

const mergeTooltipPropsComputed = computed(() => {
	return {
		...{
			disabled: !mergeSelectPropsComputed.value.disabled,
			visible: tooltipShow.value,
			content: valueText.value,
		},
		...globalComponentConfig.tooltip,
		...(props.tooltipProps ?? {}),
	};
});

const mergeSelectPropsComputed = computed(() => {
	return {
		...globalComponentConfig.select,
		...props,
		...attrs,
	};
});

// select placeholder 默认值
const elSelectLabel = computed(() => t('el.select.placeholder'));

// 自定义处理placeholder
const placeholderComputed = computed(() => {
	if (props.disabled) return '';

	if (mergeSelectPropsComputed.value.placeholder !== elSelectLabel.value) {
		return mergeSelectPropsComputed.value.placeholder;
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
					type: E_JlgForm_FormType.选择框,
					...(mergeSelectPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

const mouseenter = () => {
	if (!mergeSelectPropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = true;
};

const mouseleave = () => {
	if (!mergeSelectPropsComputed.value.disabled) {
		return;
	}
	tooltipShow.value = false;
};

watch(
	() => _ref.value?.states.selected,
	(newValue) => {
		if (!newValue) return;
		valueText.value = mergeSelectPropsComputed.value.multiple ? newValue.map((i) => i.currentLabel).join(';') : newValue.currentLabel;
	},
	{
		deep: true,
		immediate: true,
	}
);

defineExpose({
	_ref,
});
</script>

<style scoped></style>
