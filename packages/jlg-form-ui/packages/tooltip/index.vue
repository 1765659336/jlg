<template>
	<el-tooltip v-bind="mergeTooltipPropsComputed" :trigger-keys="[]">
		<template v-for="(index, name) in slots" #[name]>
			<slot :name="name" />
		</template>
	</el-tooltip>
</template>

<script setup lang="ts">
import { globalComponentConfig } from '../index';
import { T_Jlg_Tooltip_Props } from './type';
import { ElTooltip } from 'element-plus';

defineOptions({
	name: 'JlgTooltip',
});

const props = withDefaults(defineProps<T_Jlg_Tooltip_Props>(), {});

const attrs = useAttrs();

const slots = useSlots();

const mergeTooltipPropsComputed = computed(() => {
	return {
		...globalComponentConfig.tooltip,
		...props,
		...attrs,
	};
});
</script>

<style scoped></style>
