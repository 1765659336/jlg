import EventEmitter from './utils/handleEvents';
import xhrReplace, { T_SDKDataXMLHttpRequest } from './pac/xhr_replace';
import fetchReplace, { T_FetchCallbackParams } from './pac/fetch_replace';
import windowError from './pac/window_error';
import unHandledRejection from './pac/un_handled_rejection';
import vueError from './pac/vue_error';
import rrwebInit, { rrwebEvents, T_RrwebOption } from './col/rrweb';
import routerChange from './col/router';
import clickCollected from './col/click';
import trackerInit, { E_TrackerDetailType, I_TrackerOption } from './utils/breadCrumbs';
import networkTypeInit from './col/network';
import deviceInit from './col/device';
import browserInit from './col/browser';
import { v4 as uuidv4 } from 'uuid';

export default (option: {
	trackerOption: {
		trackerOption: I_TrackerOption;
		routerTrackerOption: I_TrackerOption;
		clickTrackerOption: I_TrackerOption;
		requestTrackerOption: I_TrackerOption;
	};
	vueOption: {
		vueRouter: any;
		vueErrorCallback: (err: Error) => void;
		app: any;
	};
	xhrOption?: {
		requestValidator?: (xhr: T_SDKDataXMLHttpRequest) => boolean;
		xhrCallback?: (xhr: T_SDKDataXMLHttpRequest) => void;
	};
	fetchCallback?: (data: T_FetchCallbackParams) => void;
	jsCallback?: (err: Error) => void;
	sourceCallback?: (err: Error) => void;
	unHandledRejectionCallback?: (err: PromiseRejectionEvent) => void;
	routerChangeCallback?: (option: any) => void;
	clickCallback?: (option: any) => void;
	rrwebOption?: T_RrwebOption;
	ignoreRequestUrls?: string[];
}) => {
	const {
		xhrOption,
		fetchCallback,
		jsCallback,
		sourceCallback,
		unHandledRejectionCallback,
		vueOption,
		routerChangeCallback,
		clickCallback,
		trackerOption,
		rrwebOption,
		ignoreRequestUrls = [],
	} = option;
	const eventBus = new EventEmitter();

	networkTypeInit();

	deviceInit();

	browserInit();

	const tracker = trackerInit({ ...{ sessionKey: 'tracker' }, ...trackerOption.trackerOption });
	const requestTracker = trackerInit({ ...{ sessionKey: 'requestTracker' }, ...trackerOption.requestTrackerOption });
	const clickTracker = trackerInit({ ...{ sessionKey: 'clickTracker' }, ...trackerOption.clickTrackerOption });
	const routerTracker = trackerInit({ ...{ sessionKey: 'routerTracker' }, ...trackerOption.routerTrackerOption });

	const returnOption: {
		rrwebEvents: string[];
	} = {
		rrwebEvents: [],
	};

	if (xhrOption && xhrOption.xhrCallback) {
		eventBus.on('xhrCallback', (xhr: T_SDKDataXMLHttpRequest) => {
			xhrOption.xhrCallback?.(xhr);
		});
		xhrReplace({
			eventBus,
			tracker,
			requestTracker,
			ignoreRequestUrls,
			requestValidator: xhrOption.requestValidator,
		});
	}

	if (fetchCallback) {
		eventBus.on('fetchCallback', (data: T_FetchCallbackParams) => {
			fetchCallback?.(data);
		});
		fetchReplace({ eventBus, tracker, requestTracker, ignoreRequestUrls });
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

	if (vueOption && vueOption.app) {
		eventBus.on('vueErrorCallback', (option) => {
			vueOption.vueErrorCallback(option);
		});
		vueError({
			eventBus,
			app: vueOption.app,
			tracker,
		});
	}

	if (rrwebOption) {
		rrwebInit({ rrwebOption });
		returnOption.rrwebEvents = rrwebEvents;
	}

	if (routerChangeCallback) {
		eventBus.on('routerChangeCallback', (option) => {
			routerChangeCallback(option);
		});
		routerChange({ eventBus, tracker, routerTracker, vueRouter: vueOption.vueRouter, app: vueOption.app });
	}

	if (clickCallback) {
		eventBus.on('clickCallback', (option) => {
			clickCallback(option);
		});
		clickCollected({ eventBus, tracker, clickTracker });
	}

	return {
		...returnOption,
		routerTracker,
		tracker,
		clickTracker,
		addCustomTracker: (content: string, type?: E_TrackerDetailType) => {
			tracker.addDetail({
				timestamp: Date.now(),
				content,
				uuid: uuidv4(),
				type: type ?? E_TrackerDetailType.自定义行为,
			});
		},
	};
};
