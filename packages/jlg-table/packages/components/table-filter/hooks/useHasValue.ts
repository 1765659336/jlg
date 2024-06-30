import { ref } from 'vue';
import { I_Table_Filter_Props } from '../type';

export const useHasValue = ({ props, form }: { props: I_Table_Filter_Props; form: Record<string, any> }) => {
	const isShowQuickSearch = ref(false);
	const isSearch = ref(false);
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

	return {
		isShowQuickSearch,
	};
};
