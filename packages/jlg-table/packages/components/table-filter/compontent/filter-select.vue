<template>
	<div class="jlg-filter-wrap filter-select">
		<div v-show="props.showLabel" class="jlg-filter-label">{{ props.item.title }}</div>
		<div class="jlg-filter-content" :class="{ 'is-search-type': isShowSelect && item.props?.multiple === true }">
			<el-select-v2
				v-bind="props.item.props"
				v-model="modelValue"
				:options="props.item.props?.options ?? []"
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
				<el-select
					v-model="searchType"
					size="default"
					class="slot-select"
					:class="{ 'is-focus': isFocus }"
					placeholder=""
					@change="handleSelectChange"
				>
					<el-option v-for="searchItem in SEARCH_TYPES.select" :key="searchItem.value" :label="searchItem.label" :value="searchItem.value" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Ref, watch } from 'vue';
import { ElSelectV2, ElSelect, ElOption } from 'element-plus';
import { I_Table_Filter_Item } from '../type';
import { SEARCH_TYPES } from '../../../constants';
import { FIlTER_ITEMS_INJECTION_KEY, injectStrict } from '../../../constants/injection-key';

defineOptions({
	name: 'FilterSelect',
});
const modelValue = defineModel<string>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean; showSelect: boolean }>(), {
	showLabel: false,
	showSelect: false,
});
const searchType = ref(props.item.searchType ?? 0);
const isShowSelect = computed(() => props.item.isPure !== true && props.showSelect === true);
const isFocus = ref(false);

const tableFilterItems = injectStrict<Ref<I_Table_Filter_Item[]>>(FIlTER_ITEMS_INJECTION_KEY);
watch(
	() => props.item.searchType,
	(val) => {
		searchType.value = val;
	},
	{ immediate: true }
);
const handleSelectChange = (value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
	tableFilterItems.value.forEach((item) => {
		if (item.field === props.item.field) {
			item.searchType = value;
		}
	});
};
</script>
