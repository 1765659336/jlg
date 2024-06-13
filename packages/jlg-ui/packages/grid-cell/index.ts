import JlgGridCell from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgGridCell.install = (Vue: App) => {
	Vue.component(JlgGridCell.name as string, JlgGridCell);
};

export default JlgGridCell;
export * from './type';
