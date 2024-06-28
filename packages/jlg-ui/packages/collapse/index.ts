import JlgCollapse from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgCollapse.install = (Vue: App) => {
	Vue.component(JlgCollapse.name as string, JlgCollapse);
};

export default JlgCollapse;
export * from './type';
