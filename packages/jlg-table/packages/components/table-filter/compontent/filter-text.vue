<template>
	<div class="jlg-filter-wrap filter-text">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content" :class="{ 'is-search-type': isShowSelect }">
			<el-input
				v-model.trim="modelValue"
				:placeholder="'请输入' + props.item.title"
				clearable
				size="default"
				@focus="isFocus = true"
				@blur="isFocus = false"
			>
			</el-input>
			<template v-if="isShowSelect">
				<el-select v-model="searchType" size="default" class="slot-select" :class="{ 'is-focus': isFocus }" placeholder="">
					<el-option label="精确" :value="0" />
					<el-option label="模糊" :value="1" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElInput, ElSelect, ElOption } from 'element-plus';
import { I_Table_Filter_Item } from '../type';

defineOptions({
	name: 'FilterText',
});
const modelValue = defineModel<string>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean; showSelect: boolean }>(), {
	showLabel: false,
	showSelect: false,
});
// 文本默认模糊搜索
const searchType = defineModel<number>('searchType', { required: true, default: 1 });
const isShowSelect = computed(() => props.item.isPure !== true && props.showSelect === true);
const isFocus = ref(false);
</script>
