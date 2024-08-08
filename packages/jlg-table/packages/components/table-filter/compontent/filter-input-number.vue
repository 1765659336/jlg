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
				@keyup.enter="handleEnter"
			>
			</el-input-number>
			<template v-if="isShowSelect">
				<el-select
					v-model="searchType"
					size="default"
					class="slot-select"
					:class="{ 'is-focus': isFocus }"
					placeholder=""
					@change="handleSelectChange"
				>
					<el-option v-for="searchItem in SEARCH_TYPES.number" :key="searchItem.value" :label="searchItem.label" :value="searchItem.value" />
				</el-select>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ElInputNumber, ElSelect, ElOption } from 'element-plus';
import { I_Table_Filter_Item } from '../type';
import { SEARCH_TYPES } from '../../../constants';
import { FIlTER_ITEMS_INJECTION_KEY, injectStrict } from '../../../constants/injection-key';
import { Ref, watch } from 'vue';

defineOptions({
	name: 'FilterInputNumber',
});
const modelValue = defineModel<number>({ required: true });
const props = withDefaults(defineProps<{ item: I_Table_Filter_Item; showLabel: boolean; showSelect: boolean; onEnter?: () => void }>(), {
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
const handleEnter = () => {
	if (props.onEnter) {
		props.onEnter();
	}
};
</script>
