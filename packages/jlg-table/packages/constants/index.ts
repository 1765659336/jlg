import { I_Table_Filter_Item } from '../components/table-filter/type';

export const DEFAULT_FORMATS_TIME = 'HH:mm:ss';
export const DEFAULT_FORMATS_DATE = 'YYYY-MM-DD';
export const DEFAULT_FORMATS_DATEPICKER = {
	date: DEFAULT_FORMATS_DATE,
	dates: DEFAULT_FORMATS_DATE,
	week: 'gggg[w]ww',
	year: 'YYYY',
	years: 'YYYY',
	month: 'YYYY-MM',
	datetime: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
	monthrange: 'YYYY-MM',
	daterange: DEFAULT_FORMATS_DATE,
	datetimerange: `${DEFAULT_FORMATS_DATE} ${DEFAULT_FORMATS_TIME}`,
};
export const RANGE_SEPARATOR = ' ~ ';

export const SEARCH_TYPES: Record<I_Table_Filter_Item['type'], any> = {
	text: [
		{ label: '等于', value: 0 },
		{ label: '包含', value: 1 },
	],
	number: [
		{ label: '大于', value: 0 },
		{ label: '小于', value: 1 },
		{ label: '等于', value: 2 },
		{ label: '模糊', value: 3 },
	],
	select: [
		{ label: '包含', value: 0 },
		{ label: '不包含', value: 1 },
	],
	date: [{ label: '等于', value: 0 }],
	independentDate: [{ label: '等于', value: 0 }],
	time: [{ label: '等于', value: 0 }],
	treeSelect: [{ label: '等于', value: 0 }],
};
