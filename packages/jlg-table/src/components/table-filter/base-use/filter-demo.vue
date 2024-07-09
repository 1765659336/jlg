<script setup lang="ts">
import TableFilter from '@pac/components/table-filter/newIndex.vue';
import { reactive } from 'vue';
import { I_Table_Grid_Props } from '@pac';

interface RowVO {
	id: number;
	name: string;
	nickname: string;
	role: string;
	sex: string;
	age: number;
	address: string;
	// 生日
	birthday: string;
	// 身高
	height: number;
	// 体重
	weight: number;
	// 体脂率
	bodyFatRate: number;
	// 体型
	bodyShape: string;
	// 体质指数
	bmi: number;
	// 肺活量
	lungCapacity: number;
	// 血压
	bloodPressure: string;
	// 心率
	heartRate: number;
	// 血氧
	bloodOxygen: number;
	// 体温
	bodyTemperature: number;
	// 睡眠时长
	sleepDuration: number;
}
const gridOptions = reactive<I_Table_Grid_Props<RowVO>>({
	// 筛选条件配置
	tableFilterConfig: {
		titleAlign: 'right',
		folding: true,
		items: [
			{
				field: 'text',
				title: '文本',
				type: 'text',
				searchType: 1,
				defaultValue: '555',
				quickSearch: true,
				isPure: false,
				visible: true,
			},
			{
				field: 'number',
				title: '数字',
				type: 'number',
				searchType: 0,
				defaultValue: 999,
				quickSearch: true,
				isPure: false,
			},
			{
				field: 'time',
				title: '时间',
				type: 'time',
				defaultValue: '2024-04-25T05:39:51.000Z',
				searchType: 0,
				quickSearch: true,
				isPure: true,
			},
			{
				field: 'timeSlot',
				title: '时间段',
				type: 'time',
				searchType: 0,
				quickSearch: false,
				isPure: true,
				props: {
					isRange: true,
				},
			},
			{
				field: 'datetimeRange',
				title: '日期和时间范围',
				type: 'date',
				searchType: 0,
				quickSearch: false,
				isPure: true,
				props: {
					type: 'daterange',
					'unlink-panels': false,
				},
			},
			{
				field: 'date',
				title: '日期',
				type: 'date',
				searchType: 0,
				quickSearch: false,
				isPure: true,
			},
			{
				field: 'independentDate',
				title: '独立日期',
				type: 'independentDate',
				defaultValue: ['2023-09-01', '2023-09-30'],
				searchType: 0,
				quickSearch: false,
				isPure: true,
			},
		],
	},
});
</script>

<template>
	<table-filter ref="tableFilterRef" v-bind="gridOptions.tableFilterConfig" v-model:items="gridOptions.tableFilterConfig.items"> </table-filter>
</template>

<style scoped lang="scss"></style>
