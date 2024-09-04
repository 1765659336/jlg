<template>
	<table-grid ref="jlgGrid" class="table-grid--wrapper" v-bind="gridOptions" v-on="gridEvent" @checkbox-change="checkboxChange">
		<template #toolbar_buttons>
			<vxe-button @click="handleAdd">新增</vxe-button>
			<vxe-button @click="handleDelete">删除</vxe-button>
			<vxe-button @click="handleDelete2">删除2</vxe-button>
			<vxe-button>保存</vxe-button>
			<vxe-button @click="handleExport">导出</vxe-button>
		</template>
		<template #toolbar_tools>
			<!--			<el-button type="primary" @click="resetCustomEvent">恢复默认</el-button>-->
			<el-button ref="buttonRef" type="primary" text size="small"
				>高级筛选<el-icon style="padding-left: 5px"><ArrowDown /></el-icon
			></el-button>
			<el-button :icon="Refresh" circle @click="tableRefresh" />
			<el-button :icon="Setting" circle @click="openSetting"></el-button>
		</template>
		<template #default_sleepDuration>
			<img width="50" src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" alt=""
		/></template>
		<template #gaugeDate>
			<el-tag type="primary">Tag 1</el-tag>
		</template>
		<!--   组件内置操作列插槽（default_handle_operation 不可变） -->
		<template #default_handle_operation="{ row }">
			<vxe-button @click="handleEdit(row)">编辑</vxe-button>
		</template>
	</table-grid>
</template>

<script setup lang="ts">
import TableGrid from '@pac/components/table-base/index.vue';
import { Component, onMounted, reactive, ref, defineAsyncComponent } from 'vue';
import { I_Table_Grid_Props } from '@pac/components/table-base/type';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { VxeGridListeners, VxeGridPropTypes } from 'vxe-table';
import { VxeGridDefines } from 'vxe-table/types/grid';
import { useGetSysConfig, useSaveSysConfig } from '@/hooks/useMock';
import { Refresh, Setting, ArrowDown } from '@element-plus/icons-vue';
import { useTableComponent } from '../hooks/useTable';
import { useDynamicModal } from '@pac/components/modal';
// import BaseModal from '../../modal/BaseModal.vue';

defineOptions({
	name: 'TableFilterBaseUse',
});
const TableGridComponent: Component = TableGrid;
console.log('TableGrid', TableGridComponent);

const { currentInstance, jlgGrid, buttonRef, tableRefresh, openSetting } = useTableComponent<RowVO>();

const options = ref<ListItem[]>([]);
const loading = ref(false);
const remoteMethod = (query: string) => {
	if (query !== '') {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
			options.value = list.filter((item) => {
				return item.label.toLowerCase().includes(query.toLowerCase());
			});
		}, 200);
	} else {
		options.value = [];
	}
};

const data = [
	{
		value: '1',
		label: 'Level one 1',
		children: [
			{
				value: '1-1',
				label: 'Level two 1-1',
				children: [
					{
						value: '1-1-1',
						label: 'Level three 1-1-1',
					},
				],
			},
		],
	},
	{
		value: '2',
		label: 'Level one 2',
		children: [
			{
				value: '2-1',
				label: 'Level two 2-1',
				children: [
					{
						value: '2-1-1',
						label: 'Level three 2-1-1',
					},
				],
			},
			{
				value: '2-2',
				label: 'Level two 2-2',
				children: [
					{
						value: '2-2-1',
						label: 'Level three 2-2-1',
					},
				],
			},
		],
	},
	{
		value: '3',
		label: 'Level one 3',
		children: [
			{
				value: '3-1',
				label: 'Level two 3-1',
				children: [
					{
						value: '3-1-1',
						label: 'Level three 3-1-1',
					},
				],
			},
			{
				value: '3-2',
				label: 'Level two 3-2',
				children: [
					{
						value: '3-2-1',
						label: 'Level three 3-2-1',
					},
				],
			},
		],
	},
];

const selectOptions = ref([]);

const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];
const list = states.map((item): ListItem => {
	return { value: `value:${item}`, label: `label:${item}` };
});

interface ListItem {
	value: string;
	label: string;
}

const schoolOptions = ref([{ data: { vals: [], sVal: '', fMenu: '', f1Type: '', f1Val: '', fMode: 'and', f2Type: '', f2Val: '' } }]);

