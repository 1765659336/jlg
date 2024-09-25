import replaceOld from '../utils/replaceOld';
import EventEmitter from '../utils/handleEvents';
import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';

type BodyInit = ReadableStream | XMLHttpRequestBodyInit;

type BufferSource = ArrayBufferView | ArrayBuffer;

type XMLHttpRequestBodyInit = Blob | BufferSource | FormData | URLSearchParams | string;

type RequestCache = 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload';

type RequestCredentials = 'include' | 'omit' | 'same-origin';

type HeadersInit = [string, string][] | Record<string, string> | Headers;

type RequestMode = 'cors' | 'navigate' | 'no-cors' | 'same-origin';

type RequestRedirect = 'error' | 'follow' | 'manual';

type ReferrerPolicy =
	| ''
	| 'no-referrer'
	| 'no-referrer-when-downgrade'
	| 'origin'
	| 'origin-when-cross-origin'
	| 'same-origin'
	| 'strict-origin'
	| 'strict-origin-when-cross-origin'
	| 'unsafe-url';

export declare interface RequestInit {
	/** A BodyInit object or null to set request's body. */
	body?: BodyInit | null;
	/** A string indicating how the request will interact with the browser's cache to set request's cache. */
	cache?: RequestCache;
	/** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
	credentials?: RequestCredentials;
	/** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
	headers?: HeadersInit;
	/** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
	integrity?: string;
	/** A boolean to set request's keepalive. */
	keepalive?: boolean;
	/** A string to set request's method. */
	method?: string;
	/** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
	mode?: RequestMode;
	/** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
	redirect?: RequestRedirect;
	/** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
	referrer?: string;
	/** A referrer policy to set request's referrerPolicy. */
	referrerPolicy?: ReferrerPolicy;
	/** An AbortSignal to set request's signal. */
	signal?: AbortSignal | null;
	/** Can only be null. Used to disassociate request from any Window. */
	window?: null;
}
export type T_FetchCallbackParams = { args: [input: Request | string | URL, init?: RequestInit]; response: Promise<Response> };

export default ({
	uuid,
	eventBus,
	tracker,
	requestTracker,
	ignoreRequestUrls,
}: {
	uuid: string;
	eventBus: EventEmitter;
	tracker: DetailTracker;
	requestTracker: DetailTracker;
	ignoreRequestUrls: string[];
}): void => {
	if (typeof window.fetch === 'undefined') {
		return;
	}

	const originalFetch = window.fetch;

	window.fetch = (input: Request | string | URL, init?: RequestInit): Promise<Response> => {
		const data = {
			url: typeof input === 'string' ? input : input instanceof URL ? input.href : input.url,
			method: init?.method || 'GET',
			headers: init?.headers,
			body: init?.body,
			beginTime: Date.now(),
			endTime: 0,
			durationTime: 0,
		};

		const parsedUrl = new URL(data.url);
		parsedUrl.search = '';
		const parsedUrlStr = parsedUrl.toString();

		const fetchPromise = originalFetch(input, init);

		return fetchPromise
			.then(async (response) => {
				if (ignoreRequestUrls.includes(parsedUrlStr)) {
					return response;
				}
				data.endTime = Date.now();
				data.durationTime = data.endTime - data.beginTime;
				const content = {
					uuid,
					timestamp: Date.now(),
					type: response.ok ? E_TrackerDetailType.fetch请求 : E_TrackerDetailType.fetch请求错误,
					content: JSON.stringify(data),
				};

				if (response.ok) {
					requestTracker.addDetail(content);
				} else {
					eventBus.emit('fetchCallback', content);
				}

				tracker.addDetail(content);

				return response;
			})
			.catch((error) => {
				if (ignoreRequestUrls.includes(parsedUrlStr)) {
					throw error;
				}
				data.endTime = Date.now();
				data.durationTime = data.endTime - data.beginTime;
				const content = {
					uuid,
					timestamp: Date.now(),
					type: E_TrackerDetailType.fetch请求错误,
					content: JSON.stringify(data),
				};

				eventBus.emit('fetchCallback', content);
				tracker.addDetail(content);

				throw error;
			});
	};
};
