<template>
  <div class="app-container">
    <h1>欢迎使用 Vue 3 示例</h1>
    <p>下面是一些按钮示例：</p>

    <button @click="handleClick('按钮 1')">按钮 1</button>
    <button @click="handleClick('按钮 2')">按钮 2</button>
    <button @click="handleClick('按钮 3')">按钮 3</button>

    <div v-if="message" class="message-box">
      <p>{{ message }}</p>
      <button @click="clearMessage">清除消息</button>
    </div>

    <div class="content-box">
      <h2>内容区域</h2>
      <p>这是一个简单的内容区域，你可以在这里放置任何你需要展示的内容。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");

function handleClick(buttonName: string) {
  message.value = `你点击了 ${buttonName}`;
}

function clearMessage() {
  message.value = "";
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #42b983;
}

button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #369c74;
}

.message-box {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.content-box {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>