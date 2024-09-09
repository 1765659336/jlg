import EventEmitter from './utils/handleEvents';
import xhrReplace, { T_SDKDataXMLHttpRequest } from './pac/xhr_replace';
import fetchReplace, { T_FetchCallbackParams } from './pac/fetch_replace';
import windowError from './pac/window_error';
import unHandledRejection from './pac/un_handled_rejection';
import vueError from './pac/vue_error';
import rrwebInit, { rrwebEvents } from './col/rrweb';
import routerChange from './col/router';
import clickCollected from './col/click';
import trackerInit, { E_TrackerDetailType, I_TrackerDetail, I_TrackerOption } from './utils/breadCrumbs';
import { routerTracker } from './col/router';
import { clickTracker } from './col/click';

export default (option: {
	trackerOption: { trackerOption: I_TrackerOption; routerTrackerOption: I_TrackerOption; clickTrackerOption: I_TrackerOption };
	xhrCallback?: (xhr: T_SDKDataXMLHttpRequest) => void;
	fetchCallback?: (data: T_FetchCallbackParams) => void;
	jsCallback?: (err: Error) => void;
	sourceCallback?: (err: Error) => void;
	unHandledRejectionCallback?: (err: PromiseRejectionEvent) => void;
	vueErrorOption?: {
		vue: any;
		vueErrorCallback: (err: Error) => void;
	};
	routerChangeCallback?: (option: any) => void;
	routerRealTimeDatasetOverMaxCallback?: (val: I_TrackerDetail[]) => void;
	clickCallback?: (option: any) => void;
	clickRealTimeDatasetOverMaxCallback?: (val: I_TrackerDetail[]) => void;
	isOpenRrweb?: boolean;
}) => {
	const {
		xhrCallback,
		fetchCallback,
		jsCallback,
		sourceCallback,
		unHandledRejectionCallback,
		vueErrorOption,
		isOpenRrweb,
		routerChangeCallback,
		clickCallback,
		trackerOption,
		routerRealTimeDatasetOverMaxCallback,
		clickRealTimeDatasetOverMaxCallback,
	} = option;
	const eventBus = new EventEmitter();
	const tracker = trackerInit(trackerOption.trackerOption);

	const returnOption: {
		rrwebEvents: string[];
	} = {
		rrwebEvents: [],
	};

	if (xhrCallback) {
		eventBus.on('xhrCallback', (xhr: T_SDKDataXMLHttpRequest) => {
			xhrCallback?.(xhr);
		});
		xhrReplace({
			eventBus,
			tracker,
		});
	}

	if (fetchCallback) {
		eventBus.on('fetchCallback', (data: T_FetchCallbackParams) => {
			fetchCallback?.(data);
		});
		fetchReplace({ eventBus, tracker });
	}

	if (jsCallback || sourceCallback) {
		jsCallback &&
			eventBus.on('jsCallback', (err) => {
				jsCallback(err);
			});
		sourceCallback &&
			eventBus.on('sourceCallback', (err) => {
				sourceCallback(err);
			});
		windowError({ eventBus, tracker });
	}

	if (unHandledRejectionCallback) {
		eventBus.on('unHandledRejectionCallback', (err) => {
			unHandledRejectionCallback(err);
		});
		unHandledRejection({
			eventBus,
			tracker,
		});
	}

	if (vueErrorOption && vueErrorOption.vue) {
		eventBus.on('vueErrorCallback', (option) => {
			vueErrorOption.vueErrorCallback(option);
		});
		vueError({
			eventBus,
			vue: vueErrorOption.vue,
			tracker,
		});
	}

	if (isOpenRrweb) {
		rrwebInit();
		returnOption.rrwebEvents = rrwebEvents;
	}

	if (routerChangeCallback) {
		eventBus.on('routerChangeCallback', (option) => {
			routerChangeCallback(option);
		});
		routerChange({ eventBus, trackerOption: trackerOption.routerTrackerOption, tracker });
	}

	if (routerRealTimeDatasetOverMaxCallback) {
		eventBus.on('routerRealTimeDatasetOverMaxCallback', (option) => {
			routerRealTimeDatasetOverMaxCallback(option);
		});
	}

	if (clickCallback) {
		eventBus.on('clickCallback', (option) => {
			clickCallback(option);
		});
		clickCollected({ eventBus, tracker, trackerOption: trackerOption.clickTrackerOption });
	}

	if (clickRealTimeDatasetOverMaxCallback) {
		eventBus.on('clickRealTimeDatasetOverMaxCallback', (option) => {
			clickRealTimeDatasetOverMaxCallback(option);
		});
	}

	return {
		...returnOption,
		routerTracker,
		tracker,
		clickTracker,
		addCustomTracker: (content: string) => {
			tracker.addDetail({
				timestamp: Date.now(),
				content,
				type: E_TrackerDetailType.自定义行为,
			});
		},
	};
};
