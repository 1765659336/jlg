import { I_Table_Filter_Props } from '../packages/table-filter/type';
import { VXETableConfigOptions } from 'vxe-table';

export type T_Global_Config_Props = {
	// 表格筛选器默认配置
	tableFilter: I_Table_Filter_Props;
	datePickerFormat: string;
	datePickerValueFormat: string;
	table: VXETableConfigOptions['grid'];
};

const GlobalConfig: T_Global_Config_Props = {
	tableFilter: {
		titleAlign: 'left',
		titleWidth: 95,
		folding: false,
		beforeSave: undefined,
	},
	datePickerFormat: 'YYYY/MM/DD',
	datePickerValueFormat: 'YYYY-MM-DD',
	table: {
		fit: true,
		showHeader: true,
		animat: true,
		delayHover: 250,
		autoResize: true,
		minHeight: 144,
		resizeConfig: {
			refreshDelay: 250,
		},
		radioConfig: {
			// trigger: 'default'
			strict: true,
		},
		checkboxConfig: {
			// trigger: 'default',
			strict: true,
		},
		tooltipConfig: {
			enterable: true,
		},
		validConfig: {
			showMessage: true,
			autoClear: true,
			message: 'inline',
			msgMode: 'single',
		},
		columnConfig: {
			maxFixedSize: 4,
		},
		customConfig: {
			allowFixed: true,
			showFooter: true,
		},
		sortConfig: {
			showIcon: true,
			iconLayout: 'vertical',
		},
		filterConfig: {
			// remote: false,
			// filterMethod: null,
			showIcon: true,
		},
		treeConfig: {
			rowField: 'id',
			parentField: 'parentId',
			childrenField: 'children',
			hasChildField: 'hasChild',
			mapChildrenField: '_X_ROW_CHILD',
			indent: 20,
			showIcon: true,
		},
		expandConfig: {
			// trigger: 'default',
			showIcon: true,
		},
		editConfig: {
			// mode: 'cell',
			showIcon: true,
			showAsterisk: true,
		},
		proxyConfig: {
			enabled: true,
			autoLoad: true,
			message: true,
			props: {
				list: null,
				result: 'result',
				total: 'page.total',
				message: 'message',
			},
		},
		importConfig: {
			modes: ['insert', 'covering'],
		},
		exportConfig: {
			modes: ['current', 'selected'],
		},
		printConfig: {
			modes: ['current', 'selected'],
		},
		mouseConfig: {
			extension: true,
		},
		keyboardConfig: {
			isEsc: true,
		},
		areaConfig: {
			selectCellByHeader: true,
		},
		clipConfig: {
			isCopy: true,
			isCut: true,
			isPaste: true,
		},
		fnrConfig: {
			isFind: true,
			isReplace: true,
		},
		scrollX: {
			// enabled: false,
			gt: 60,
			// oSize: 0
		},
		scrollY: {
			// enabled: false,
			gt: 100,
			// oSize: 0
		},
		layouts: ['Top', 'Form', 'Toolbar', 'Table', 'Bottom', 'Pager'],
	},
};

export default GlobalConfig;
