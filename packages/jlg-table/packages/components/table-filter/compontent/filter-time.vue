<template>
	<div class="jlg-filter-wrap filter-time">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content">
			<el-time-picker v-bind="props.item.props" v-model="modelValue" clearable range-separator="~" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElTimePicker } from 'element-plus';
import { I_Table_Filter_Item } from '../type';

defineOptions({
	name: 'FilterTime',
});
type ModelValueType = [number | string | Date, number | string | Date] | number | string | Date | string[];
const modelValue = defineModel<ModelValueType>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean }>(), {
	showLabel: false,
});
defineModel<number>('searchType', { required: true, default: 0 });
</script>
