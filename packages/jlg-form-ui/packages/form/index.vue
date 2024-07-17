<template>
	<el-form
		ref="_ref"
		v-bind="furnishMergeFormPropsComputed"
		:label-position="
			furnishMergeFormPropsComputed.labelPosition === E_JlgForm_LabelPosition['内嵌']
				? E_JlgForm_LabelPosition['居上']
				: furnishMergeFormPropsComputed.labelPosition
		"
		:class="{
			'jlg-form': true,
			'jlg_form_label_position_top-embedded': furnishMergeFormPropsComputed.labelPosition === E_JlgForm_LabelPosition['内嵌'],
		}"
	>
		<slot>
			<jlg-grid-layout v-bind="props.gridLayoutProps">
				<jlg-grid-cell v-for="formItem in props.formJson" :key="formItem.field" v-bind="formItem.gridCellProps">
					<jlg-form-item v-bind="formItem.formItemProps">
						<slot :name="'el-' + formItem.field" :field="formItem.field" :el-components-props="formItem.elComponentsProps">
							<component :is="renderFormItemComponent(formItem)" v-model="props.modelValue[formItem.field]" v-bind="formItem.elComponentsProps">
							</component>
						</slot>
					</jlg-form-item>
				</jlg-grid-cell>
			</jlg-grid-layout>
		</slot>
	</el-form>
</template>

<script setup lang="ts">
import { T_JlgForm_Props, E_JlgForm_FormType, T_JlgForm_FormJsonItem, E_JlgForm_LabelPosition, T_JlgContextKey } from './type';
import { JlgGridLayout, JlgGridCell } from 'jlg-ui';
import { globalComponentConfig } from '../index';
import Input from '../input/index.vue';
import InputNumber from '../input-number/index.vue';
import RadioGroup from '../radio-group/index.vue';
import Rate from '../rate/index.vue';
import Select from '../select/index.vue';
import DatePicker from '../date-picker/index.vue';
import TimeSelect from '../time-select/index.vue';
import JlgFormItem from '../form-item/index.vue';
import { type Component } from 'vue';
import useGather from './hooks/gather';
import useRule from './hooks/rule';
import { ElForm } from 'element-plus';

defineOptions({
	name: 'JlgForm',
});

const props = withDefaults(defineProps<T_JlgForm_Props>(), {
	showMessage: true,
	validateOnRuleChange: true,
	labelPosition: E_JlgForm_LabelPosition['左对齐'],
});

const attrs = useAttrs();

const _ref = ref(null);

const mergeFormPropsComputed = computed(() => {
	return {
		...globalComponentConfig.form,
		...props,
		...attrs,
	};
});

const { assignRules } = useRule(mergeFormPropsComputed);

const furnishMergeFormPropsComputed = computed(() => {
	return {
		...mergeFormPropsComputed.value,
		rules: assignRules.value,
	};
});

provide<T_JlgContextKey>('JlgContextKey', {
	labelPosition: props.labelPosition,
});

const renderFormItemComponent = (formItem: T_JlgForm_FormJsonItem): Component => {
	switch (formItem.type) {
		case E_JlgForm_FormType.输入框:
			// return h(defineAsyncComponent(() => import('./components/input/index.vue')));
			return Input;
		case E_JlgForm_FormType.数字输入框:
			return InputNumber;
		case E_JlgForm_FormType.单选框:
			return RadioGroup;
		case E_JlgForm_FormType.评分:
			return Rate;
		case E_JlgForm_FormType.日期:
			return DatePicker;
		case E_JlgForm_FormType.时间:
			return TimeSelect;
		case E_JlgForm_FormType.选择框:
			return Select;
	}
};

const { getGatherData } = useGather(mergeFormPropsComputed);

defineExpose({
	getGatherData,
	_ref,
});
</script>

<style lang="scss" scoped>
// lable内嵌样式
.jlg_form_label_position_top-embedded {
	:deep(.el-form-item) {
		padding-top: 20px;
		position: relative;
		.el-form-item__label {
			transform: translate(10px, -10px);
			position: absolute;
			z-index: 999;
			background-color: #fff;
			padding: 0px 2px;
			border-radius: 5px;
			line-height: 1;
			margin-bottom: 0;
		}
	}
}
</style>
