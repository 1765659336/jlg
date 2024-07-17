<template>
	<div>
		<jlg-form
			ref="JlgFormRef"
			:label-position="E_JlgForm_LabelPosition['内嵌']"
			label-width="100px"
			:gather-props="{ col: 3, allCol: 6 }"
			:model="modalFormData"
		>
			<jlg-collapse ref="CollapseRef" :model-value="[1, 2, 3]" :border="false">
				<jlg-collapse-item :name="1" title="基本信息">
					<jlg-flex-layout v-bind="flexLayoutProps">
						<jlg-flex-cell :col="1">
							<jlg-form-item label="通用名" prop="proName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="商品名" prop="goodsName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="剂型" prop="proDrug">
								<jlg-input v-model="modalFormData.proDrug" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="规格" prop="proSpec">
								<jlg-input v-model="modalFormData.proSpec" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="生产企业" prop="productUid">
								<jlg-input v-model="modalFormData.productUid" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="上市许可持有人" prop="maketHolderName">
								<jlg-input v-model="modalFormData.maketHolderName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="批准文号" prop="approvalNo">
								<jlg-input v-model="modalFormData.approvalNo" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
					</jlg-flex-layout>
				</jlg-collapse-item>
				<jlg-collapse-item :name="2" title="准入信息">
					<jlg-flex-layout v-bind="flexLayoutProps">
						<jlg-flex-cell :col="1">
							<jlg-form-item label="是否采集" prop="proName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="采集类型" prop="proName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
						<jlg-flex-cell :col="1">
							<jlg-form-item label="是否一致性" prop="proName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
					</jlg-flex-layout>
				</jlg-collapse-item>
				<jlg-collapse-item :name="3" title="编码管理">
					<jlg-flex-layout v-bind="flexLayoutProps">
						<jlg-flex-cell :col="1">
							<jlg-form-item label="药品统一码" prop="proName">
								<jlg-input v-model="modalFormData.proName" :disabled="isDisabled"></jlg-input>
							</jlg-form-item>
						</jlg-flex-cell>
					</jlg-flex-layout>
				</jlg-collapse-item>
			</jlg-collapse>
		</jlg-form>
	</div>
</template>

<script setup>
import { JlgCollapse, JlgCollapseItem, JlgFlexLayout, JlgFlexCell } from 'jlg-ui';
// import JlgCollapseItem from 'D:/jlgProject/monorepo-component-plus/packages/jlg-ui/packages/collapse-item/index.vue';
// import JlgCollapse from 'D:/jlgProject/monorepo-component-plus/packages/jlg-ui/packages/collapse/index.vue';

import { ref } from 'vue';
import { E_JlgForm_LabelPosition } from '@pac/form/type';

defineOptions({
	name: 'UseColls',
});

const isDisabled = ref(true);

const modalFormData = ref({
	proName: '哈哈哈哈哈哈',
});
</script>

<style scoped lang="scss"></style>
