import { T_Jlg_DatePicker_Props } from './type';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<T_Jlg_DatePicker_Props>, {
    editable: boolean;
    clearable: boolean;
    validateEvent: boolean;
    teleported: boolean;
}>, {
    _ref: globalThis.Ref<any>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (v: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number | Date | string[] | [import('element-plus').DateModelType, import('element-plus').DateModelType]) | (() => import('element-plus').ModelValueType) | ((new (...args: any[]) => string | number | Date | string[] | [import('element-plus').DateModelType, import('element-plus').DateModelType]) | (() => import('element-plus').ModelValueType))[], unknown, unknown>) => void;
}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<T_Jlg_DatePicker_Props>, {
    editable: boolean;
    clearable: boolean;
    validateEvent: boolean;
    teleported: boolean;
}>>> & {
    "onUpdate:modelValue"?: (v: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number | Date | string[] | [import('element-plus').DateModelType, import('element-plus').DateModelType]) | (() => import('element-plus').ModelValueType) | ((new (...args: any[]) => string | number | Date | string[] | [import('element-plus').DateModelType, import('element-plus').DateModelType]) | (() => import('element-plus').ModelValueType))[], unknown, unknown>) => any;
}, {
    readonly clearable: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly editable: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
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