onMounted(() => {
	/// 模拟异步请求
	setTimeout(() => {
		selectOptions.value = [
			{ label: '选项1', value: 1 },
			{ label: '选项2', value: 2 },
			{ label: '选项3', value: 3 },
		];
	}, 2000);
});

interface RowVO {
	id: number;
	name: string;
	nickname: string;
	role: string;
	sex: string;
	age: number;
	address: string;
	// 生日
	birthday: string;
	// 身高
	height: number;
	// 体重
	weight: number;
	// 体脂率
	bodyFatRate: number;
	// 体型
	bodyShape: string;
	// 体质指数
	bmi: number;
	// 肺活量
	lungCapacity: number;
	// 血压
	bloodPressure: string;
	// 心率
	heartRate: number;
	// 血氧
	bloodOxygen: number;
	// 体温
	bodyTemperature: number;
	// 睡眠时长
	sleepDuration: number;
}
const gridEvent: VxeGridListeners<RowVO> = {
	proxyQuery() {
		console.log('数据代理查询事件');
	},
	proxyDelete() {
		console.log('数据代理删除事件');
	},
	proxySave() {
		console.log('数据代理保存事件');
	},
};

const gridOptions = reactive<I_Table_Grid_Props<RowVO>>({
	id: currentInstance.type.name,
	border: true,
	height: 'auto',
	align: null,
	columns: [
		{ type: 'checkbox', width: 50, fixed: 'left' },
		{ type: 'seq', width: 60, fixed: 'left' },
		{
			title: '基本信息',
			colId: 'baseInfo',
			children: [
				{ field: 'name', title: 'Name', width: 100 },
				{
					title: '其他信息',
					colId: 'additionalInfo',
					children: [
						{ field: 'nickname', title: 'Nickname', width: 100, slots: { default: 'default_sleepDuration' } },
						{ field: 'age', title: 'Age', sortable: true, width: 100 },
					],
				},
				{
					field: 'sex',
					title: '性别',
					sortable: true,
					width: 100,
					formatter(params) {
						return params.cellValue === 1 ? '男' : '女';
					},
				},
			],
		},
		{
			title: '自定义信息',
			colId: 'customInfo',
			children: [
				{ field: 'role', title: '角色', width: 100, slots: { default: 'default_sleepDuration' } },
				{
					field: 'gaugeDate11',
					title: '自定义插槽',
					width: 100,
					slots: { default: 'gaugeDate' },
				},
				{
					field: 'inductionDate22',
					title: '自定义插槽22',
					width: 150,
					slots: { default: 'gaugeDate' },
				},
			],
		},
		{
			field: 'status',
			title: '状态',
			width: 100,
		},
		{
			field: 'dep',
			title: '应聘部门22',
			showOverflow: false,
			width: 120,
		},
		{
			field: 'post',
			title: '应聘岗位',
			width: 140,
		},
		{
			field: 'school',
			title: '毕业院校',
			width: 160,
			filters: schoolOptions,
			filterRender: { name: 'FilterExtend' },
		},
		{
			field: 'specialty',
			title: '专业',
			width: 160,
		},
		{
			field: 'phone',
			title: '联系方式',
			width: 120,
		},
		{
			field: 'gaugeDate',
			title: '预计入职时间',
			width: 200,
		},
		{
			field: 'inductionDate',
			title: '入职时间333',
			width: 200,
		},
		// {
		// 	field: 'inductionDate2',
		// 	title: '入职时间2',
		// 	width: 200,
		// },
	],
	rowConfig: {
		keyField: 'id',
	},
	checkboxConfig: {
		reserve: true,
	},
	proxyConfig: {
		seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
		message: true, // 启用消息提示代理
		props: {
			// 响应结果中获取数据列表的属性(无分页时启用)
			list: 'data.content.item1',
			// 只对 pager-config 配置了有效，响应结果中获取数据列表的属性
			result: 'data.content.item1',
			// 只对 pager-config 配置了有效，响应结果中获取分页的属性
			total: 'data.content.item2',
		},
		ajax: {
			// 查询方法，可以通过 proxy-config.props 配置读取响应结构的字段；接收 Promise
			query: (params) => {
				return mockGetPageList(params);
			},
			// 删除方法，提交的参数 { removeRecords }
			delete: ({ body }) => {
				console.log('body', body.removeRecords);
				return new Promise((resolve) => {
					/// 模拟删除
					setTimeout(() => {
						body.removeRecords.forEach((record) => {
							console.log('record', record);
							jlgGrid.value?.commitProxy('remove', false);
							resolve({ message: 'success' });
						});
					}, 100);
				});
			},
		},
		/// 获取远程配置
		getSysConfig: useGetSysConfig,
		// 保存配置
		saveSysConfig: useSaveSysConfig,
	},
	toolbarConfig: {
		slots: {
			buttons: 'toolbar_buttons',
			tools: 'toolbar_tools',
		},
	},
	pagerConfig: {
		enabled: true,
		pageSize: 60,
	},
	// 筛选条件配置
	tableFilterConfig: {
		titleAlign: 'right',
		folding: true,
		items: [
			{
				field: 'text',
				title: '文本',
				type: 'text',
				searchType: 1,
				defaultValue: '555',
				quickSearch: true,
				isPure: false,
				visible: true,
			},
			{
				field: 'number',
				title: '数字',
				type: 'number',
				searchType: 0,
				defaultValue: 999,
				quickSearch: true,
				isPure: false,
			},
			{
				field: 'remoteSelect',
				title: '远程检索远程检索111',
				type: 'select',
				searchType: 0,
				defaultValue: ['value:California'],
				titleOverflow: 'ellipsis',
				quickSearch: true,
				isPure: false,
				props: {
					multiple: true,
					remote: true,
					options: options,
					remoteMethod: remoteMethod,
				},
			},
			{
				field: 'select',
				title: '选择',
				type: 'select',
				searchType: 0,
				visible: true,
				quickSearch: true,
				defaultValue: 1,
				isPure: false,
				props: {
					multiple: false,
					options: selectOptions,
				},
			},
			{
				field: 'time',
				title: '时间',
				type: 'time',
				defaultValue: '2024-04-25T05:39:51.000Z',
				searchType: 0,
				quickSearch: true,
				isPure: true,
			},
			{
				field: 'timeSlot',
				title: '时间段',
				type: 'time',
				searchType: 0,
				quickSearch: false,
				isPure: true,
				props: {
					isRange: true,
				},
			},
			{
				field: 'datetimeRange',
				title: '日期和时间范围',
				type: 'date',
				searchType: 0,
				quickSearch: false,
				isPure: true,
				props: {
					type: 'daterange',
					'unlink-panels': false,
				},
			},
			{
				field: 'date',
				title: '日期',
				type: 'date',
				searchType: 0,
				quickSearch: false,
				isPure: true,
			},
			{
				field: 'independentDate',
				title: '独立日期',
				type: 'independentDate',
				defaultValue: ['2023-09-01', '2023-09-30'],
				searchType: 0,
				quickSearch: true,
				isPure: true,
			},
			{
				field: 'treeSelect',
				title: '树形下拉',
				type: 'treeSelect',
				searchType: 0,
				quickSearch: false,
				isPure: true,
				props: {
					data: data,
				},
			},
		],
		isBtnOrTemplate: true,
	},
	// 操作列配置
	operationConfig: {
		width: 80,
		title: '操作列',
	},
	// 存储配置
	storageConfig: {
		enabled: true,
		autoStorage: true,
	},
	exportConfig: {
		getExportConfig: () => {
			return new Promise((resolve) => {
				resolve([
					{
						dynamicPageColUid: '1',
						displayName: 'ID',
						dbFieldName: 'id',
						dbFieldType: 6,
						isExportCol: 1,
					},
					{
						dynamicPageColUid: '2',
						displayName: '姓名',
						dbFieldName: 'name',
						dbFieldType: 1,
						isExportCol: 1,
					},
					{
						dynamicPageColUid: '3',
						displayName: '昵称',
						dbFieldName: 'nickname',
						dbFieldType: 1,
						isExportCol: 1,
					},
					{
						dynamicPageColUid: '4',
						displayName: '角色',
						dbFieldName: 'role',
						dbFieldType: 6,
						isExportCol: 0,
					},
					{
						dynamicPageColUid: '5',
						displayName: '性别',
						dbFieldName: 'sex',
						dbFieldType: 1,
						isExportCol: 1,
					},
				]);
			});
		},
		saveExportConfig: ({ data, $export }) => {
			console.log('data', data);
			console.log('$export', $export);
		},
	},
});
// 模拟分页接口
const mockGetPageList = (params: VxeGridPropTypes.ProxyAjaxQueryParams<RowVO>) => {
	const { page, sort, sorts, filters, form } = params;
	console.log('page', page);
	console.log('sort', sort);
	console.log('sorts', sorts);
	console.log('filters', filters);
	console.log('form', form);
	// 发送 POST 请求
	return axios({
		method: 'post',
		url: 'http://10.1.2.9:10023/BUS000012/EntryManage/GetEntryManegeToPage',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic Qd0y/cHYdU+yGHci8vBTng',
		},
		data: {
			pageIndex: page.currentPage,
			pageSize: page.pageSize,
			sorts,
			...form,
		},
	});
};

