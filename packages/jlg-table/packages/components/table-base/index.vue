<template>
	<div class="jlg-table-base vxe-table--render-default">
		<div ref="customTemplateRef" class="custom-template"></div>
		<div class="jlg-table-container">
			<vxe-grid
				ref="xGrid"
				v-bind="{ ...props, ...tableCompEvents }"
				:columns="propsColumns"
				:proxy-config="computeProxyOpts"
				:auto-resize="true"
				:stripe="customStore.stripe"
				:size="customStore.size"
				:align="customStore.align"
				@resizable-change="handleResizableChange"
			>
				<template #top>
					<div v-if="tableFilterConfig.items" ref="formElemRef" class="jlg-grid--form-wrapper">
						<table-filter
							ref="tableFilterRef"
							v-bind="props.tableFilterConfig"
							v-model:items="tableFilterConfig.items"
							:virtual-ref="customVirtualPopoverRef"
							@reset="handleFilterReset"
							@save="handleFilterSave"
							@save-template="handleFilterSaveTemplate"
							@folding="handleFolding"
						>
							<template v-if="$slots.filter_divider" #filter_divider="{ isFolding }">
								<slot name="filter_divider" :is-folding="isFolding"></slot>
							</template>
						</table-filter>
					</div>
				</template>
				<template v-for="(_, name) in $slots" #[name]="slotData" :key="name">
					<slot :name v-bind="slotData || {}"></slot>
				</template>
				<template #default_handle_operation="{ row }">
					<slot name="default_handle_operation" :row="row"></slot>
				</template>
			</vxe-grid>
		</div>
	</div>
</template>
<script setup lang="ts">
import eachTree from 'xe-utils/eachTree';
import clone from 'xe-utils/clone';
import findTree from 'xe-utils/findTree';
import merge from 'xe-utils/merge';
import toArrayTree from 'xe-utils/toArrayTree';
import findIndexOf from 'xe-utils/findIndexOf';
import TableFilter from '../table-filter/newIndex.vue';
import type { I_Table_Grid_Props, T_Msg, T_RenderCustomTemplate, T_Save_Config_Type } from './type';
import type { I_Table_Filter_Props, I_User_Search_Template_Model } from '../../components/table-filter/type';
import { computed, nextTick, reactive, Ref, useAttrs } from 'vue';
import GlobalConfig from '../../../lib/useGlobalConfig';
import { VxeGridEventProps, VxeGridInstance, VxeGridPropTypes, VxeGridDefines, VxeTableDefines } from 'vxe-table';
import { ElMessage, ElMessageBox } from 'element-plus';
import Sortable from 'sortablejs';
import { useRenderCustomTemplate } from './useRenderCustomTemplate';

defineOptions({
	name: 'JlgGrid',
});

type T_Custom_Map = {
	field?: string;
	resizeWidth?: number;
	visible?: boolean;
	fixed?: string;
	renderSortNumber?: number;
	[key: string]: any;
};

const fieldList = [
	// 默认是否显示
	'visible',
	// 拖拽列宽
	'resizeWidth',
	// 是否固定列
	'fixed',
	// 当内容过长时显示为省略号
	'showOverflow',
	// 当表头内容过长时显示为省略号
	'showHeaderOverflow',
	// 列排序的优先级
	'renderSortNumber',
];

