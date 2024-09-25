import { createApp } from 'vue';
import App from './App.vue';
import '../styles/cssvar.scss';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import 'element-plus/dist/index.css';
import '@/assets/icons/iconfont.js';
import '@/assets/icons/iconfont.css';
import '../styles/reset.scss';
import '../styles/index.scss';

import ModalTemplate from '../packages/components/modal/modal-template.vue';
import { globalSetup } from '../lib/config';
// ModalTempate 设置为全局组件
import { JlgGrid } from 'jlg-table';

function useTable(app) {
	app.component(ModalTemplate.name, ModalTemplate);
	app.use(VXETable);
	app.component('JlgGrid', JlgGrid);
	globalSetup();
}

const app = createApp(App);
app.use(useTable).mount('#app');