const { openModal } = useDynamicModal();
function handleEdit(row: RowVO) {
	console.log(row);
	const BaseModal = defineAsyncComponent(() => import('../../modal/BaseModal.vue'));
	openModal({
		// component: BaseModal,
		component: BaseModal,
		modalOptions: {
			id: 'BaseModal',
			size: 'mini',
			status: 'error',
			iconStatus: 'error',
			className: 'error',
			title: '测试命令式动态弹窗Demo',
			// cancelButtonText: '取消',
			confirmButtonText: '完成',
			// 是否锁住页面，不允许窗口之外的任何操作
			lockView: true,
			// 是否锁住滚动条，不允许页面滚动
			lockScroll: true,
			mask: true,
			// 是否允许点击遮罩层关闭窗口
			maskClosable: true,
			// 是否允许按 Esc 键关闭窗口
			escClosable: true,
			// 是否允许窗口边缘拖动调整窗口大小
			resize: true,
			showShrink: true,
			showCustom: true,
			showHide: true,
			showHeader: true,
			showFooter: true,
			// 标题是否标显示最大化与还原按钮
			showZoom: true,
			// 是否显示关闭按钮
			showClose: true,
			// 是否允许通过双击头部放大或还原窗口
			dblclickZoom: true,
			// 是否启用窗口拖动
			draggable: true,
			width: 800,
			height: 400,
			minWidth: 200,
			minHeight: 200,
			// 自定义堆叠顺序（对于某些特殊场景，比如被遮挡时可能会用到）
			zIndex: 99,
			// 只对 resize 启用后有效，用于设置可拖动界限范围，如果为负数则允许拖动超出屏幕边界,默认0
			marginSize: 0,
			// 窗口打开时自动最大化显示
			fullscreen: false,
			transfer: true,
			// 设置标题内容过长时显示为省略号
			showTitleOverflow: true,
			// 在窗口隐藏之前执行，可以返回 Error 阻止关闭，支持异步
			beforeHideMethod: ({ type }) => {
				console.log(`在窗口隐藏之前执行，可以返回 Error 阻止关闭，支持异步,type:${type}`);
				// return Error('阻止关闭');
				// return Promise.resolve(Error('阻止关闭'));
			},
			onHide: () => {
				console.log('onHide 1');
			},
			onClose: () => {
				console.log('onClose 1');
			},
			onShow: () => {
				console.log('onShow 1');
			},
			onZoom: () => {
				console.log('onZoom 1');
			},
			onCancel: (data) => {
				console.log('onCancel 1', data);
			},
			onConfirm: (data) => {
				console.log('onConfirm 1', data);
			},
			slots: {},
		},
		props: {
			text: '这是传递的文本',
		},
	});
}