const props = withDefaults(defineProps<I_Table_Grid_Props>(), {
	/** 基本属性 */
	// 表格的最小高度
	minHeight: () => GlobalConfig.table.minHeight,
	// 是否带有斑马纹
	stripe: () => GlobalConfig.table.stripe,
	// 是否带有边框
	border: () => GlobalConfig.table.border,
	// 是否圆角边框
	round: () => GlobalConfig.table.round,
	// 表格的尺寸
	size: () => GlobalConfig.table.size,
	// 所有的列对其方式
	align: () => GlobalConfig.table.align,
	// 所有的表头列的对齐方式
	headerAlign: () => GlobalConfig.table.headerAlign,
	// 所有的表尾列的对齐方式
	footerAlign: () => GlobalConfig.table.footerAlign,
	// 是否显示表头
	showHeader: () => GlobalConfig.table.showHeader,
	// 设置表头所有内容过长时显示为省略号
	showHeaderOverflow: () => GlobalConfig.table.showHeaderOverflow,
	// 设置表尾所有内容过长时显示为省略号
	showFooterOverflow: () => GlobalConfig.table.showFooterOverflow,
	layouts: () => GlobalConfig.table.layouts,
	/** 高级属性 */
	// （即将废弃）rowId 已废弃，被 row-config.keyField 替换
	rowId: () => GlobalConfig.table.rowId,
	emptyText: () => GlobalConfig.table.emptyText,
	keepSource: () => GlobalConfig.table.keepSource,
	// 是否自动监听父容器变化去更新响应式表格宽高
	autoResize: () => GlobalConfig.table.autoResize,
	// 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
	fit: () => GlobalConfig.table.fit,
	proxyConfig: () => GlobalConfig.table.proxyConfig,
	operationConfig: () => GlobalConfig.table.operationConfig,
	rowConfig: () => GlobalConfig.table.rowConfig,
	columnConfig: () => GlobalConfig.table.columnConfig,
	customConfig: () => GlobalConfig.table.customConfig,
	sortConfig: () => GlobalConfig.table.sortConfig,
});
const emit = defineEmits<{
	resizableChange: [value: VxeGridDefines.ResizableChangeEventParams];
}>();

const xGrid = ref<VxeGridInstance>();
const customTemplateRef = ref<HTMLElement>();
const formElemRef = ref<HTMLElement>();
const tableFilterRef = ref<InstanceType<typeof TableFilter>>();

const customVirtualPopoverRef = ref();

const initPopoverButton = (popoverRef: HTMLElement | Ref<HTMLElement>) => {
	customVirtualPopoverRef.value = unref(popoverRef);
	const button = customVirtualPopoverRef.value?.ref || customVirtualPopoverRef.value;
	if (!button || !tableFilterRef.value) return;
	button.removeEventListener('click', tableFilterRef.value.handleQuickSearch);
	button.addEventListener('click', tableFilterRef.value.handleQuickSearch);
	return nextTick();
};
const onClickOutside = () => {
	unref(tableFilterRef).onClickOutside();
};

const tableFilterConfig = defineModel<I_Table_Filter_Props>('tableFilterConfig');
const rawTableFilterConfig = clone(tableFilterConfig.value, true);
const getTableFilterConfig = (deep: boolean) => {
	return clone(tableFilterConfig.value, deep);
};

const reactData = reactive<Record<string, any>>({});

// 用于存储表格自定义列的一些状态
const customStore = reactive<Record<string, any>>({
	// 是否带有斑马纹
	stripe: false,
	// 表格的尺寸
	size: 'medium',
	// 所有的列对齐方式
	align: 'center',
});

const setTableGlobalConfig = (obj: Record<string, any>) => {
	Object.keys(obj).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(customStore, key)) {
			customStore[key] = obj[key];
		}
	});
};

const operationColumn = computed<VxeTableDefines.ColumnOptions>(() => {
	return {
		title: '操作列',
		field: 'jlg-operation-colum',
		width: 200,
		fixed: 'right',
		align: 'left',
		slots: { default: 'default_handle_operation' },
		...props.operationConfig,
	};
});

const propsColumns = computed(() => {
	const columns = clone(props.columns, true);
	// 如果存在操作列配置
	if (props.operationConfig) {
		columns.push(operationColumn.value);
	}
	return columns;
});
// 保存原始列配置, 用于恢复
const rawColumns = clone<VxeGridPropTypes.Columns>(propsColumns.value, true);
//  当前是否存在分组列
const isColgroup = computed(() => {
	return rawColumns.some((item) => item.children?.length);
});
// storageConfig
const storageConfig = computed(() => {
	return props?.storageConfig ? props.storageConfig : GlobalConfig.table.storageConfig;
});

