<template>
	<el-form>
		<jlg-flex-layout :col="8" gap="50px">
			<jlg-flex-cell :col="8">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
			<jlg-flex-cell :col="2">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
			<jlg-flex-cell :col="3">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
			<jlg-flex-cell :col="2">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
			<jlg-flex-cell :col="2">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
			<jlg-flex-cell :col="2">
				<el-form-item>
					<el-input></el-input>
				</el-form-item>
			</jlg-flex-cell>
		</jlg-flex-layout>
	</el-form>
</template>

<script setup lang="ts">
import JlgFlexLayout from '../../../packages/flex-layout/index.vue';
import JlgFlexCell from '../../../packages/flex-cell/index.vue';
import { ElFormItem, ElInput } from 'element-plus';

defineOptions({
	name: 'FlexLayoutDemo',
});
</script>

<style scoped lang="scss"></style>
