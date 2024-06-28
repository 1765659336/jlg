import JlgFlexLayout from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgFlexLayout.install = (Vue: App) => {
	Vue.component(JlgFlexLayout.name as string, JlgFlexLayout);
};

export default JlgFlexLayout;
export * from './type';
