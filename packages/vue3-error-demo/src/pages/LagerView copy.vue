<template>
	<div @scroll="handleScroll" class="scroll-container">
		<h1>卡顿示例页面</h1>
		<p>以下内容将模拟页面渲染时的卡顿现象：</p>

		<div v-for="(item, index) in items" :key="index" class="item">
			<el-card>
				<div class="card-content">
					<h2>标题 {{ index }}</h2>
					<p>这是第 {{ index }} 项的内容。</p>
					<el-button type="primary">按钮 {{ index }}</el-button>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElCard, ElButton } from 'element-plus';
import axios from 'axios';

const items = ref([]);

const fetchData = async () => {
	items.value.push(...Array.from({ length: 10 }, (_, i) => i));
};

const handleScroll = () => {
	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
	const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

	if (scrollTop + clientHeight >= scrollHeight - 100) {
		fetchData();
	}
};

onMounted(() => {
	fetchData();
});
</script>

<style scoped>
.scroll-container {
	height: 100vh;
	overflow-y: auto;
	padding: 20px;
}

.item {
	margin-bottom: 16px;
}
.card-content {
	padding: 20px;
}
</style>
