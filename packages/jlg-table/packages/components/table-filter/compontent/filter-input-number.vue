<template>
	<div class="jlg-filter-wrap filter-input-number">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content" :class="{ 'is-search-type': isShowSelect }">
			<el-input-number
				v-model="modelValue"
				:placeholder="'请输入' + props.item.title"
				size="default"
				controls-position="right"
				@focus="isFocus = true"
				@blur="isFocus = false"
				@mousewheel.prevent
			>
			</el-input-number>
			<template v-if="isShowSelect">
				<el-select v-model="searchType" size="default" class="slot-select" :class="{ 'is-focus': isFocus }" placeholder="">
					<el-option v-for="searchItem in SEARCH_TYPES.number" :key="searchItem.value" :label="searchItem.label" :value="searchItem.value" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElInputNumber, ElSelect, ElOption } from 'element-plus';
import { I_Table_Filter_Item } from '../type';
import { SEARCH_TYPES } from '../constants';

defineOptions({
	name: 'FilterInputNumber',
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
