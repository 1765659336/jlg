import { T_Jlg_InputNumber_Props } from './type';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<T_Jlg_InputNumber_Props>, {
    controls: boolean;
    validateEvent: boolean;
}>, {
    _ref: globalThis.Ref<any>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number) => void;
}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<T_Jlg_InputNumber_Props>, {
    controls: boolean;
    validateEvent: boolean;
}>>> & {
    "onUpdate:modelValue"?: (value: number) => any;
}, {
    readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly controls: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
}, {}>, Partial<Record<NonNullable<string | number>, (_: {}) => any>>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
