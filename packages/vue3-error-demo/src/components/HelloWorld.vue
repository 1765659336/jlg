<template>
	<div>
		<el-button type="danger" round @click="axiosError"> 模拟axios接口报错 </el-button>
		<el-button type="danger" round @click="fetchError"> 模拟fetch接口报错 </el-button>
		<el-button type="danger" round @click="failPromiseError"> 模拟未处理失败Promise </el-button>
		<el-button type="danger" round @click="vueError"> 模拟Vue错误 </el-button>
	</div>
</template>

<script setup lang="ts">
import axios from 'axios';

const axiosError = () => {
	// 模拟axios接口报错
	axios.get('http://localhost:3000/api/error?a=1').catch(() => {});
	axios
		.post('http://localhost:3000/api/postErr?a=1', {
			text: 'a',
		})
		.catch(() => {});
};

const fetchError = () => {
	// 模拟fetch接口报错
	fetch('http://localhost:3000/api/error?b=1')
		.then((res) => {
			console.log(res);
		})
		.catch(() => {});
	fetch('https://example.com/api/endpoint', {
		method: 'POST', // 指定请求方法
		headers: {
			'Content-Type': 'application/json', // 指定请求体格式
		},
		body: JSON.stringify({ test: 2 }), // 将 JavaScript 对象转换为 JSON 字符串
	}).catch(() => {});
};

const failPromiseError = () => {
	// 模拟未处理失败Promise
	const p = new Promise((_resolve, reject) => {
		reject('失败');
	});
	p.then((res) => {
		console.log(res);
	});
};

const vueError = () => {
	const un = undefined;
	un.a = '1';
};
</script>

<style scoped>
</style>