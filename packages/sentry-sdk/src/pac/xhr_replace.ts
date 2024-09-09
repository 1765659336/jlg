import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
import replaceOld from '../utils/replaceOld';

export declare type T_SDKDataXMLHttpRequest = XMLHttpRequest & {
	_requestMethod: string;
	_requestUrl: string;
};

export declare type T_VoidFun = (...args: any[]) => void;

export default ({ eventBus, tracker }: { eventBus: EventEmitter; tracker: DetailTracker }): void => {
	if (typeof XMLHttpRequest === 'undefined') {
		return;
	}

	const originalXhrProto = XMLHttpRequest.prototype;

	replaceOld(originalXhrProto, 'open', function (originalOpen: T_VoidFun): T_VoidFun {
		return function (this: T_SDKDataXMLHttpRequest, method: string, url: string, ...args: any[]): void {
			(this as T_SDKDataXMLHttpRequest)._requestMethod = method;
			(this as T_SDKDataXMLHttpRequest)._requestUrl = url;
			originalOpen.apply(this, [method, url, ...args]);
		};
	});

	replaceOld(originalXhrProto, 'send', function (originalSend: T_VoidFun): T_VoidFun {
		return function (this: T_SDKDataXMLHttpRequest, requestData?: string): void {
			this.addEventListener('readystatechange', function () {
				if (this.readyState === XMLHttpRequest.DONE) {
					const isFailed = this.status >= 400 || this.status === 0;
					if (!isFailed) return;

					const data = {
						method: (this as T_SDKDataXMLHttpRequest)._requestMethod,
						url: (this as T_SDKDataXMLHttpRequest)._requestUrl,
						requestData: requestData,
						status: this.status,
						response: this.responseText,
					};

					const content = {
						timestamp: Date.now(),
						content: JSON.stringify(data),
						type: E_TrackerDetailType.xhr请求错误,
					};

					eventBus.emit('xhrCallback', content);
					tracker.addDetail(content);
				}
			});

			originalSend.apply(this, [requestData]);
		};
	});
};
