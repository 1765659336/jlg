<template>
	<div class="jlg-basic_template">
		<el-scrollbar class="left-options">
			<ul class="ul-wrap">
				<li
					v-for="item in loadTemplateList"
					:key="item.templateUid"
					class="option"
					:class="[
						{ 'is-active': !!props.currentTemplateDetails && item.templateUid === props.currentTemplateDetails.templateUid },
						{ 'is-default': item.isDefault },
					]"
					@click.stop="handleOptionClick(item)"
				>
					<span>{{ item.templateName }}</span>
				</li>
				<li class="option">
					<div class="handle" @click="handleOptionClick(null)">
						<el-icon size="16"><CirclePlus /></el-icon>
						<span>新增方案</span>
					</div>
				</li>
			</ul>
		</el-scrollbar>
		<div class="right-current_template">
			<slot name="panel"></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { I_User_Search_Template_Model } from '../type';
import { CirclePlus } from '@element-plus/icons-vue';
import { ElScrollbar } from 'element-plus';

defineOptions({
	name: 'BasicTemplate',
});
const props = defineProps<{
	loadTemplateList: I_User_Search_Template_Model[];
	currentTemplateDetails: I_User_Search_Template_Model;
}>();
const emit = defineEmits(['optionClick']);

function handleOptionClick(item: I_User_Search_Template_Model) {
	if (item.templateUid === props?.currentTemplateDetails?.templateUid) return;
	emit('optionClick', item);
}

const isShow = ref(false);
watch(
	() => props.currentTemplateDetails?.templateUid,
	(value) => {
		isShow.value = !!value;
	},
	{
		immediate: true,
	}
);
const show = (val = true) => {
	isShow.value = val;
};
defineExpose({
	show,
	isShow,
});
</script>
