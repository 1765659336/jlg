<template>
	<div class="file-select-list">
		<div class="select-top">
			<span class="title" :class="{ 'is-active': !fileType && fileType !== 0 }" @click="selectType(null)">全部</span>
			<ArrowDown class="icon" />
		</div>
		<div class="select-content">
			<div
				v-for="(item, index) in props.types"
				:key="index"
				class="option-item"
				:class="{ 'is-active': item.value === fileType }"
				@click="selectType(item.value)"
			>
				<span class="option-index">{{ item.value }}</span>
				<el-tooltip :content="item.text" placement="top" :disabled="isShowTooltip">
					<span class="option-text" @mouseover="($event) => visibleTooltip($event, item.text)">{{ item.text }}</span>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'FileTypeList',
});
</script>
<script lang="ts" setup>
import { ElTooltip } from 'element-plus';
import { isFunction } from 'lodash-unified';
import { PropType, ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';

const fileType = ref<number | null>();

const props = defineProps({
	showAside: {
		type: Boolean,
		default: true,
	},
	typeKey: {
		type: String,
		default: 'type',
	},
	types: {
		type: Array as PropType<Array<{ value: number; text: string }>>,
		default: () => {
			return [];
		},
	},
	onAsideClick: {
		type: Function,
		default: () => {},
	},
});

const selectType = async (type: number | null) => {
	let hookResult = true;
	if (props.onAsideClick && isFunction(props.onAsideClick)) {
		try {
			hookResult = await props.onAsideClick(type, JSON.parse(JSON.stringify(props.types)));
		} catch {
			hookResult = false;
		}
	}
	if (hookResult === false) {
		return;
	}
	fileType.value = type;
};

const isShowTooltip = ref(false);
function visibleTooltip(event, labelText) {
	if (!labelText) {
		isShowTooltip.value = true;
		return;
	}
	const { offsetWidth, scrollWidth } = event.target as HTMLElement;
	isShowTooltip.value = offsetWidth >= scrollWidth;
}

// 暴露属性
defineExpose({
	fileType,
});
</script>
<style lang="scss">
@import '../styles/file-type-list.scss';
</style>
