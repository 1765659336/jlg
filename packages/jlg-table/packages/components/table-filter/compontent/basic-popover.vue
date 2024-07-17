<template>
	<el-popover
		ref="popoverRef"
		trigger="click"
		popper-class="jlg-popper--quick--search"
		:pure="true"
		:teleported="false"
		:show-arrow="false"
		:width="525"
		virtual-triggering
		:manual="true"
		v-bind="$attrs"
		@hide="props.onHide"
	>
		<div v-show="props.isShowQuickSearch" class="jlg-popover__wrapper">
			<div class="jlg-popover__title">
				<span>搜索</span>
				<el-icon size="18" style="cursor: pointer" @click="props.onHide">
					<CloseBold />
				</el-icon>
			</div>
			<div class="jlg-popover__body">
				<el-row :gutter="40">
					<el-col v-for="item in props.itemsValue" :key="item.field" :span="12" :class="item.className">
						<el-form-item :prop="item.field">
							<template #default>
								<component
									:is="renderContentTitle(item)"
									v-model="formModel[item.field]"
									:search-type="item.searchType"
									:show-label="true"
									:show-select="true"
									:item="item"
								/>
							</template>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<div class="jlg-popover__footer">
				<div></div>
				<div>
					<el-button @click="props.onHide">关闭</el-button>
					<el-button @click="props.onHandleReset">重置</el-button>
					<el-button type="primary" @click="props.onHandleSave">查询</el-button>
				</div>
			</div>
		</div>
	</el-popover>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { CloseBold } from '@element-plus/icons-vue';
import { I_Table_Filter_Item } from '../type';

defineOptions({
	name: 'PopoverComponent',
});

const props = defineProps({
	isShowQuickSearch: {
		type: Boolean,
		default: false,
	},
	itemsValue: {
		type: Array as PropType<I_Table_Filter_Item[]>,
		default: () => [],
	},
	form: {
		type: Object as PropType<Record<string, any>>,
		default: () => ({}),
	},
	/*
	 * 事件
	 * */
	onHide: {
		type: Function,
		default: () => {},
	},
	renderContentTitle: {
		type: Function,
		default: () => {},
	},
	onHandleReset: {
		type: Function,
		default: () => {},
	},
	onHandleSave: {
		type: Function,
		default: () => {},
	},
});
const formModel = defineModel('form', { required: true, type: Object });
</script>
