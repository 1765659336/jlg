export const browserName = {
	value: 'Unknown',
};

export default () => {
	const userAgent = navigator.userAgent;

	if (userAgent.indexOf('Chrome') > -1) {
		browserName.value = 'Chrome';
	} else if (userAgent.indexOf('Firefox') > -1) {
		browserName.value = 'Firefox';
	} else if (userAgent.indexOf('Safari') > -1) {
		browserName.value = 'Safari';
	} else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
		browserName.value = 'Internet Explorer';
	} else if (userAgent.indexOf('Edge') > -1) {
		browserName.value = 'Edge';
	}
};
