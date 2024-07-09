import { ref } from 'vue';
import { I_Table_Filter_Item, I_Table_Filter_Props } from '../type';
import { FilterText, FilterInputNumber, FilterSelect, FilterTime, FilterDate, FilterTreeSelect, FilterIndependentDate } from '../component';

export const useRenderContentTitle = (type: I_Table_Filter_Item['type']) => {
	switch (type) {
		case 'text':
			return FilterText;
		case 'number':
			return FilterInputNumber;
		case 'select':
			return FilterSelect;
		case 'time':
			return FilterTime;
		case 'date':
			return FilterDate;
		case 'independentDate':
			return FilterIndependentDate;
		case 'treeSelect':
			return FilterTreeSelect;
		default:
			return FilterText;
	}
};

export const usePopover = ({ props, form }: { props: I_Table_Filter_Props; form: Record<string, any> }) => {
	const isShowQuickSearch = ref(false);
	const isSearch = ref(false);
	const popoverRef = ref();

	function hasValue(value: any) {
		if (value === undefined || value === null) {
			return false;
		} else if (typeof value === 'string' && value.trim() === '') {
			return false;
		} else if (Array.isArray(value) && value.length === 0) {
			return false;
		} else return !(typeof value === 'object' && Object.keys(value).length === 0);
	}
	watch(
		() => form,
		() => {
			isSearch.value = Object.values(form).some(hasValue);
		},
		{ deep: true }
	);
	watch([isShowQuickSearch, isSearch], ([newIsShowQuickSearch, newIsSearch], [oldIsShowQuickSearch, oldIsSearch]) => {
		if (newIsShowQuickSearch !== oldIsShowQuickSearch || newIsSearch !== oldIsSearch) {
			if (props?.onSearchStatusChange) props?.onSearchStatusChange(newIsShowQuickSearch, newIsSearch);
		}
	});

	const onClickOutside = () => {
		unref(popoverRef).popperRef?.delayHide?.();
	};
	// 手动关闭快捷搜索
	const handleQuickSearchClose = () => {
		isShowQuickSearch.value = false;
	};
	// 打开快捷搜索
	const handleQuickSearch = () => {
		isShowQuickSearch.value = true;
	};

	const renderContentTitle = (item: I_Table_Filter_Item) => {
		return useRenderContentTitle(item.type);
	};

	return {
		isShowQuickSearch,
		onClickOutside,
		handleQuickSearchClose,
		handleQuickSearch,
		renderContentTitle,
	};
};
