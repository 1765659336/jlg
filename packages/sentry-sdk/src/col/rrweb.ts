import * as rrweb from 'rrweb';
import { recordOptions } from 'rrweb/typings/types';
import { eventWithTime } from '@rrweb/types';

export type T_RrwebOption = recordOptions<eventWithTime>;

export const rrwebEvents: any[] = [];
export default ({ rrwebOption }: { rrwebOption: T_RrwebOption }) => {
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
		...rrwebOption,
	});
};
