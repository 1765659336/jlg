<template>
	<el-form-item ref="_ref" v-bind="mergeFormItemPropsComputed">
		<template #label>
			<slot name="label" :label="mergeFormItemPropsComputed.label">
				<el-tooltip :content="mergeFormItemPropsComputed.label" placement="top" :disabled="isShowTooltip">
					<span
						ref="labelTextRef"
						class="text-overflow-hidden"
						:class="[jlgFormContext?.labelPosition]"
						@mouseover="($event) => visibleTooltip($event)"
						>{{ mergeFormItemPropsComputed.label }}</span
					>
				</el-tooltip>
			</slot>
		</template>
		<template #error="{ error }">
			<slot name="error" :error="error"></slot>
		</template>
		<slot></slot>
	</el-form-item>
</template>

<script setup lang="ts">
import { formContextKey, ElFormItem, ElTooltip } from 'element-plus';
import { nextTick } from 'vue';
import { isNumber, isString } from 'lodash-unified';
import { T_Jlg_FormItem_Props } from './type';
import { globalComponentConfig } from '../index';
import { FormValidatorRules } from '../rule';
import { E_JlgForm_LabelPosition, T_Assign_Rules_Fn, T_JlgContextKey } from '../form/type';

defineOptions({
	name: 'JlgFormItem',
});

const props = withDefaults(defineProps<T_Jlg_FormItem_Props>(), {
	showMessage: true,
});

const attrs = useAttrs();

const _ref = ref(null);

const isShowTooltip = ref(false);

const isStringNumber = (val) => {
	if (!isString(val)) {
		return false;
	}
	return !Number.isNaN(Number(val));
};

const addUnit = (value?: string | number, defaultUnit = 'px') => {
	if (!value) return '';
	if (isNumber(value) || isStringNumber(value)) {
		return `${value}${defaultUnit}`;
	} else if (isString(value)) {
		return value;
	}
};

const formContext = inject(formContextKey);
const jlgFormContext: T_JlgContextKey = inject('JlgContextKey');

const labelTextRef = ref<HTMLSpanElement>();

const assignRulesFn: T_Assign_Rules_Fn = inject('assignRulesFn');

onMounted(() => {
	const labelWidth = addUnit(mergeFormItemPropsComputed.value.labelWidth || formContext?.labelWidth || '');
	if (jlgFormContext?.labelPosition === E_JlgForm_LabelPosition['内嵌'] && parseInt(labelWidth, 10) < labelTextRef.value.offsetWidth) {
		nextTick(() => {
			labelTextRef.value.style.width = labelWidth;
		});
	}
});

const visibleTooltip = (event) => {
	if (!mergeFormItemPropsComputed.value.label) {
		isShowTooltip.value = true;
		return;
	}
	const { offsetWidth, scrollWidth } = event.target as HTMLElement;
	isShowTooltip.value = offsetWidth >= scrollWidth;
};

const mergeFormItemPropsComputed = computed(() => {
	return {
		...globalComponentConfig.form,
		...props,
		...attrs,
	};
});

watch(
	() => [mergeFormItemPropsComputed.value.validateRules, mergeFormItemPropsComputed.value.prop],
	(newValue: [T_Jlg_FormItem_Props['validateRules'], T_Jlg_FormItem_Props['prop']]) => {
		if (!assignRulesFn) return;
		if (!newValue[0] || newValue[1] === undefined) {
			assignRulesFn();
		} else {
			const record = String(newValue[1]);
			assignRulesFn({
				record,
				recordValidate: new FormValidatorRules({
					[record]: newValue[0],
				}),
			});
		}
	},
	{
		immediate: true,
	}
);

defineExpose({
	_ref,
});
</script>

<style scoped lang="scss">
@import url('./index.scss');
</style>
