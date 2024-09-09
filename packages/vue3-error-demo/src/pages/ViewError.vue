<template>
  <div>
    <el-table
      :data="errorTableData.sort((a, b) => b.timestamp - a.timestamp)"
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
      <el-table-column prop="behavior" label="行为记录">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="openBehaviorTable(row.behavior)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="rrwebUrl" label="回放">
        <template #default="{ row }">
          <el-button type="primary" link @click="openRrwebUrl(row.rrwebUrl)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="回放内容"
      v-model="dialogVisible"
      fullscreen
      destroy-on-close
    >
      <div ref="player" class="player-container"></div>
    </el-dialog>

    <el-dialog
      title="行为记录"
      v-model="dialogVisibleTable"
      fullscreen
      destroy-on-close
      @close="behaviorTableData = []"
    >
      <el-table
        :data="behaviorTableData.sort((a, b) => b.timestamp - a.timestamp)"
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
    </el-dialog>
  </div>
</template>
    
    <script setup lang="ts">
import { errorTableData } from "./data";
import { ref } from "vue";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import axios from "axios";
import { isArray } from "lodash-unified";

const player = ref<HTMLDivElement | null>(null);

// 格式化时间戳
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

// 弹窗显示状态
const dialogVisible = ref(false);

const openRrwebUrl = async (url: string) => {
  dialogVisible.value = true;
  // 发起请求
  const response = await axios.get("http://218.77.107.37:49000/" + url, {
    responseType: "text",
  });

  // 获取文本内容
  const text = response.data;

  if (player.value && text && isArray(JSON.parse(text))) {
    new rrwebPlayer({
      target: player.value, // 回放所需要的HTML元素
      data: { events: JSON.parse(text) },
    });
  }
};

const dialogVisibleTable = ref(false);

const behaviorTableData = ref([]);

const openBehaviorTable = (data: any) => {
  dialogVisibleTable.value = true;
  behaviorTableData.value = data;
};
</script>
    
    <style scoped>
/* 自定义样式 */
</style>

    