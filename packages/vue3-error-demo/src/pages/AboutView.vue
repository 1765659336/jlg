<template>
  <div class="learn-more">
    <header>
      <h1>探索更多</h1>
    </header>
    <section class="content">
      <p>
        欢迎来到我们的应用！我们提供了丰富的资源和信息，帮助你更好地了解我们的服务。
        点击下方的按钮以获取更多详细信息。
      </p>
      <button @click="toggleDetails">{{ showDetails ? '隐藏详细信息' : '显示详细信息' }}</button>
      <div v-if="showDetails" class="details">
        <h2>详细信息</h2>
        <p>
          我们的服务包括但不限于以下几点：
          <ul>
            <li>高质量的客户支持</li>
            <li>多样化的产品选项</li>
            <li>快速可靠的服务交付</li>
            <li>个性化的解决方案</li>
          </ul>
        </p>
        <p>
          我们致力于为每一个用户提供最好的体验。如果你有任何问题或需要进一步的信息，
          请随时联系我们的支持团队。
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showDetails = ref(false);

function toggleDetails() {
  showDetails.value = !showDetails.value;
}
</script>

<style scoped>
.learn-more {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
header {
  background-color: #42b983;
  color: white;
  padding: 15px;
  border-radius: 8px 8px 0 0;
}
h1 {
  margin: 0;
}
.content {
  padding: 20px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button:hover {
  background-color: #369e75;
}
.details {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}
.details h2 {
  color: #42b983;
}
.details ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
