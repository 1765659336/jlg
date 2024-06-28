import JlgMenu from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgMenu.install = (Vue: App) => {
	Vue.component(JlgMenu.name as string, JlgMenu);
};
export * from './type';
export default JlgMenu;
