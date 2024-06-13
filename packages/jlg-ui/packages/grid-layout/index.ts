import JlgGridLayout from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgGridLayout.install = (Vue: App) => {
	Vue.component(JlgGridLayout.name as string, JlgGridLayout);
};

export default JlgGridLayout;
export * from './type';
