import EventEmitter from '../utils/handleEvents';
import replaceOld from '../utils/replaceOld';
import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import { nextTick } from 'vue';

let lastHref: string = document.location.href;
let lastHrefTime: number = Date.now();
type HistoryReplaceFn = (this: typeof window.history, ...args: any[]) => void;

export default ({
	eventBus,
	tracker,
	uuid,
	vueRouter,
	app,
	routerTracker,
}: {
	eventBus: EventEmitter;
	tracker: DetailTracker;
	uuid: string;
	vueRouter: any;
	app: any;
	routerTracker: DetailTracker;
}) => {
	let startTime: number;
	let renderingTime: number;

	vueRouter.beforeEach(async (...args: any) => {
		startTime = Date.now();
		vueRouter.routerChange = true;
		args[2]();
	});

	vueRouter.afterEach(async () => {
		if (!vueRouter.routerChange) return;
		await nextTick();
		const endTime = Date.now();
		renderingTime = endTime - startTime;
		vueRouter.routerChange = false;
	});

	app.mixin({
		mounted() {
			// console.log('mixinMounted');
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
						residenceTime: nowTime - lastHrefTime,
						renderingTime,
					};

					const content = { timestamp: nowTime, type: E_TrackerDetailType.页面跳转, uuid, content: JSON.stringify(data) };
					eventBus.emit('routerChangeCallback', content);
					tracker.addDetail(content);
					routerTracker.addDetail(content);
					lastHrefTime = nowTime;
				}, 10);

				return result;
			}

			return originalHistoryFn.apply(this, args);
		};
	}

	replaceOld(window.history, 'pushState', historyReplaceFn);
	replaceOld(window.history, 'replaceState', historyReplaceFn);
};
