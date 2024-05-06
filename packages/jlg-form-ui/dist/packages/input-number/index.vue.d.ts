import { T_Jlg_InputNumber_Props } from './type';

declare const _default: import('vue').DefineComponent<
	__VLS_WithDefaults<
		__VLS_TypePropsToRuntimeProps<T_Jlg_InputNumber_Props>,
		{
			controls: boolean;
		}
	>,
	{},
	unknown,
	{},
	{},
	import('vue').ComponentOptionsMixin,
	import('vue').ComponentOptionsMixin,
	{
		'update:modelValue': (v: number) => void;
	},
	string,
	import('vue').PublicProps,
	Readonly<
		globalThis.ExtractPropTypes<
			__VLS_WithDefaults<
				__VLS_TypePropsToRuntimeProps<T_Jlg_InputNumber_Props>,
				{
					controls: boolean;
				}
			>
		>
	> & {
		'onUpdate:modelValue'?: (v: number) => any;
	},
	{
		readonly controls: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
	},
	{}
>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
	[K in keyof T]-?: {} extends Pick<T, K>
		? {
				type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
			}
		: {
				type: import('vue').PropType<T[K]>;
				required: true;
			};
};
type __VLS_WithDefaults<P, D> = {
	[K in keyof Pick<P, keyof P>]: K extends keyof D
		? __VLS_Prettify<
				P[K] & {
					default: D[K];
				}
			>
		: P[K];
};
type __VLS_Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
