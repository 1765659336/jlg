<template>
	<el-collapse ref="_ref" v-bind="mergeCollapsePropsComputed" :class="mergeCollapsePropsComputed.border ? '' : 'is-disable-border'">
		<template v-for="(_index, name) in slots" #[name]>
			<slot :name="name" />
		</template>
	</el-collapse>
</template>

<script setup lang="ts">
import { T_Jlg_CollapseItem_Props } from '../collapse-item/type';
import { T_Add_Collapse_Item, T_Jlg_Collapse_Props } from './type';
import { ElCollapse } from 'element-plus';

defineOptions({
	name: 'JlgCollapse',
});

const props = withDefaults(defineProps<T_Jlg_Collapse_Props>(), {
	border: true,
	accordion: false,
});

const attrs = useAttrs();

const slots = useSlots();

const mergeCollapsePropsComputed = computed(() => {
	return {
		...props,
		...attrs,
	};
});

const _ref = ref(null);

const collapseKey = '_' + Date.now();

provide('collapseKey', collapseKey);

const jumpAnchor = (name: T_Jlg_CollapseItem_Props['name']) => {
	document.querySelector('#' + collapseKey + name)?.scrollIntoView({
		behavior: 'smooth',
	});
};

const collapseItems: Set<T_Jlg_CollapseItem_Props> = new Set();

const addCollapseItem: T_Add_Collapse_Item = (value) => {
	collapseItems.add(value);
};

provide('addCollapseItem', addCollapseItem);

provide('collapseBorder', mergeCollapsePropsComputed.value.border);

defineExpose({
	_ref,
	jumpAnchor,
	collapseItems: computed(() => {
		return Array.from(collapseItems);
	}),
});
</script>

<style scoped lang="scss">
.is-disable-border {
	border: none;
}
</style>
