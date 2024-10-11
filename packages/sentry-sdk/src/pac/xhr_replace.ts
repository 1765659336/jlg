import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
import replaceOld from '../utils/replaceOld';
import { v4 as uuidv4 } from 'uuid';

export declare type T_SDKDataXMLHttpRequest = XMLHttpRequest & {
	_requestMethod: string;
	_requestUrl: string;
	_beginTime: number;
};

export declare type T_VoidFun = (...args: any[]) => void;

export default ({
	eventBus,
	tracker,
	requestTracker,
	ignoreRequestUrls,
	requestValidator,
}: {
	eventBus: EventEmitter;
	tracker: DetailTracker;
	requestTracker: DetailTracker;
	ignoreRequestUrls: string[];
	requestValidator?: (xhr: T_SDKDataXMLHttpRequest) => boolean;
}): void => {
	if (typeof XMLHttpRequest === 'undefined') {
		return;
	}

	const originalXhrProto = XMLHttpRequest.prototype;

	replaceOld(originalXhrProto, 'open', function (originalOpen: T_VoidFun): T_VoidFun {
		return function (this: T_SDKDataXMLHttpRequest, method: string, url: string, ...args: any[]): void {
			(this as T_SDKDataXMLHttpRequest)._requestMethod = method;
			(this as T_SDKDataXMLHttpRequest)._requestUrl = url;
			(this as T_SDKDataXMLHttpRequest)._beginTime = Date.now();
			originalOpen.apply(this, [method, url, ...args]);
		};
	});

	replaceOld(originalXhrProto, 'send', function (originalSend: T_VoidFun): T_VoidFun {
		return function (this: T_SDKDataXMLHttpRequest, requestData?: string): void {
			const handleReadyStateChange = (): void => {
				if (this.readyState === XMLHttpRequest.DONE && !ignoreRequestUrls.includes(this._requestUrl)) {
					const isFailed = (requestValidator && !requestValidator(this)) || this.status >= 400 || this.status === 0;
					const data = {
						method: this._requestMethod,
						url: this._requestUrl,
						requestData: requestData ?? '',
						status: this.status,
						beginTime: this._beginTime,
						endTime: Date.now(),
						durationTime: Date.now() - this._beginTime,
						// response: this.responseText,
					};

					const content = {
						uuid: uuidv4(),
						timestamp: Date.now(),
						content: JSON.stringify(data),
						type: isFailed ? E_TrackerDetailType.xhr请求错误 : E_TrackerDetailType.xhr请求,
					};

					if (!isFailed) {
						requestTracker.addDetail(content);
					} else {
						eventBus.emit('xhrCallback', content);
					}
					tracker.addDetail(content);
				}
			};

			this.addEventListener('readystatechange', handleReadyStateChange);

			originalSend.call(this, requestData);
		};
	});
};
