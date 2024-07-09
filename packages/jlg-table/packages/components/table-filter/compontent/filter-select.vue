<template>
	<div class="jlg-filter-wrap filter-select">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content" :class="{ 'is-search-type': isShowSelect && item.props?.multiple === true }">
			<el-select-v2
				v-bind="props.item.props"
				v-model="modelValue"
				clearable
				class="select"
				filterable
				collapse-tags
				:placeholder="'请选择' + props.item.title"
				@focus="isFocus = true"
				@blur="isFocus = false"
			>
			</el-select-v2>
			<template v-if="isShowSelect">
				<el-select v-model="searchType" size="default" class="slot-select" :class="{ 'is-focus': isFocus }" placeholder="">
					<el-option v-for="searchItem in SEARCH_TYPES.select" :key="searchItem.value" :label="searchItem.label" :value="searchItem.value" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElSelectV2, ElSelect, ElOption } from 'element-plus';
import { I_Table_Filter_Item } from '../type';
import { SEARCH_TYPES } from '../constants';

defineOptions({
	name: 'FilterSelect',
});
const modelValue = defineModel<string>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean; showSelect: boolean }>(), {
	showLabel: false,
	showSelect: false,
});
const searchType = defineModel<number>('searchType', { required: true, default: 0 });
const isShowSelect = computed(() => props.item.isPure !== true && props.showSelect === true);
const isFocus = ref(false);
</script>

<style scoped lang="scss">
@import url('../../../../styles/filter-item-wrap.scss');
</style>
