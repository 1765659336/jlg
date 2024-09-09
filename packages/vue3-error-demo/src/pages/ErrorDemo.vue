<template>
  <div class="container">
    <header class="header">
      <h1>欢迎来到我们的回放演示</h1>
      <HelloWorld msg="Vite + Vue" />
    </header>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "../components/HelloWorld.vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.main-content {
  width: 100%;
  max-width: 1200px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.player-container {
  height: 600px;
  border-radius: 8px;
  background: #f9f9f9;
}
</style>
