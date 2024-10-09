export const deviceInfo = {
	value: 'Unknown Device',
};

export default () => {
	const userAgent = navigator.userAgent;

	const mobileRegex = /(?:iPhone|iPad|Android|Windows Phone|BlackBerry|IEMobile|Opera Mini)[\s\/]?([\d\w\.\-]*)/;
	const mobileMatch = userAgent.match(mobileRegex);
	if (mobileMatch) {
		deviceInfo.value = `Mobile Device: ${mobileMatch[0]}`;
	} else {
		if (/Windows/i.test(userAgent)) {
			const windowsMatch = userAgent.match(/Windows NT ([\d\.]+)/);
			deviceInfo.value = `Windows PC: ${windowsMatch ? `Windows ${windowsMatch[1]}` : 'Unknown Version'}`;
		} else if (/Macintosh/i.test(userAgent)) {
			const macMatch = userAgent.match(/Mac OS X ([\d\_]+)/);
			deviceInfo.value = `Mac PC: ${macMatch ? `macOS ${macMatch[1].replace(/_/g, '.')}` : 'Unknown Version'}`;
		}
	}
};
