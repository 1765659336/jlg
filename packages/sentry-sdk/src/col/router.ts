import EventEmitter from '../utils/handleEvents';
import replaceOld from '../utils/replaceOld';
import trackerInit, { DetailTracker, I_TrackerOption } from '../utils/breadCrumbs';

let lastHref: string = document.location.href;
let lastHrefTime: number = Date.now();
type HistoryReplaceFn = (this: typeof window.history, ...args: any[]) => void;
export let routerTracker: DetailTracker;

export default ({ eventBus, trackerOption, tracker }: { eventBus: EventEmitter; trackerOption: I_TrackerOption; tracker: DetailTracker }) => {
	routerTracker = trackerInit({
		...trackerOption,
		realTimeDatasetOverMaxCallback: (val) => {
			eventBus.emit('routerRealTimeDatasetOverMaxCallback', val);
		},
	});
	function historyReplaceFn(originalHistoryFn: HistoryReplaceFn): HistoryReplaceFn {
		return function (...args: any[]) {
			const url = args.length > 2 ? args[2] : undefined;

			if (url) {
				const from = lastHref;
				const to = String(url);

				if (from === to) return;

				const oldTitle = document.title;

				lastHref = to;

				const result = originalHistoryFn.apply(this, args);

				setTimeout(() => {
					const nowTime = Date.now();

					const newTitle = document.title;

					const data = {
						from: {
							path: from,
							title: oldTitle,
						},
						to: {
							path: to,
							title: newTitle,
						},
						time: nowTime - lastHrefTime,
					};

					const detailData = { timestamp: nowTime, type: 2, content: JSON.stringify(data) };
					eventBus.emit('routerChangeCallback', data);
					tracker.addDetail(detailData);
					routerTracker.addDetail(detailData);
					lastHrefTime = nowTime;
				}, 10);

				return result;
			}

			return originalHistoryFn.apply(this, args);
		};
	}

	// 确保 replaceOld 函数的类型正确
	replaceOld(window.history, 'pushState', historyReplaceFn);
	replaceOld(window.history, 'replaceState', historyReplaceFn);
};
