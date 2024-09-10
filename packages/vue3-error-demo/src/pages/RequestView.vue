<template>
	<div>
		<el-card>
			<h3>接口平均请求时长: {{ averageDurationTime.toFixed(2) }} ms</h3>
		</el-card>
		<el-table :data="requestTableData.sort((a, b) => b.timestamp - a.timestamp)" style="width: 100%">
			<el-table-column prop="timestamp" label="Timestamp" width="180">
				<template #default="{ row }">
					{{ formatTimestamp(row.timestamp) }}
				</template>
			</el-table-column>
			<el-table-column prop="type" label="type">
				<template #default="{ row }">
					{{ E_TrackerDetailType[row.type] }}
				</template>
			</el-table-column>
			<el-table-column prop="content" label="Content">
				<template #default="{ row }">
					{{ row.content }}
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
  
  <script setup lang="ts">
import { requestTableData } from './data';
import { E_TrackerDetailType } from '../main';
import { computed } from 'vue';
// 格式化时间戳
const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const averageDurationTime = computed(() => {
	const durations = requestTableData.value.map((item) => {
		const content = JSON.parse(item.content);
		return content.durationTime || 0;
	});
	const total = durations.reduce((sum, duration) => sum + duration, 0);
	return durations.length ? total / durations.length : 0;
});
</script>
  
  <style scoped>
</style>
  