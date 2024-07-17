import type { InjectionKey, Ref } from 'vue';
import { inject } from 'vue';
import { I_Table_Filter_Item } from '../components';

export const FIlTER_ITEMS_INJECTION_KEY: InjectionKey<Ref<I_Table_Filter_Item[]>> = Symbol('TableFilterItems');

export const injectStrict = <T = unknown>(key: InjectionKey<T>, defaultValue?: T | (() => T), treatDefaultAsFactory?: false): T => {
	const result = treatDefaultAsFactory ? inject(key, defaultValue as () => T, true) : inject(key, defaultValue as T);
	if (!result) {
		throw new Error(`Could not resolve ${key.description}`);
	}
	return result;
};
