import { I_JlgMenu_MenuDataItem, T_MenuDataRecord } from './type';
import { PopoverProps } from 'element-plus';
import { RouteLocationNormalizedLoaded } from 'vue-router';

interface I_Jlg_Menu_Props {
    menuData: I_JlgMenu_MenuDataItem[];
    commonMenuData?: I_JlgMenu_MenuDataItem[];
    collectMenuKeys: I_JlgMenu_MenuDataItem['key'][];
    menuDataRecord?: T_MenuDataRecord;
    transition?: string;
    idKey?: string;
    childKey?: string;
    parentKey?: string;
    columnCount?: number;
    logoHeight?: number;
    isLockModal?: boolean;
    headerHeight?: string;
    route?: RouteLocationNormalizedLoaded;
    searchTrigger?: 'change' | 'input';
    defaultActive?: I_JlgMenu_MenuDataItem['key'][];
    elPopoverProps?: PopoverProps;
}
declare function showMenu(): void;
declare function closeMenu(): void;
declare function initMenu(): void;
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<I_Jlg_Menu_Props>, {
    childKey: string;
    transition: string;
    idKey: string;
    parentKey: string;
    searchTrigger: string;
    headerHeight: string;
    columnCount: number;
    isLockModal: boolean;
}>, {
    initMenu: typeof initMenu;
    showMenu: typeof showMenu;
    closeMenu: typeof closeMenu;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    collectClick: (jlgMenuDataItem: I_JlgMenu_MenuDataItem, meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]) => void;
    threeLevelMenuClick: (jlgMenuDataItem: I_JlgMenu_MenuDataItem, meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]) => void;
}, string, import('vue').PublicProps, Readonly<globalThis.ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<I_Jlg_Menu_Props>, {
    childKey: string;
    transition: string;
    idKey: string;
    parentKey: string;
    searchTrigger: string;
    headerHeight: string;
    columnCount: number;
    isLockModal: boolean;
}>>> & {
    onCollectClick?: (jlgMenuDataItem: I_JlgMenu_MenuDataItem, meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]) => any;
    onThreeLevelMenuClick?: (jlgMenuDataItem: I_JlgMenu_MenuDataItem, meneArr?: [I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem, I_JlgMenu_MenuDataItem]) => any;
}, {
    transition: string;
    idKey: string;
    parentKey: string;
    childKey: string;
    columnCount: number;
    isLockModal: boolean;
    headerHeight: string;
    searchTrigger: "input" | "change";
}, {}>, Partial<Record<string, (_: {}) => any>> & {
    logo?(_: {}): any;
}>;
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
