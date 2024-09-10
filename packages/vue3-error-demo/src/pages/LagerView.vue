<template>
	<div>
		<h1>卡顿示例页面</h1>
		<p>以下内容将模拟页面渲染时的卡顿现象：</p>

		<!-- 使用大量静态内容 -->
		<div v-for="(item, index) in items" :key="index" class="item">
			<el-card>
				<div class="card-content">
					<h2>标题 {{ index }}</h2>
					<p>这是卡顿示例页面的第 {{ index }} 项。这里有一些静态内容，用于模拟页面的渲染卡顿现象。</p>
					<el-button type="primary">按钮 {{ index }}</el-button>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { ElCard, ElButton, ElLoading } from 'element-plus';
import axios from 'axios';

// 你可以在这里定义静态数据
const items = ref(Array.from({ length: 6000 }, (_, i) => i));

const loading = ref(true);

// onMounted(() => {
const loadingInstance = ElLoading.service({});
axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
	axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
		axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
			axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
				axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
					axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
						axios.get('https://api.oioweb.cn/api/SimpWords').then((res) => {
							fetch('https://api.oioweb.cn/api/weather/GetWeather');
							loadingInstance.close();
						});
					});
				});
			});
		});
	});
});
// });
</script>

<style scoped>
.item {
	margin-bottom: 16px;
}
.card-content {
	padding: 20px;
}
</style>