/// 储存服务端列 resizeWidth
const columnResizeWidthMap = new Map<string, number>();
const beforeColumn = (args) => {
	const { column } = args;
	const resizeWidth = columnResizeWidthMap.get(column.id);
	if (resizeWidth) {
		column.resizeWidth = resizeWidth;
	}
	const beforeColumn = props.proxyConfig?.beforeColumn ? props.proxyConfig.beforeColumn : GlobalConfig.table.proxyConfig.beforeColumn;
	if (beforeColumn && typeof beforeColumn === 'function') {
		return beforeColumn(args);
	}
};
const beforeQuery = async (args) => {
	const getSysConfig = props.proxyConfig?.getSysConfig ? props.proxyConfig.getSysConfig : GlobalConfig.table.proxyConfig.getSysConfig;
	if (args.isInited && typeof getSysConfig == 'function') {
		const {
			defaultSort = [],
			searchData = [],
			columns = [],
			globalConfig = {},
			merged = null,
			filterMerged,
			filterSchemes = null,
		} = await getSysConfig();
		setTableGlobalConfig(globalConfig);
		if (columns.length > 0) {
			eachTree(columns, (column) => {
				columnResizeWidthMap.set(column.id, column.resizeWidth);
			});
			const _merged = merged ? merged : mergedList;
			const _columns = _merged(flattenArray(propsColumns.value, 'field'), flattenArray(columns, 'field'), fieldList, 'field', 'renderSortNumber');
			// rawColumns = clone<VxeGridPropTypes.Columns>(_columns, true);
			await xGrid.value?.loadColumn(_columns);
		}
		if (searchData.length > 0) {
			const _filterMerged = filterMerged ? filterMerged : mergedList;
			const _items = _filterMerged(tableFilterConfig.value?.items || [], searchData, ['visible', 'sortNumber'], 'field');
			const formData: any = {};
			_items.forEach((item) => {
				formData[item.field] = item.defaultValue;
			});
			tableFilterConfig.value.items = _items;
			args.form = formData;
		} else {
			args.form = tableFilterRef.value?.getFormData() || null;
		}

		// 设置筛选模板列表数据
		if (filterSchemes && tableFilterRef.value?.setTemplateList) {
			await tableFilterRef.value.setTemplateList(filterSchemes);
		}

		// 页面初始化时,如果服务端返回的数据存在组合排序,强制开启多列排序, 判断  props.sortConfig?.multiple 是否为 false 是为了兼容正常的多排序
		if (defaultSort.length > 0 && props.sortConfig?.multiple === false) {
			// 直接修改 props 违背了 vue 的单项数据流原则,但是考虑到外部修改参数操作成本较高,暂时先直接修改
			args.$grid.props.sortConfig.multiple = true;
			args.$grid.props.sortConfig.defaultSort = defaultSort;
			args.sorts = defaultSort;
		}
	} else {
		args.form = tableFilterRef.value?.getFormData() || null;
	}
	args.form = {
		items: tableFilterConfig.value.items,
		data: args.form,
	};
	if (args.isInited) {
		await nextTick(() => {
			tableFilterRef.value?.handleInitialValue();
		});
	}
	reactData.$grid = args.$grid;
	reactData.isInited = args.isInited;
	reactData.isReload = args.isReload;
	reactData.page = args.page;
	reactData.sort = args.sort;
	reactData.sorts = args.sorts;
	reactData.form = args.form;
	const beforeQuery = props.proxyConfig?.beforeQuery ? props.proxyConfig.beforeQuery : GlobalConfig.table.proxyConfig.beforeQuery;
	if (beforeQuery && typeof beforeQuery === 'function') {
		return beforeQuery(args);
	}
	return args.options(args);
};

const defaultProxyConfig: VxeGridPropTypes.ProxyConfig = {
	beforeQuery,
	beforeColumn,
	message: false,
	seq: true,
};

const computeProxyOpts = computed(() => {
	return merge({}, GlobalConfig.table.proxyConfig, props.proxyConfig, defaultProxyConfig) as VxeGridPropTypes.ProxyConfig;
});

// 获取表单元素的宽度
function getFormElementWidth() {
	return formElemRef.value?.offsetWidth || 0;
}

