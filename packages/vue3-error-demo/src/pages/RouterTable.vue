<template>
	<div style="min-width: 50vw">
		<el-row>
			<el-col :span="12">
				<el-card>
					<h3>页面使用量(PV)</h3>
					<div class="data-value">{{ routerTableData.length }}</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<h3>系统使用量(UV)</h3>
					<div class="data-value">{{ new Set(routerTableData.map((i) => i.uuid)).size }}</div>
				</el-card>
			</el-col>
		</el-row>
		<br />
		<el-table :data="routerTableData.sort((a, b) => b.timestamp - a.timestamp)" style="width: 100%">
			<el-table-column prop="uuid" label="uuid">
				<template #default="{ row }">
					{{ row.uuid }}
				</template>
			</el-table-column>
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
					<div>
						<p>
							<strong>From:</strong>
							{{ parseContent(row.content).from.title }} ({{ parseContent(row.content).from.path }})
						</p>
						<p><strong>To:</strong> {{ parseContent(row.content).to.title }} ({{ parseContent(row.content).to.path }})</p>
						<p><strong>停留时间:</strong> {{ parseContent(row.content).residenceTime }} ms</p>
						<p><strong>渲染DOM时间:</strong> {{ parseContent(row.content).renderingTime }} ms</p>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
  
  <script setup lang="ts">
import { routerTableData } from './data';
import { E_TrackerDetailType } from '../main';

// 格式化时间戳
const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

// 解析 content 字符串并提取数据
const parseContent = (content: string) => {
	try {
		return JSON.parse(content);
	} catch {
		return {};
	}
};
</script>
  
  <style scoped>
.data-value {
	font-size: 24px;
	font-weight: bold;
	margin-top: 10px;
}
</style>
  