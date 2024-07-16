import type { InjectionKey } from 'vue';
import { inject } from 'vue';

export const TABLE_INJECTION_KEY: InjectionKey<any> = Symbol('ElTable');

export const injectStrict = <T = unknown>(key: InjectionKey<T>, defaultValue?: (() => T) | T, treatDefaultAsFactory?: false): (() => T) | T => {
	const result = inject(key, defaultValue, treatDefaultAsFactory);
	if (!result) {
		throw new Error(`Could not resolve ${key.description}`);
	}
	return result;
};