function commitProxy(code: string, msg: T_Msg = true, ...args: any[]) {
	switch (code) {
		case 'insert':
			if (typeof msg === 'function' && msg() === false) {
				return Promise.resolve();
			}
			return xGrid.value.insert(args ?? {});
		case 'remove':
		case 'delete':
			return handleDeleteRow(code, msg, () => xGrid.value.commitProxy(code, ...args));
	}
	if (xGrid.value) {
		return xGrid.value.commitProxy(code, ...args);
	}
}

function flattenArray(arr: any[], key: string, parentId = null) {
	let result = [];

	arr.forEach((item) => {
		if (!item[key]) {
			item[key] = item.children ? item['colId'] ?? item['id'] : 'jlg_col_' + item['type'];
			if (item.children && !item['colId'] && !item['id']) {
				console.error('分组表头 colId 不能为空！');
				throw new Error('分组表头 colId 不能为空！');
			}
		}
		// 添加 parentId 字段
		item['parentId'] = parentId;
		result.push(item);

		// 如果元素有 children 属性并且它是一个数组
		if (Array.isArray(item.children)) {
			// 递归调用 flattenArray 函数，并将当前元素的 'key' 作为 'parentId' 传递给子元素
			result = result.concat(flattenArray(item.children, key, item[key]));
		}
	});

	return result;
}

/**
 * 前端本地列与服务端列合并
 * @param localList 本地前端的列表
 * @param serverList 来自服务器的列表。
 * @param fieldList 要合并的字段列表。
 * @param key 用于标识唯一列的主键。
 * @param  isToTree 是否转换为树形结构
 * @param  orderByKey 排序字段
 * @returns 合并后的列
 * */
function mergedList<D>(localList: D[], serverList: D[], fieldList: (keyof D)[], key: string, orderByKey = '') {
	// 创建一个map，用于快速查找list2中的列
	const serverMap = new Map(serverList.map((item) => [item[key], item]));
	const result = localList.map((item1) => {
		const item2 = serverMap.get(item1[key]);
		if (item2) {
			// 如果在list2中存在相同的列，合并item2中的字段
			fieldList.forEach((field) => {
				if (Object.prototype.hasOwnProperty.call(item2, field)) {
					item1[field] = item2[field];
				}
			});
		}
		return item1;
	});
	return toArrayTree(result, { strict: true, key: key, sortKey: orderByKey });
}

const handleDeleteRow = (code: string, msg: T_Msg, callback: () => void): Promise<void> => {
	const selectRecords = reactData.$grid.getCheckboxRecords();
	if (msg === false) {
		if (selectRecords.length) {
			callback();
		}
		return Promise.resolve();
	}
	if (selectRecords.length) {
		if (typeof msg === 'function') {
			if (msg() === false) {
				return Promise.resolve();
			}
		}
		ElMessageBox.confirm('您确定要删除所选数据吗？', '消息提示', {
			confirmButtonText: '确认',
			cancelButtonText: '取消',
			type: 'warning',
		}).then(() => {
			return callback();
		});
	} else {
		ElMessage({
			message: '请至少选择一条数据!',
			type: 'warning',
		});
	}
	return Promise.resolve();
};