// function handleFlushed() {
// 	jlgGrid.value?.refresh(false);
// }

// function resetCustomEvent() {
// 	jlgGrid.value?.resetCustomEvent();
// }

// 新增
function handleAdd() {
	jlgGrid.value?.commitProxy('insert', false, {});
}

// 前端删除
function handleDelete() {
	jlgGrid.value?.commitProxy('remove', () => {
		const selectRecords = jlgGrid.value?.xGrid.getCheckboxRecords();
		if (selectRecords.length > 3) {
			ElMessage({
				message: '一次最多只能删除3条数据!',
				type: 'warning',
			});
			return false;
		}
		return true;
	});
}

// 后端删除
function handleDelete2() {
	jlgGrid.value?.commitProxy('delete', true);
}
const handleExport = () => {
	jlgGrid.value?.$export.openExportPanel();
};
// const zoomEvent = () => {
// 	const $grid = jlgGrid.value?.xGrid;
// 	if ($grid) {
// 		$grid.zoom();
// 	}
// };

function checkboxChange(data: VxeGridDefines.CheckboxChangeEventParams) {
	console.log('checkboxChange', data.checked);
}
</script>

<style scoped lang="scss">
.table-grid--wrapper {
	width: 100%;
	height: calc(100vh - 120px);
}
</style>
