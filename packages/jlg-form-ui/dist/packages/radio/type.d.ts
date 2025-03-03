import { RadioProps } from 'element-plus';

export declare type T_Jlg_Radio_Props = {
    title: string | number | boolean;
} & RadioProps;
export declare interface I_Jlg_Radio_Emits {
    (e: 'update:modelValue', value: T_Jlg_Radio_Props['modelValue']): void;
}
