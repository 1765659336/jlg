<template>
	<div class="jlg-filter-wrap filter-date">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content">
			<el-date-picker v-bind="props.item.props" v-model="modelValue" :format="format" :value-format="valueFormat" clearable range-separator="~" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElDatePicker } from 'element-plus';
import { I_Table_Filter_Item } from '../type';
import { computed } from 'vue';
import GlobalConfig from '../../../../lib/useGlobalConfig';

defineOptions({
	name: 'FilterDate',
});
type ModelValueType = [number | string | Date, number | string | Date] | number | string | Date | string[];
const modelValue = defineModel<ModelValueType>({ required: true, default: [] });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean }>(), {
	showLabel: false,
});
defineModel<number>('searchType', { required: true, default: 0 });

const format = computed(() => props.item.props?.format ?? GlobalConfig.datePickerFormat);
const valueFormat = computed(() => props.item.props?.valueFormat ?? GlobalConfig.datePickerValueFormat);
</script>
