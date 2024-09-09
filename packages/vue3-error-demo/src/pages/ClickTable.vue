<template>
  <div>
    <el-table
      :data="clickTableData.sort((a, b) => b.timestamp - a.timestamp)"
      style="width: 100%"
    >
      <el-table-column prop="timestamp" label="Timestamp" width="180">
        <template #default="{ row }">
          {{ formatTimestamp(row.timestamp) }}
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
import { clickTableData } from "./data";
// 格式化时间戳
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

// 解析 content 字符串并提取 HTML
</script>
  
  <style scoped>
/* 自定义样式 */
</style>
  