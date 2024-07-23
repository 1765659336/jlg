import { I_Table_Filter_Props } from '../packages/components/table-filter/type';
import { I_Table_Grid_Props } from '../packages/components/table-base/type';

export type T_Global_Config_Props = {
	// 表格筛选器默认配置
	tableFilter?: I_Table_Filter_Props;
	datePickerFormat?: string;
	datePickerValueFormat?: string;
	table?: I_Table_Grid_Props;
	modal?: {
		loadingComponent?: I_Table_Grid_Props['loadingConfig']['loadingComponent'];
	};
	icon?: {
		[key: string]: string;
	};
};

const iconPrefix = 'vxe-icon-';

const GlobalConfig: T_Global_Config_Props = {
	tableFilter: {
		titleAlign: 'left',
		titleWidth: 95,
		folding: false,
		items: [],
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
			resizable: true,
			useKey: true,
		},
		customConfig: {
			allowFixed: true,
			showFooter: true,
			storage: false,
		},
		sortConfig: {
			multiple: false,
			showIcon: true,
			iconLayout: 'vertical',
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
				list: 'data.content.items',
				result: 'data.content.items',
				total: 'data.content.totalCount',
			},
			getSysConfig: null,
			saveSysConfig: null,
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
			enabled: true,
			gt: 60,
			oSize: 0,
		},
		scrollY: {
			enabled: true,
			gt: 100,
			oSize: 0,
		},
		layouts: ['Top', 'Form', 'Toolbar', 'Table', 'Bottom', 'Pager'],
		operationConfig: null,
		tableFilterConfig: {
			isFilterTemplate: true,
			items: [],
		},
		storageConfig: {
			enabled: true,
			autoStorage: true,
		},
		loadingConfig: {
			loadingComponent: null,
		},
	},
	modal: {
		loadingComponent: null,
	},
	icon: {
		// loading
		LOADING: iconPrefix + 'spinner roll vxe-loading--default-icon',

		// table
		TABLE_SORT_ASC: iconPrefix + 'caret-up',
		TABLE_SORT_DESC: iconPrefix + 'caret-down',
		TABLE_FILTER_NONE: iconPrefix + 'funnel',
		TABLE_FILTER_MATCH: iconPrefix + 'funnel',
		TABLE_EDIT: iconPrefix + 'edit',
		TABLE_TITLE_PREFIX: iconPrefix + 'question-circle-fill',
		TABLE_TITLE_SUFFIX: iconPrefix + 'question-circle-fill',
		TABLE_TREE_LOADED: iconPrefix + 'spinner roll',
		TABLE_TREE_OPEN: iconPrefix + 'caret-right rotate90',
		TABLE_TREE_CLOSE: iconPrefix + 'caret-right',
		TABLE_EXPAND_LOADED: iconPrefix + 'spinner roll',
		TABLE_EXPAND_OPEN: iconPrefix + 'arrow-right rotate90',
		TABLE_EXPAND_CLOSE: iconPrefix + 'arrow-right',
		TABLE_CHECKBOX_CHECKED: iconPrefix + 'checkbox-checked',
		TABLE_CHECKBOX_UNCHECKED: iconPrefix + 'checkbox-unchecked',
		TABLE_CHECKBOX_INDETERMINATE: iconPrefix + 'checkbox-indeterminate',
		TABLE_RADIO_CHECKED: iconPrefix + 'radio-checked',
		TABLE_RADIO_UNCHECKED: iconPrefix + 'radio-unchecked',

		// button
		BUTTON_DROPDOWN: iconPrefix + 'arrow-down',
		BUTTON_LOADING: iconPrefix + 'spinner roll',

		// select
		SELECT_LOADED: iconPrefix + 'spinner roll',
		SELECT_OPEN: iconPrefix + 'caret-down rotate180',
		SELECT_CLOSE: iconPrefix + 'caret-down',

		// pager
		PAGER_HOME: iconPrefix + 'home-page',
		PAGER_END: iconPrefix + 'end-page',
		PAGER_JUMP_PREV: iconPrefix + 'arrow-double-left',
		PAGER_JUMP_NEXT: iconPrefix + 'arrow-double-right',
		PAGER_PREV_PAGE: iconPrefix + 'arrow-left',
		PAGER_NEXT_PAGE: iconPrefix + 'arrow-right',
		PAGER_JUMP_MORE: iconPrefix + 'ellipsis-h',

		// input
		INPUT_CLEAR: iconPrefix + 'error-circle-fill',
		INPUT_PWD: iconPrefix + 'eye-fill',
		INPUT_SHOW_PWD: iconPrefix + 'eye-fill-close',
		INPUT_PREV_NUM: iconPrefix + 'caret-up',
		INPUT_NEXT_NUM: iconPrefix + 'caret-down',
		INPUT_DATE: iconPrefix + 'calendar',
		INPUT_SEARCH: iconPrefix + 'search',

		// modal
		MODAL_ZOOM_IN: iconPrefix + 'zoom-out',
		MODAL_ZOOM_OUT: iconPrefix + 'maximize',
		MODAL_CLOSE: iconPrefix + 'close',
		MODAL_INFO: iconPrefix + 'info-circle-fill',
		MODAL_SUCCESS: iconPrefix + 'success-circle-fill',
		MODAL_WARNING: iconPrefix + 'warnion-circle-fill',
		MODAL_ERROR: iconPrefix + 'error-circle-fill',
		MODAL_QUESTION: iconPrefix + 'question-circle-fill',
		MODAL_LOADING: iconPrefix + 'spinner roll',
		MODAL_MENU: iconPrefix + 'menu',
		MODAL_MINUS: iconPrefix + 'minus',
		MODAL_FOLD: iconPrefix + 'arrow-down',
		MODAL_UNFOLD: iconPrefix + 'arrow-up',
		SETTING_CUSTOM: iconPrefix + 'setting',

		// toolbar
		TOOLBAR_TOOLS_REFRESH: iconPrefix + 'repeat',
		TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'repeat roll',
		TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
		TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
		TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
		TOOLBAR_TOOLS_FULLSCREEN: iconPrefix + 'fullscreen',
		TOOLBAR_TOOLS_MINIMIZE: iconPrefix + 'minimize',
		TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'custom-column',
		TOOLBAR_TOOLS_FIXED_LEFT: iconPrefix + 'fixed-left',
		TOOLBAR_TOOLS_FIXED_LEFT_ACTIVED: iconPrefix + 'fixed-left-fill',
		TOOLBAR_TOOLS_FIXED_RIGHT: iconPrefix + 'fixed-right',
		TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVED: iconPrefix + 'fixed-right-fill',

		// form
		FORM_PREFIX: iconPrefix + 'question-circle-fill',
		FORM_SUFFIX: iconPrefix + 'question-circle-fill',
		FORM_FOLDING: iconPrefix + 'arrow-up rotate180',
		FORM_UNFOLDING: iconPrefix + 'arrow-up',
	},
};

export default GlobalConfig;