//  支持拖拽排序
let sortable: any;
// 分组表格拖拽逻辑
const columnDrop = () => {
	const $grid = xGrid.value;
	const headerRows = $grid.$el.querySelectorAll('.body--wrapper>.vxe-table--header .vxe-header--row');
	let oldColids: string[] = [];
	headerRows.forEach((headerRow) => {
		sortable = Sortable.create(headerRow, {
			handle: '.vxe-header--column',
			forceFallback: false,
			animation: 150,
			onStart() {
				const thElements = headerRow.querySelectorAll('.vxe-header--column');
				oldColids = Array.from(thElements).map((th) => (th as HTMLElement).getAttribute('colid'));
			},
			onEnd: (sortableEvent) => {
				const targetThElem = sortableEvent.item;
				const wrapperElem = targetThElem.parentNode as HTMLElement;
				const newIndex = sortableEvent.newIndex as number;
				const oldIndex = sortableEvent.oldIndex as number;
				// 在这里处理拖动结束后的逻辑
				const oldColumn = $grid.getColumnById(oldColids[oldIndex]);
				const newColumn = $grid.getColumnById(oldColids[newIndex]);
				if (newColumn.fixed || oldColumn.fixed) {
					// 错误的移动
					const oldThElem = wrapperElem.children[oldIndex] as HTMLElement;
					if (newIndex > oldIndex) {
						wrapperElem.insertBefore(targetThElem, oldThElem);
					} else {
						wrapperElem.insertBefore(targetThElem, oldThElem ? oldThElem.nextElementSibling : oldThElem);
					}
					ElMessage({
						message: '固定列不允许拖动！',
						type: 'error',
					});
					return;
				}
				if (oldColumn.level !== newColumn.level || oldColumn.parentId !== newColumn.parentId) {
					const oldThElem = wrapperElem.children[oldIndex] as HTMLElement;
					if (newIndex > oldIndex) {
						wrapperElem.insertBefore(targetThElem, oldThElem);
					} else {
						wrapperElem.insertBefore(targetThElem, oldThElem ? oldThElem.nextElementSibling : oldThElem);
					}
					ElMessage({
						message: '不允许拖动到不同分组下！',
						type: 'error',
					});
					return;
				}
				const { collectColumn } = $grid.getTableColumn();
				const { items } = findTree(collectColumn, (column) => column.id === oldColids[oldIndex]);
				// 获取列索引 columnIndex > collectColumn
				const oldColumnIndex = findIndexOf(items, (item) => item.id === oldColids[oldIndex]);
				const newColumnIndex = findIndexOf(items, (item) => item.id === oldColids[newIndex]);
				// 移动到目标列
				const currRow = items.splice(oldColumnIndex, 1)[0];
				items.splice(newColumnIndex, 0, currRow);
				$grid.loadColumn(collectColumn).then(() => {
					if (storageConfig.value.autoStorage && storageConfig.value.enabled) saveConfig('sortable');
				});
			},
		});
	});
};
// 无表头分组表格
const columnDrop2 = () => {
	const $grid = xGrid.value;
	sortable = Sortable.create($grid.$el.querySelector('.body--wrapper>.vxe-table--header .vxe-header--row'), {
		handle: '.vxe-header--column',
		forceFallback: false,
		animation: 150,
		onEnd: (sortableEvent) => {
			const targetThElem = sortableEvent.item;
			const newIndex = sortableEvent.newIndex as number;
			const oldIndex = sortableEvent.oldIndex as number;
			//  普通表格
			const { fullColumn, tableColumn } = $grid.getTableColumn();
			const wrapperElem = targetThElem.parentNode as HTMLElement;
			const newColumn = fullColumn[newIndex];
			const oldColumn = fullColumn[oldIndex];
			if (newColumn.fixed || oldColumn.fixed) {
				// 错误的移动
				const oldThElem = wrapperElem.children[oldIndex] as HTMLElement;
				if (newIndex > oldIndex) {
					wrapperElem.insertBefore(targetThElem, oldThElem);
				} else {
					wrapperElem.insertBefore(targetThElem, oldThElem ? oldThElem.nextElementSibling : oldThElem);
				}
				ElMessage({
					message: '固定列不允许拖动！',
					type: 'error',
				});
				return;
			}
			// 获取列索引 columnIndex > fullColumn
			const oldColumnIndex = $grid.getColumnIndex(tableColumn[oldIndex]);
			const newColumnIndex = $grid.getColumnIndex(tableColumn[newIndex]);
			// 移动到目标列
			const currRow = fullColumn.splice(oldColumnIndex, 1)[0];
			fullColumn.splice(newColumnIndex, 0, currRow);
			$grid.loadColumn(fullColumn).then(() => {
				if (storageConfig.value.autoStorage && storageConfig.value.enabled) saveConfig('sortable');
			});
		},
	});
};
let initTime: any;
nextTick(() => {
	// 加载完成之后再绑定拖动事件
	initTime = setTimeout(() => {
		isColgroup.value ? columnDrop() : columnDrop2();
	}, 500);
});
onUnmounted(() => {
	clearTimeout(initTime);
	if (sortable) {
		sortable.destroy();
	}
});

/*
 * 提取表格的事件
 * */
