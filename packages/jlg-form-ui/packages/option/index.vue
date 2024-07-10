<template>
	<el-option ref="_ref" v-bind="mergeOptionPropsComputed">
		<template v-for="(index, name) in slots" #[name]>
			<slot :name="name" />
		</template>
	</el-option>
</template>

<script setup lang="ts">
import { ElOption } from 'element-plus';
import { globalComponentConfig } from '../index';
import { I_Jlg_Option_Props } from './type';

defineOptions({
	name: 'JlgOption',
});

const props = withDefaults(defineProps<I_Jlg_Option_Props>(), {});

const attrs = useAttrs();

const slots = useSlots();

const _ref = ref(null);

const mergeOptionPropsComputed = computed(() => {
	return {
		...globalComponentConfig.option,
		...props,
		...attrs,
	};
});

defineExpose({
	_ref,
});
</script>

<style scoped></style>
