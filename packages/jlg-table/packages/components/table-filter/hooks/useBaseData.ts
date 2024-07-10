import { CSSProperties, ref } from 'vue';
import { I_Table_Filter_Item, I_Table_Filter_Props } from '../type';
import isNumber from 'xe-utils/isNumber';
import isString from 'xe-utils/isString';

export const useBaseData = ({ props }: { props: I_Table_Filter_Props }) => {
	const form = reactive({});
	const schemeForm = reactive({});
	const isHideTooltip = ref(false);
	const isFolding = ref(props.folding);

	function visibleTooltip(event: Event, labelText: string) {
		if (!labelText) {
			isHideTooltip.value = true;
			return;
		}
		const { offsetWidth, scrollWidth } = event.target as HTMLElement;
		isHideTooltip.value = offsetWidth >= scrollWidth;
	}

	function isStringNumber(val: string | number) {
		if (!isString(val)) {
			return false;
		}
		return !Number.isNaN(Number(val));
	}

	function addUnit(value?: string | number, defaultUnit = 'px') {
		if (!value) return '';
		if (isNumber(value) || isStringNumber(value)) {
			return `${value}${defaultUnit}`;
		} else if (isString(value)) {
			return value;
		}
	}

	const labelStyle = (item: I_Table_Filter_Item): CSSProperties => {
		const labelWidth = addUnit(item.titleWidth || props?.titleWidth || '');
		let titleAlign = item.titleAlign || props.titleAlign;
		if (titleAlign === 'top' || titleAlign === '') titleAlign = 'left';
		if (labelWidth) return { width: labelWidth, textAlign: titleAlign };
		return { textAlign: titleAlign, width: '' };
	};

	return {
		form,
		schemeForm,
		isFolding,
		isHideTooltip,
		visibleTooltip,
		labelStyle,
	};
};
