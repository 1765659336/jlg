import { App } from 'vue';
import { default as JlgInput } from './input';
import { default as JlgForm } from './form';
import { default as JlgDatePicker } from './date-picker';
import { default as JlgFormItem } from './form-item';
import { default as JlgOption } from './option';
import { default as JlgSelect } from './select';
import { default as JlgTimeSelect } from './time-select';
import { default as JlgInputNumber } from './input-number';
import { default as JlgTooltip } from './tooltip';
import { default as JlgRate } from './rate';
import { default as JlgRadioGroup } from './radio-group';
import { default as JlgRadio } from './radio';
import { T_Jlg_DatePicker_Props } from './date-picker/type';
import { T_Jlg_InputNumber_Props } from './input-number/type';
import { T_Jlg_TimeSelect_Props } from './time-select/type';
import { T_Jlg_Select_Props } from './select/type';
import { T_Jlg_Input_Props } from './input/type';
import { T_Jlg_Tooltip_Props } from './tooltip/type';
import { T_JlgForm_Props } from './form/type';
import { I_Jlg_Option_Props } from './option/type';
import { T_Jlg_FormItem_Props } from './form-item/type';
import { T_Jlg_Rate_Props } from './rate/type';
import { T_Jlg_RadioGroup_Props } from './radio-group/type';
import { T_Jlg_Radio_Props } from './radio/type';
import { FormValidatorRules } from './rule';
import { T_Jlg_Upload_Global_Props } from './upload/types';
import { JlgUpload, JlgFileTypeList, JlgUploadContent, JlgUploadList, JlgUploadFileModel, JlgFileViewerMethod } from './upload/index';

export * from './rule';
export { JlgForm, JlgDatePicker, JlgFormItem, JlgInput, JlgOption, JlgSelect, JlgTimeSelect, JlgInputNumber, JlgTooltip, JlgRate, JlgRadioGroup, JlgRadio, FormValidatorRules, JlgUpload, JlgFileTypeList, JlgUploadContent, JlgUploadList, JlgUploadFileModel, JlgFileViewerMethod, };
type DeepPartial<T> = {
    [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};
interface I_Global_Component_Config {
    tooltip: Partial<T_Jlg_Tooltip_Props>;
    form: DeepPartial<T_JlgForm_Props>;
    formItem: DeepPartial<T_Jlg_FormItem_Props>;
    input: DeepPartial<T_Jlg_Input_Props>;
    select: DeepPartial<T_Jlg_Select_Props>;
    option: DeepPartial<I_Jlg_Option_Props>;
    timeSelect: DeepPartial<T_Jlg_TimeSelect_Props>;
    inputNumber: DeepPartial<T_Jlg_InputNumber_Props>;
    datePicker: DeepPartial<T_Jlg_DatePicker_Props>;
    rate: DeepPartial<T_Jlg_Rate_Props>;
    radioGroup: DeepPartial<T_Jlg_RadioGroup_Props>;
    radio: DeepPartial<T_Jlg_Radio_Props>;
    upload: DeepPartial<T_Jlg_Upload_Global_Props>;
}
export declare const globalComponentConfig: I_Global_Component_Config;
declare const _default: {
    install: (app: App<Element>, config?: {
        componentConfig?: I_Global_Component_Config;
    }) => void;
};
export default _default;
