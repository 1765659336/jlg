<template>
	<el-radio-group
		ref="_ref"
		:model-value="props.modelValue"
		v-bind="mergeRadioGroupPropsComputed"
		@update:model-value="
			(v) => {
				emits('update:modelValue', v);
			}
		"
	>
		<template v-for="name in slotsComputed" #[name]>
			<slot :name="name" />
		</template>
		<slot>
			<jlg-radio v-for="(option, index) in mergeRadioGroupPropsComputed.radioOptions" :key="index" v-bind="option" />
		</slot>
	</el-radio-group>
</template>

<script setup lang="ts">
import { globalComponentConfig } from '../index';
import { T_Jlg_RadioGroup_Props, I_Jlg_RadioGroup_Emits } from './type';
import JlgRadio from '../radio/index.vue';
import { E_JlgForm_FormType, T_Add_Gather_Fn } from '../form/type';
import { FormItemContext, formItemContextKey, RadioInstance, ElRadioGroup } from 'element-plus';
import { T_Jlg_Radio_Props } from '../radio/type';

defineOptions({
	name: 'JlgRadioGroup',
});

const props = withDefaults(defineProps<T_Jlg_RadioGroup_Props>(), {
	validateEvent: true,
});

const attrs = useAttrs();

const emits = defineEmits<I_Jlg_RadioGroup_Emits>();

const slots = useSlots();

const slotsComputed = computed(() => {
	return Object.keys(slots).filter((name) => name !== 'default');
});

const _ref = ref(null);

const valueText = ref<T_Jlg_Radio_Props['value']>();

const mergeRadioGroupPropsComputed = computed(() => {
	return {
		...globalComponentConfig.radioGroup,
		...props,
		...attrs,
	};
});

const context: FormItemContext | undefined = inject(formItemContextKey);

const formAddGatherFn: T_Add_Gather_Fn | undefined = inject('formAddGatherFn');

onMounted(() => {
	formAddGatherFn &&
		formAddGatherFn({
			formItemLabel: context.label,
			fn() {
				return {
					label: context.label ?? '',
					key: context.prop ?? '',
					value: valueText.value,
					type: E_JlgForm_FormType.单选框,
					...(mergeRadioGroupPropsComputed.value.gatherProps ?? {}),
				};
			},
		});
});

const radioRefSet: Ref<Set<RadioInstance>> = ref(new Set());
provide('radioRefSet', radioRefSet);

watch(
	() => [radioRefSet, props.modelValue],
	(newValue) => {
		radioRefSet.value.forEach((i) => {
			i.value === newValue[1] && (valueText.value = i.label);
		});
	},
	{
		deep: true,
		immediate: true,
	}
);

defineExpose({ _ref });
</script>

<style scoped lang="scss"></style>
