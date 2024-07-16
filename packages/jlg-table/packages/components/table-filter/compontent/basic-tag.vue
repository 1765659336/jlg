<template>
	<div v-show="isShow" class="jlg-basic_tag">
		<span class="basic-tag_label">{{ props.item.title }}：</span>
		<span class="basic-tag_text">{{ computedTagText }}</span>
		<el-icon class="basic-tag_close" :size="14">
			<CloseBold @click="handleClose" />
		</el-icon>
	</div>
</template>
<script setup lang="ts">
import type { I_Table_Filter_Item, SelectOptionProps, TreeOptionProps } from '../type';
import dayjs from 'dayjs';
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, DEFAULT_FORMATS_TIME, RANGE_SEPARATOR } from '../../../constants';
import findTree from 'xe-utils/findTree';
import { CloseBold } from '@element-plus/icons-vue';

defineOptions({
	name: 'BasicTag',
});
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; form: Record<string, any> }>(), {});
const emit = defineEmits(['close']);
const isShow = computed(() => {
	const { item } = props;
	const rawValue = props.form[item.field];
	if (rawValue === undefined || rawValue === null || rawValue === '') return false;
	return !(Array.isArray(rawValue) && rawValue.length === 0);
});
const computedTagText = computed(() => {
	// 对应的字段原始
	const { item } = props;
	const rawValue = props.form[item.field];
	if (rawValue === undefined || rawValue === null || rawValue === '') return '';
	if (Array.isArray(rawValue) && rawValue.length === 0) return '';
	switch (item.type) {
		case 'text':
		case 'number':
			return rawValue;
		case 'select':
		case 'treeSelect':
			return getSelectionString();
		case 'time':
		case 'date':
		case 'independentDate':
			return getDateFormatString();
		default:
			return rawValue;
	}
});

// 提取 select&treeSelect 选择器的输入框显示的文本值
const getSelectionString = () => {
	const { item } = props;
	const rawValue = props.form[item.field];
	// 兼容treeSelect 选择器
	const options = item.type === 'treeSelect' ? item.props?.data : item.props?.options;
	// https://element-plus.org/zh-CN/component/select-v2.html#props & https://element-plus.org/zh-CN/component/tree.html#props
	const _props: TreeOptionProps & SelectOptionProps = item.props.props;
	const labelKey = _props?.label ?? 'label';
	const valueKey = _props?.value ?? 'value';
	const childrenKey = (item.type === 'treeSelect' ? _props?.children : _props?.options) ?? 'children';
	if (Array.isArray(options)) {
		if (Array.isArray(rawValue)) {
			return rawValue
				.map((value) => {
					const _option = findTree(options, (option) => option[valueKey] === value, { children: childrenKey })?.item;
					if (!_option) return value;
					return _option[labelKey] ?? value;
				})
				.join(',');
		} else {
			const _option = findTree(options, (option) => option[valueKey] === rawValue, { children: childrenKey })?.item;
			if (!_option) return rawValue;
			return _option[labelKey] ?? rawValue;
		}
	}
	return rawValue;
};

// 提取 date-picker  与 time-picker 选择器的输入框显示的文本值
const getDateFormatString = () => {
	const { item } = props;
	const rawValue: string | string[] = props.form[item.field];
	const rangeSeparator = item.props?.rangeSeparator ?? RANGE_SEPARATOR;
	let format = item.props?.format ?? (DEFAULT_FORMATS_DATEPICKER[item.props?.type] || DEFAULT_FORMATS_DATE);
	if (item.type === 'time') {
		format = item.props?.format ?? DEFAULT_FORMATS_TIME;
	}
	return Array.isArray(rawValue)
		? rawValue.map((item) => (item ? dayjs(item).format(format) : '')).join(rangeSeparator)
		: rawValue
			? dayjs(rawValue).format(format)
			: '';
};

const handleClose = () => {
	emit('close', props.item.field);
};
</script>
