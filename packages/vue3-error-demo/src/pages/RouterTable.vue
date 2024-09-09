<template>
  <div>
    <el-table
      :data="routerTableData.sort((a, b) => b.timestamp - a.timestamp)"
      style="width: 100%"
    >
      <el-table-column prop="timestamp" label="Timestamp" width="180">
        <template #default="{ row }">
          {{ formatTimestamp(row.timestamp) }}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="Content">
        <template #default="{ row }">
          <div>
            <p>
              <strong>From:</strong>
              {{ parseContent(row.content).from.title }} ({{
                parseContent(row.content).from.path
              }})
            </p>
            <p>
              <strong>To:</strong> {{ parseContent(row.content).to.title }} ({{
                parseContent(row.content).to.path
              }})
            </p>
            <p>
              <strong>Time:</strong> {{ parseContent(row.content).time }} ms
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script setup lang="ts">
import { routerTableData } from "./data";

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
/* 自定义样式 */
</style>
  