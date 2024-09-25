import { createApp, nextTick, onMounted, ref } from 'vue';
import App from './App.vue';
import ElementPlus, { ElMessage } from 'element-plus';
import 'element-plus/dist/index.css';
// import sdk from 'sentry-sdk'
import sdk from '../../sentry-sdk/src/index';

import { createWebHashHistory, createRouter } from 'vue-router';

import HomeView from './pages/HomeView.vue';
import AboutView from './pages/AboutView.vue';
import ErrorDemo from './pages/ErrorDemo.vue';
import ClickTable from './pages/ClickTable.vue';
import RouterTable from './pages/RouterTable.vue';
import ViewError from './pages/ViewError.vue';
import { clickTableData, errorTableData, requestTableData, routerTableData } from './pages/data';
import axios from 'axios';
import LagerView from './pages/LagerView.vue';
import RequestView from './pages/RequestView.vue';

export enum E_TrackerDetailType {
	点击 = 1,
	页面跳转,
	js运行错误,
	资源加载错误,
	xhr请求,
	xhr请求错误,
	fetch请求,
	fetch请求错误,
	未处理失败promise错误,
	vue错误,
	自定义行为,
}

const routes = [
	{
		path: '/',
		component: HomeView,
		meta: {
			title: '首页',
		},
	},
	{
		path: '/about',
		component: AboutView,
		meta: {
			title: '关于页',
		},
	},
	{
		path: '/error',
		component: ErrorDemo,
		meta: {
			title: '错误页',
		},
	},
	{
		path: '/click-table',
		component: ClickTable,
		meta: {
			title: '点击收集页',
		},
	},
	{
		path: '/router-table',
		component: RouterTable,
		meta: {
			title: '路由收集页',
		},
	},
	{
		path: '/view-error',
		component: ViewError,
		meta: {
			title: '错误查看页',
		},
	},
	{
		path: '/lager-view',
		component: LagerView,
		meta: {
			title: '大数据卡顿页',
		},
	},
	{
		path: '/view-request',
		component: RequestView,
		meta: {
			title: '查看请求数据',
		},
	},
	// {
	// 	path: '/new-ui-view',
	// 	component: NewUiView,
	// 	meta: {
	// 		title: '新版组件库示范页',
	// 	},
	// },
];

const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
});

const app = createApp(App);

// const addMapFileUrl = (fileUrl: string) => {
//     const urlPattern = /https?:\/\/\S+/g; // 匹配以http或https开头的URL
//     const matches = fileUrl.match(urlPattern);
//     const splitArr = matches?.toString().split('/') ?? [];
//     let mapFileUrl = splitArr[splitArr.length - 1];
//     if (!mapFileUrl) {
//         return;
//     }
//     if (mapFileUrl.indexOf('?') !== -1) {
//         mapFileUrl = mapFileUrl.replace(/\?/g, '.map?');
//     } else {
//         mapFileUrl += '.map';
//     }
//     splitArr[splitArr.length - 1] = mapFileUrl;
//     return splitArr.join('/');
// };

const upload = (longString: string) => {
	const blob = new Blob([longString], { type: 'text/plain' }); // 'text/plain' 是 MIME 类型，你可以根据需要进行更改
	const file = new File([blob], 'filename.txt', { type: 'text/plain' }); // 'filename.txt' 是文件名，你可以根据需要进行更改
	const formData = new FormData();
	formData.append('file', file);
	return axios
		.post('http://218.77.107.37:48999/upload/account', formData)
		.then((res) => {
			return res.data.content.path;
		})
		.catch((err) => {
			console.log(err);
		});
};

const returnOption = sdk({
	xhrOption: {
		xhrCallback: async (err) => {
			ElMessage.error('xhr请求错误');
			console.log(err);
			const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
			errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
		},
	},
	fetchCallback: async (err) => {
		ElMessage.error('fetch请求错误');
		console.log(err);
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	jsCallback: async (err) => {
		console.log(err);
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	sourceCallback: async (err) => {
		ElMessage.error('文件资源加载错误上报');
		console.log(err);
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	unHandledRejectionCallback: async (err) => {
		ElMessage.error('未处理失败的Promise');
		console.log(err);
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	vueOption: {
		app: app,
		vueRouter: router,
		vueErrorCallback: (err) => {
			console.log(err);
			ElMessage.error('vue错误');
			errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
		},
	},
	routerChangeCallback: (opt) => {
		ElMessage.info('路由变化');
	},
	routerRealTimeDatasetOverMaxCallback: (opt) => {
		ElMessage.info('路由变化收集达到阈值');
		routerTableData.value = [...routerTableData.value, ...opt];
	},
	clickCallback: (opt) => {
		ElMessage.info('点击事件收集');
	},
	clickRealTimeDatasetOverMaxCallback: (opt) => {
		ElMessage.info('点击收集达到阈值');
		clickTableData.value = [...clickTableData.value, ...opt];
	},
	requestRealTimeDatasetOverMaxCallback: (opt) => {
		console.log(opt);
		ElMessage.info('接口请求收集达到阈值');
		requestTableData.value = [...requestTableData.value, ...opt];
	},
	isOpenRrweb: true,
	trackerOption: {
		trackerOption: {
			maxRealTimeLength: 10,
			backupSize: 50,
		},
		routerTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 10,
		},
		clickTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 10,
		},
		requestTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 50,
		},
	},
	ignoreRequestUrls: ['http://218.77.107.37:48999/upload/account'],
});

app.use(ElementPlus).use(router).mount('#app');

setInterval(() => {
	returnOption.addCustomTracker("{'value':'测试手动上报一个自定义行为的内容'}");
	const un = undefined;
	un.a = '1';
}, 10000);

// 模拟资源加载错误
const script = document.createElement('script');
script.src = 'http://localhost:5173/invalid-script.js';
script.async = true;
document.head.appendChild(script);
