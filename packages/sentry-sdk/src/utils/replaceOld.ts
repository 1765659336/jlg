export default (source: { [key: string]: any }, name: string, replacement: (...arg: any[]) => any): void => {
	if (!(name in source)) return;
	const original = source[name];
	const warpped = replacement(original);
	if (typeof warpped === 'function') {
		source[name] = warpped;
	}
};
