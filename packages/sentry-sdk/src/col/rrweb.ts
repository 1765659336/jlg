import * as rrweb from 'rrweb';

export const rrwebEvents: any[] = [];
export default () => {
	rrweb.record({
		emit(event, isCheckout) {
			if (isCheckout) {
				rrwebEvents.length = 0;
			}
			rrwebEvents.push(event);
		},
		packFn: rrweb.pack,
		recordCanvas: true,
		// checkoutEveryNms: 10 * 1000,
		checkoutEveryNth: 1000,
	});
};
