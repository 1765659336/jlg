// 文件上传组件
import JlgUpload from '../upload/index.vue';
import JlgFileTypeList from '../upload/components/file-type-list.vue';
import JlgUploadContent from '../upload/components/upload-content.vue';
import JlgUploadList from '../upload/components/upload-list.vue';
import JlgUploadFileModel from '../upload/components/upload-file-model.vue';
import JlgFileViewerMethod from '../upload/components/method';
import { useUtils as JlgUploadUtils } from './utils';
import type { App } from 'vue';
// 注册组件
JlgUpload.install = (Vue: App) => {
	Vue.component('JlgUpload', JlgUpload);
};
JlgFileTypeList.install = (Vue: App) => {
	Vue.component('JlgFileTypeList', JlgFileTypeList);
};
JlgUploadContent.install = (Vue: App) => {
	Vue.component('JlgUploadContent', JlgUploadContent);
};
JlgUploadList.install = (Vue: App) => {
	Vue.component('JlgUploadList', JlgUploadList);
};
JlgUploadFileModel.install = (Vue: App) => {
	Vue.component('JlgUploadFileModel', JlgUploadFileModel);
};

export { JlgUpload, JlgFileTypeList, JlgUploadContent, JlgUploadList, JlgUploadFileModel, JlgFileViewerMethod, JlgUploadUtils };
