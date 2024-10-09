interface Connection {
	effectiveType: string;
	addEventListener: (type: string, listener: () => void) => void;
}

export const networkType = {
	value: 'unknown',
};

export default () => {
	if ('connection' in navigator) {
		const connection = navigator.connection as Connection;
		networkType.value = connection.effectiveType;
		connection.addEventListener('change', () => {
			networkType.value = connection.effectiveType;
		});
	} else {
		networkType.value = 'unknown';
	}
};
