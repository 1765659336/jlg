import JlgFlexCell from './index.vue';
import type { App } from 'vue';
// 注册组件
JlgFlexCell.install = (Vue: App) => {
	Vue.component(JlgFlexCell.name as string, JlgFlexCell);
};

export default JlgFlexCell;
export * from './type';
