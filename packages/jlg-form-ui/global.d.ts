// GlobalComponents for Volar
export {};
declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		JlgInput: (typeof import('jlg-form-ui'))['JlgInput'];
		JlgInputNumber: (typeof import('jlg-form-ui'))['JlgInputNumber'];
		JlgForm: (typeof import('jlg-form-ui'))['JlgForm'];
		JlgDatePicker: (typeof import('jlg-form-ui'))['JlgDatePicker'];
		JlgFormItem: (typeof import('jlg-form-ui'))['JlgFormItem'];
		JlgOption: (typeof import('jlg-form-ui'))['JlgOption'];
		JlgSelect: (typeof import('jlg-form-ui'))['JlgSelect'];
		JlgTimeSelect: (typeof import('jlg-form-ui'))['JlgTimeSelect'];
		JlgTooltip: (typeof import('jlg-form-ui'))['JlgTooltip'];
		JlgRate: (typeof import('jlg-form-ui'))['JlgRate'];
		JlgRadioGroup: (typeof import('jlg-form-ui'))['JlgRadioGroup'];
		JlgRadio: (typeof import('jlg-form-ui'))['JlgRadio'];
		JlgUpload: (typeof import('jlg-form-ui'))['JlgUpload'];
		JlgFileTypeList: (typeof import('jlg-form-ui'))['JlgFileTypeList'];
		JlgUploadContent: (typeof import('jlg-form-ui'))['JlgUploadContent'];
		JlgUploadList: (typeof import('jlg-form-ui'))['JlgUploadList'];
		JlgUploadFileModel: (typeof import('jlg-form-ui'))['JlgUploadFileModel'];
	}
}