const attrs = useAttrs();
const tableCompEvents: VxeGridEventProps = Object.keys(attrs).reduce((prev, key) => {
	if (key.startsWith('on') && typeof attrs[key] === 'function' && key !== 'onResizableChange') {
		prev[key] = attrs[key];
	}
	return prev;
}, {});
// 继承表格的events
const handleResizableChange = (params: any) => {
	try {
		if (storageConfig.value?.autoStorage === true) saveConfig('resizable');
		emit('resizableChange', params);
	} catch (error) {
		console.error('Error in handleResizableChange:', error);
	}
};

function handleFolding(bool: boolean) {
	reactData.isFolding = bool;
	const { recalculate } = xGrid.value;
	nextTick(() => {
		recalculate();
		setTimeout(() => recalculate());
	});
}
// function onHandleFolding(bool: boolean) {
// 	tableFilterRef.value!.handleFolding(bool);
// }

function handleFilterSave() {
	commitProxy('query');
}

function handleFilterSaveTemplate(data: I_User_Search_Template_Model, type: 'edit' | 'add' | 'delete') {
	saveConfig('template', { ...data, type });
}

function handleFilterReset() {
	commitProxy('reload');
}

// 保存配置到服务端
function saveConfig(type: T_Save_Config_Type = 'customize', params?: unknown) {
	const _saveSysConfig = props.proxyConfig?.saveSysConfig ? props.proxyConfig.saveSysConfig : GlobalConfig.table.proxyConfig.saveSysConfig;
	if (typeof _saveSysConfig == 'function' && storageConfig.value.enabled) {
		const { collectColumn } = xGrid.value.getTableColumn();
		const columns: T_Custom_Map[] = [];
		eachTree(collectColumn, (column) => {
			// 排除操作列
			if (!column.type && column.field !== 'jlg-operation-colum') {
				columns.push({
					...column,
					renderSortNumber: Number(column.sortNumber),
				});
			}
		});

		_saveSysConfig({
			columns,
			filterConfig: {
				items: tableFilterConfig.value?.items || [],
				template: type === 'template' ? params : null,
				templateType: type === 'template' ? (params as any).type ?? 'add' : null,
				$filter: tableFilterRef.value,
			},
			globalConfig: customStore,
			type,
		});
	}
}

// 表格刷新方法
function refresh(refreshToFirstPage = false) {
	if (refreshToFirstPage) {
		commitProxy('reload');
	} else {
		commitProxy('query');
	}
}

// 设置表单（筛选）配置
function setTableFilterConfig(config: I_Table_Filter_Props) {
	tableFilterConfig.value = clone(config, true);
}

//  重置表格列配置
function resetCustomEvent({ filter = true, global = true }: { filter?: boolean; global?: boolean }) {
	// 重置表单配置
	if (filter) {
		tableFilterConfig.value = clone(rawTableFilterConfig, true);
	}
	if (global) {
		// 重置表格全局配置
		setTableGlobalConfig({
			// 是否带有斑马纹
			stripe: false,
			// 表格的尺寸
			size: 'medium',
			// 所有的列对齐方式
			align: 'center',
		});
	}
	return xGrid.value.loadColumn(rawColumns);
}

// 加载列配置，如果有操作列配置，自动插入操作列
function saveCustomEvent(columns: (VxeTableDefines.ColumnOptions<any> | VxeTableDefines.ColumnInfo<any>)[]) {
	const leftColList = props.columns.filter((item) => !!item.type);
	const _columns = clone(leftColList.concat(columns), true);

	// 如果存在操作列配置
	if (props.operationConfig) {
		_columns.push(operationColumn.value);
	}
	return xGrid.value.loadColumn(_columns);
}

const renderCustomTemplate: T_RenderCustomTemplate = (customComponent, appContext, props) => {
	return useRenderCustomTemplate(customTemplateRef.value, appContext, customComponent, props);
};

defineExpose({
	xGrid,
	reactData,
	customStore,
	commitProxy,
	refresh,
	resetCustomEvent,
	saveCustomEvent,
	renderCustomTemplate,
	saveConfig,
	getTableFilterConfig,
	getFormElementWidth,
	setTableGlobalConfig,
	setTableFilterConfig,
	initPopoverButton,
	onClickOutside,
});
</script>
