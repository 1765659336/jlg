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
			<template v-if="isShowSelect && item.props?.multiple === true">
				<el-select v-model="searchType" size="default" class="slot-select" :class="{ 'is-focus': isFocus }" placeholder="">
					<el-option label="包含" :value="0" />
					<el-option label="不包含" :value="1" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { I_Table_Filter_Item } from '../type';

defineOptions({
	name: 'FilterSelect',
});
const modelValue = defineModel<string>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean }>(), {
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
