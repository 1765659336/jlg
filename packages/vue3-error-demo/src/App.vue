<template>
	<div class="container">
		<header>
			<h1>Welcome to My Stylish App</h1>
		</header>
		<main>
			<section class="intro">
				<h2>Discover Amazing Features</h2>
				<p>前端监控系统</p>
				<div class="button-group">
					<router-link to="/" class="btn btn-primary">模拟业务页面1</router-link>
					<router-link to="/about" class="btn btn-secondary">模拟业务页面2</router-link>
					<router-link to="/error" class="btn btn-danger">模拟制造一些错误</router-link>
					<!-- <router-link to="/new-ui-view" class="btn btn-secondary">新版组件库页面</router-link> -->
					<router-link to="/lager-view" class="btn btn-danger">卡顿页面</router-link>
					<router-link to="/click-table" class="btn btn-secondary">用户点击行为记录</router-link>
					<router-link to="/router-table" class="btn btn-secondary">查看页面使用情况</router-link>
					<router-link to="/view-request" class="btn btn-danger">查看请求记录</router-link>
					<router-link to="/view-error" class="btn btn-danger">查看错误</router-link>
				</div>
			</section>
			<section class="content">
				<router-view />
			</section>
		</main>
		<footer>
			<p>&copy; 2024 My Stylish App. All rights reserved.</p>
		</footer>
	</div>
</template>

<script setup>
</script>

<style scoped>
/* Reset margin and padding */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Arial', sans-serif;
	background-color: #f4f4f4;
	color: #333;
}

/* Container layout */
.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

/* Header styling */
header {
	background: linear-gradient(135deg, #6e45e2, #88d3ce);
	color: white;
	padding: 20px;
	text-align: center;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
	font-size: 2.5rem;
	margin-bottom: 10px;
}

nav {
	margin-top: 10px;
}

nav router-link {
	text-decoration: none;
	color: white;
	font-size: 1rem;
	margin: 0 15px;
	padding: 10px;
	border-radius: 5px;
	transition: background-color 0.3s, color 0.3s;
}

nav router-link:hover {
	background-color: rgba(255, 255, 255, 0.2);
}

/* Main section styling */
main {
	flex: 1;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #ffffff;
}

.intro {
	text-align: center;
	margin-bottom: 30px;
}

.intro h2 {
	font-size: 2rem;
	color: #333;
	margin-bottom: 10px;
}

.intro p {
	font-size: 1.2rem;
	color: #666;
	margin-bottom: 20px;
}

.button-group {
	display: flex;
	gap: 10px;
}

.btn {
	text-decoration: none;
	color: white;
	padding: 12px 24px;
	border-radius: 5px;
	font-size: 1rem;
	font-weight: bold;
	text-align: center;
	transition: background-color 0.3s, transform 0.3s;
}

.btn-primary {
	background-color: #6e45e2;
}

.btn-secondary {
	background-color: #88d3ce;
}

.btn-danger {
	background-color: #e57373;
}

.btn:hover {
	transform: scale(1.05);
}

.btn-primary:hover {
	background-color: #5a36c7;
}

.btn-secondary:hover {
	background-color: #74bfbf;
}

.btn-danger:hover {
	background-color: #d32f2f;
}

/* Footer styling */
footer {
	background: #333;
	color: white;
	text-align: center;
	padding: 10px;
	box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

footer p {
	margin: 0;
}
</style>
