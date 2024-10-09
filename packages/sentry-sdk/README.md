# 监控sdk

## 需求分析

---

- 用户错误测试环境复现耗时太长或者无法复现只能去用户电脑上查看
- 用户错误处理不及时，用户发现错误->反馈问题->开发修复 链路过程沟通成本高
- 帮助开发定位错误、调试代码信息少
- 监控系统的性能和健康度、增强系统的可维护性和健壮性
- 收集用户画像，分析用户行为，优化产品体验

## 设计思路

---

一个完整的前端监控平台包括3个部分*数据采集与上报、数据分析与存储、数据展示*

![](https://camo.githubusercontent.com/c12a79cc5e2a53e6e423205445d9f7c3d7ad253356d48b9a58509ae59fa5be8f/68747470733a2f2f70392d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f32313131616231326637343534366139623537306561386635666435326363397e74706c762d6b3375316662706663702d77617465726d61726b2e696d6167653f)

### 数据采集与上报

`设计成sdk创建的形式，接入到各项目中且兼容多技术栈`

错误信息是最基础也是最重要的数据，错误信息主要分为下面几类

- JavaScript代码运行错误、语法错误
- 异步错误
- 静态资源加载错误
- 接口请求错误
- 框架报错

#### 错误捕获方式

- try/catch

只能捕获代码常规的运行错误，语法错误和异步错误不能捕获到

示例：

```tsx
// 示例1：常规运行时错误，可以捕获 ✅
 try {
   let a = undefined;
   if (a.length) {
     console.log('111');
   }
 } catch (e) {
   console.log('捕获到异常：', e);
}

// 示例2：语法错误，不能捕获 ❌
try {
  const notdefined,
} catch(e) {
  console.log('捕获不到异常：', 'Uncaught SyntaxError');
}

// 示例3：异步错误，不能捕获 ❌
try {
  setTimeout(() => {
    console.log(notdefined);
  }, 0)
} catch(e) {
  console.log('捕获不到异常：', 'Uncaught ReferenceError');
}
```

- window.onerror

window.onerror 可以捕获常规错误、异步错误，但不能捕获资源错误

```tsx
/**
 * @param { string } message 错误信息
 * @param { string } source 发生错误的脚本URL
 * @param { number } lineno 发生错误的行号
 * @param { number } colno 发生错误的列号
 * @param { object } error Error对象
 */
window.onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到的错误信息是：', message, source, lineno, colno, error);
};
```

示例：

```tsx
window.onerror = function(message, source, lineno, colno, error) {
  console.log("捕获到的错误信息是：", message, source, lineno, colno, error);
};

// 示例1：常规运行时错误，可以捕获 ✅
console.log(notdefined);

// 示例2：语法错误，不能捕获 ❌
const notdefined;

// 示例3：异步错误，可以捕获 ✅
setTimeout(() => {
  console.log(notdefined);
}, 0);

// 示例4：资源错误，不能捕获 ❌
let script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://www.test.com/index.js";
document.body.appendChild(script);
```

- window.addEventListener

当静态资源加载失败时，会触发 error 事件， 此时 window.onerror 不能捕获到

示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<script>
  window.addEventListener('error', (error) => {
    console.log('捕获到异常：', error);
  }, true)
</script>

<!-- 图片、script、css加载错误，都能被捕获 ✅ -->
<img src="https://test.cn/×××.png">
<script src="https://test.cn/×××.js"></script>
<link href="https://test.cn/×××.css" rel="stylesheet" />

<script>
  // new Image错误，不能捕获 ❌
  // new Image运用的比较少，可以自己单独处理
  new Image().src = 'https://test.cn/×××.png'
</script>
</html>
```

- Promise 错误

Promise 中抛出的错误，无法被 window.onerror、try/catch、 error 事件捕获到，可通过 unhandledrejection 事件来处理

示例：

```tsx
try {
  new Promise((resolve, reject) => {
    JSON.parse('');
    resolve();
  });
} catch (err) {
  // try/catch 不能捕获Promise中错误 ❌
  console.error('in try catch', err);
}

// error事件 不能捕获Promise中错误 ❌
window.addEventListener(
  'error',
  (error) => {
    console.log('捕获到异常：', error);
  },
  true
);

// window.onerror 不能捕获Promise中错误 ❌
window.onerror = function (message, source, lineno, colno, error) {
  console.log('捕获到异常：', { message, source, lineno, colno, error });
};

// unhandledrejection 可以捕获Promise中的错误 ✅
window.addEventListener('unhandledrejection', function (e) {
  console.log('捕获到异常', e);
  // preventDefault阻止传播，不会在控制台打印
  e.preventDefault();
});
```

- Vue错误

```js
Vue.config.errorHandler = (err, vm, info) => {
	console.log('进来啦~', err);
};
```

- 定位源码

打包生成的source-map源码，将错误信息通过调用node服务source-map反编译能够得到具体是项目源码中哪个源文件哪行哪列报错

```tsx
import { body, validationResult } from 'express-validator';
import { SourceMapConsumer } from 'source-map';
import { isJSONString } from '../../utils/validator';
import { Application, Request, Response } from 'express';
import http from 'http';

export default ({ app }: { app: Application }) => {
	app.post(
		'/sourceMap',
		[
			body('fileUrl').isURL().withMessage('fileUrl is not a valid URL'),
			body('err.lineno').isInt().withMessage('err.lineno must be a number'),
			body('err.colno').isInt().withMessage('err.colno must be a number'),
		],
		(req: Request, res: Response) => {
			const result = validationResult(req);

			if (!result.isEmpty()) {
				return res.status(400).json({
					status: 2,
					message: 'failed',
					content: result.array(),
				});
			}

			http.get(req.body.fileUrl, (response) => {
				let data = '';
				response.on('data', (chunk) => {
					data += chunk;
				});
				response.on('end', () => {
					const sourceMapFile = data;
					if (!isJSONString(sourceMapFile)) {
						res.status(200).json({
							status: 1,
							message: 'success',
							content: null,
						});
						return;
					}
					// 创建 SourceMapConsumer 对象
					SourceMapConsumer.with(sourceMapFile, null, (consumer) => {
						// 获取原始源代码位置信息
						const originalPosition = consumer.originalPositionFor({
							line: req.body.err.lineno, // 错误行号
							column: req.body.err.colno, // 错误列号
						});
						res.status(200).json({
							status: 1,
							message: 'success',
							content: originalPosition,
						});
					});
				});
			});
		}
	);
};
```



- 播放录屏

把错误发生前一段时间（时间可自定义）的用户的操作录制下来，然后通过回放来还原错误

```ts
import * as rrweb from 'rrweb';

// events存储录屏信息
export const rrwebEvents: any[] = [];
// record 用于记录DOM中的所有变更
export default () => {
	rrweb.record({
		emit(event, isCheckout) {
			// isCheckout 是一个标识，告诉你重新制作了快照
			if (isCheckout) {
				rrwebEvents.length = 0;
			}
			rrwebEvents.push(event);
		},
		packFn: rrweb.pack,
		recordCanvas: true, // 记录 canvas 内容
		checkoutEveryNms: 10 * 1000, // 每10s重新制作快照
		checkoutEveryNth: 200, // 每 200 个 event 重新制作快照
	});
};
```

#### 用户行为记录

通过前面的方式可以解决大部分问题，假如用户做了很多操作，操作的间隔超过了单次录屏时长，录制的视频可能是不完整的，此时可以借助用户行为来分析用户的操作（比如用户切换页面、鼠标行为、键盘敲击），帮助复现问题

- 路由页面切换收集

```tsx
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
```

- 点击事件收集

```tsx
import trackerInit, { DetailTracker, I_TrackerOption } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
export let clickTracker: DetailTracker;

export default ({ eventBus, trackerOption, tracker }: { eventBus: EventEmitter; trackerOption: I_TrackerOption; tracker: DetailTracker }) => {
	clickTracker = trackerInit({
		...trackerOption,
		realTimeDatasetOverMaxCallback: (val) => {
			eventBus.emit('clickRealTimeDatasetOverMaxCallback', val);
		},
	});

	let clientX: number, clientY: number;

	function getMousePosition(event: MouseEvent) {
		clientX = event.clientX;
		clientY = event.clientY;
	}

	function getPageInfo() {
		// 网页的宽度和高度
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// 滚动条的大小
		const scrollX = window.scrollX || window.pageXOffset;
		const scrollY = window.scrollY || window.pageYOffset;

		return {
			viewportWidth,
			viewportHeight,
			scrollX,
			scrollY,
		};
	}

	document.addEventListener('mousemove', getMousePosition);

	document.addEventListener(
		'click',
		(event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target === null) return;
			const tagName = target.tagName.toLowerCase();
			if (tagName === 'body') {
				return null;
			}
			let classNames = target.classList.value;
			classNames = classNames !== '' ? ` class="${classNames}"` : '';
			const id = target.id ? ` id="${target.id}"` : '';
			const innerText = target.innerText;
			const dom: string = `<${tagName}${id}${classNames !== '' ? classNames : ''}>${innerText}</${tagName}>`;
			const content = {
				dom: dom,
				title: document.title,
				url: window.history.state.current,
				...getPageInfo(),
				clientX,
				clientY,
			};
			const detailData = { timestamp: Date.now(), type: 1, content: JSON.stringify(content) };
			eventBus.emit('clickCallback', content);
			tracker.addDetail(detailData);
			clickTracker.addDetail(detailData);
		},
		true
	);
};
```

- 接口调用收集

  ```tsx
  export default ({
  	eventBus,
  	tracker,
  	requestTracker,
  	uuid,
  	ignoreRequestUrls,
  }: {
  	eventBus: EventEmitter;
  	tracker: DetailTracker;
  	requestTracker: DetailTracker;
  	uuid: string;
  	ignoreRequestUrls: string[];
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
  					const isFailed = this.status >= 400 || this.status === 0;
  					const data = {
  						method: this._requestMethod,
  						url: this._requestUrl,
  						requestData: requestData,
  						status: this.status,
  						beginTime: this._beginTime,
  						endTime: Date.now(),
  						durationTime: Date.now() - this._beginTime,
  						// response: this.responseText,
  					};
  
  					const content = {
  						uuid,
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
  ```

  

#### 性能监控

- 前端页面DOM渲染时间

```tsx
routerTracker = trackerInit({
		...trackerOption,
		realTimeDatasetOverMaxCallback: (val) => {
			eventBus.emit('routerRealTimeDatasetOverMaxCallback', val);
		},
	});
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
```



- 接口响应时间

```tsx
代码与用户行为记录里面的接口收集代码一致
```



### 数据存储与分析

- 将收集错误信息，定义合理的内存大小，减少请求服务器端的频次

```
将每一个用户行为和错误当成一个明细，前端使用两个数据集记录这些明细，从内存占用考虑，可以自定义定义合理的数据集长度。一个数据集用来实时记录每一个新产生的明细，当这个数据集的明细达到最大长度时，将所有数据备份到另外一个数据集、上报并清空，如果发生错误时，如果实时的数据集数据不够，可以从备份数据集中取对应条数明细，确保发生错误时，有足够的明细数据协助定位问题。
```

```tsx
export declare interface I_TrackerDetail {
	timestamp: number;
	content: string;
	[k: string]: any;
}

export declare interface I_TrackerOption {
	maxRealTimeLength: number;
	backupSize: number;
	otherOptions?: object;
	realTimeDatasetOverMaxCallback?: (dataset: I_TrackerDetail[]) => void;
}

export class DetailTracker {
	private realTimeDataset: I_TrackerDetail[];
	private backupDataset: I_TrackerDetail[];
	private maxRealTimeLength: number;
	private backupSize: number;
	private otherOptions: object = {};
	private realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void;

	constructor(
		maxRealTimeLength: number,
		backupSize: number,
		otherOptions: object,
		realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void
	) {
		this.maxRealTimeLength = maxRealTimeLength;
		this.backupSize = backupSize;
		this.otherOptions = otherOptions;
		this.realTimeDataset = [];
		this.backupDataset = [];
		this.realTimeDatasetOverMaxCallback = realTimeDatasetOverMaxCallback;
	}

	addDetail(detail: I_TrackerDetail): void {
		if (this.realTimeDataset.length >= this.maxRealTimeLength) {
			this.realTimeDatasetOverMaxCallback(this.realTimeDataset);
			this.flushRealTimeDataset();
		}
		this.realTimeDataset.push({ timestamp: detail.timestamp, content: detail.content, ...this.otherOptions });
	}

	private flushRealTimeDataset(): void {
		this.backupDataset = [...this.realTimeDataset, ...this.backupDataset];
		if (this.backupDataset.length > this.backupSize) {
			this.backupDataset = this.backupDataset.slice(0, this.backupSize);
		}
		this.realTimeDataset = [];
	}

	getDetailsForErrorReporting(requiredCount: number): I_TrackerDetail[] {
		const totalAvailable = this.realTimeDataset.length + this.backupDataset.length;
		const neededFromBackup = Math.max(0, requiredCount - this.realTimeDataset.length);
		const detailsFromBackup = this.backupDataset.slice(0, neededFromBackup);
		const detailsFromRealTime = this.realTimeDataset.slice(0, requiredCount - neededFromBackup);
		const availableDetails = [...detailsFromRealTime, ...detailsFromBackup];
		return availableDetails.slice(0, totalAvailable);
	}
}

export default ({ maxRealTimeLength, backupSize, otherOptions, realTimeDatasetOverMaxCallback }: I_TrackerOption) => {
	return new DetailTracker(maxRealTimeLength, backupSize, otherOptions ?? {}, realTimeDatasetOverMaxCallback ?? (() => {}));
};
```

- 采用sendBeacon技术方案处理用户刷新系统，导致之前在内存中存储的数据丢失

- 隔离业务，前端使用node另起一个服务，使用kafka队列提交存储数据

- canvas绘制的伪视频走文件服务上传，数据收集里面只保留url

- 远程控制（如系统发生非网络异常的问题，可能会产生大量错误，此时收集数据频率过高会影响到原系统，sdk需支持远程开启关闭且接口错误收集在短时间大批量数据时支持去重）

### 数据模型

| uuid(前端唯一id) | timestamp(时间戳) | type(类型)               | content(内容)                                                                                                                                                                                                                                                                                         |
| ---------------- | ----------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                  |                   | 1(点击)                  | {<br/>    "dom": "<button>按钮 3</button>",<br/>    "title": "Vite + Vue + TS",<br/>    "url": "/",<br/>    "viewportWidth": 697,<br/>    "viewportHeight": 631,<br/>    "scrollX": 0,<br/>    "scrollY": 316.5,<br/>    "clientX": 310,<br/>    "clientY": 353<br/>}                                 |
|                  |                   | 2(页面跳转)              | {<br/>    "from": {<br/>        "path": "#/",<br/>        "title": "Vite + Vue + TS"<br/>    },<br/>    "to": {<br/>        "path": "#/error",<br/>        "title": "Vite + Vue + TS"<br/>    },<br/>    "residenceTime": 5432,<br/>    "renderingTime": 4<br/>}                                      |
|                  |                   | 3(js运行错误)            | {<br/>    "filename": "http://localhost:5174/node_modules/.vite/deps/chunk-5TAEXZSR.js?v=4d696d9e",<br/>    "colno": 7,<br/>    "lineno": 1729,<br/>    "error": "Uncaught ReferenceError: rrwebUrl is not defined"<br/>}                                                                             |
|                  |                   | 4(资源加载错误)          | {<br/>    "src": "http://localhost:5173/invalid-script.js"<br/>}                                                                                                                                                                                                                                      |
|                  |                   | 5(xhr请求)               | {<br/>     "method":"GET",<br/>     "url":"https://api.oioweb.cn/api/SimpWords",<br/>     "requestData":null,<br/>     "status":200,<br/>     "beginTime":1727228859319,<br/>     "endTime":1727228859499,<br/>     "durationTime":180<br/>}                                                          |
|                  |                   | 6(xhr请求错误)           | {<br/>    "method": "GET",<br/>    "url": "http://localhost:3000/api/error?a=1",<br/>    "requestData": null,<br/>    "status": 0,<br/>    "beginTime": 1727228896918,<br/>    "endTime": 1727228899318,<br/>    "durationTime": 2400<br/>}                                                           |
|                  |                   | 7(fetch请求)             | {<br/>    "url": "https://api.oioweb.cn/api/weather/GetWeather",<br/>    "method": "GET",<br/>    "beginTime": 1726648279648,<br/>    "endTime": 1726648279982,<br/>    "durationTime": 334<br/>}                                                                                                     |
|                  |                   | 8(fetch请求错误)         | {<br/>    "url": "https://example.com/api/endpoint",<br/>    "method": "POST",<br/>    "headers": {<br/>        "Content-Type": "application/json"<br/>    },<br/>    "body": "{\"test\":2}",<br/>    "beginTime": 1726648273203,<br/>    "endTime": 1726648273728,<br/>    "durationTime": 525<br/>} |
|                  |                   | 9(未处理失败promise错误) | {<br/>    "reason": "失败",<br/>    "promise": {}<br/>}                                                                                                                                                                                                                                               |
|                  |                   | 10(vue错误)              | {<br/>    "error": "rrwebUrl is not defined",<br/>    "component": "ElButton",<br/>    "info": "native event handler"<br/>}                                                                                                                                                                           |
|                  |                   | 11(自定义行为)           | 自定义json                                                                                                                                                                                                                                                                                            |

### 数据上报
1. xhr 接口请求
   
```
采用接口请求的方式是最简单的，类比于请求其他业务接口，只不过上传的是埋点数据。一般情况下，公司处理埋点的服务器和业务逻辑的服务器可能不是同一台，可能产生跨域问题。另一方面，如果在上报的过程中刷新或者重新打开新页面，可能会造成埋点数据的缺失，所以传统的 xhr 接口请求并不难很好的适应埋点的需求。
```


2. img 标签（使用GIF上报）

```
img 是通过将埋点数据伪装为图片 URL 的请求方式避免跨域问题。但浏览器对于 URL 的长度会有限制，所以 img 上报不适合大数据量上报的场景。同时也会存在刷新或者打开页面的时候上报数据丢失。
防止跨域
一般来说，打点域名都不是当前的域名，所以几乎所有接口的请求都会构成跨域。而跨域请求很容易由于配置不当被浏览器拦截报错。但图片的 src 属性并不会跨域，并且同样跨域发起请求。
防止阻塞页面加载，影响用户体验
一般创建资源节点后只有将对象注入到浏览器 DOM 树后，浏览器才会实际发送资源请求。反复操作 DOM 容易引发性能问题，而且加载 JS/CSS 子资源还会阻塞页面渲染，影响用户体验。
使用图片打点不用插入 DOM ，只要在 JS 中 new 出 Image 对象就能发送请求，而且还没有阻塞问题。在没有 JS 的浏览器环境中也可以通过 img 标签正常打点，这是其他类型的资源请求所做不到。
相比PNG/JPG，GIF的体积最小
BMP：74字节；PNG：67字节；GIF：43字节；
据统计，同样的响应 GIF 可以比 BMP 节约41%的流量，比 PNG 节约35%的流量。
1*1像素是最小的合法图片。通过图片打点，一般来说，图片最好是透明的，不影响页面本身的渲染效果，同时表示图片透明只要使用一个二进制位标记图片是透明色即可，不用存储色彩空间数据，节约体积。
```

3. sendBeacon()
```
sendBeacon() 方法用于将数据异步传输到服务器，通常用于收集用户行为数据或跟踪用户活动。该方法可以确保数据在页面关闭或刷新之前发送给服务器，从而避免数据丢失。
sendBeacon() 方法接受两个参数：一个包含要发送的数据的字符串，以及一个可选的 URL，表示要将数据发送到哪个服务器。如果未指定 URL，数据将发送到当前页面的 URL。缺点就是在某些浏览器上存在兼容性问题。
```
```js
navigator.sendBeacon('http://127.0.0.1:5500/data',data);
```

### 数据展示

- 多端查看（大屏、PC端、手机端）

- 通知人员（邮件Or短信通知Or接入协作平台）

- 数据实时（socket通信Or定时请求）

- 数据安全（设计好如接口响应体，录屏等查看的权限分配问题）

[参考系统](https://www.webfunny.cn/wf_monitor/home.html)

## 如何使用

```tsx
const upload = (longString: string) => {
	const blob = new Blob([longString], { type: 'text/plain' }); // 'text/plain' 是 MIME 类型，你可以根据需要进行更改
	const file = new File([blob], 'filename.txt', { type: 'text/plain' }); // 'filename.txt' 是文件名，你可以根据需要进行更改
	const formData = new FormData();
	formData.append('file', file);
	return axios
		.post('http://218.77.107.37:48999/upload/account', formData)
		.then((res) => {
			return res.data.content.path;
		})
		.catch((err) => {
			console.log(err);
		});
};

const returnOption = sdk({
	xhrCallback: async (err) => {
		ElMessage.error('xhr请求错误');
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	fetchCallback: async (err) => {
		ElMessage.error('fetch请求错误');
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	jsCallback: async (err) => {
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	sourceCallback: async (err) => {
		ElMessage.error('文件资源加载错误上报');
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	unHandledRejectionCallback: async (err) => {
		ElMessage.error('未处理失败的Promise');
		console.log(err);
		const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents));
		errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
	},
	vueOption: {
		app: app,
		vueRouter: router,
		vueErrorCallback: (err) => {
			ElMessage.error('vue错误');
			errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
		},
	},
	routerChangeCallback: (opt) => {
		ElMessage.info('路由变化');
	},
	routerRealTimeDatasetOverMaxCallback: (opt) => {
		ElMessage.info('路由变化收集达到阈值');
		routerTableData.value = [...routerTableData.value, ...opt];
	},
	clickCallback: (opt) => {
		ElMessage.info('点击事件收集');
	},
	clickRealTimeDatasetOverMaxCallback: (opt) => {
		ElMessage.info('点击收集达到阈值');
		clickTableData.value = [...clickTableData.value, ...opt];
	},
	requestRealTimeDatasetOverMaxCallback: (opt) => {
		ElMessage.info('接口请求收集达到阈值');
		requestTableData.value = [...requestTableData.value, ...opt];
	},
	isOpenRrweb: true,
	trackerOption: {
		trackerOption: {
			maxRealTimeLength: 10,
			backupSize: 50,
		},
		routerTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 10,
		},
		clickTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 10,
		},
		requestTrackerOption: {
			maxRealTimeLength: 10,
			backupSize: 50,
		},
	},
	ignoreRequestUrls: ['http://218.77.107.37:48999/upload/account'],
});const upload = async (longString: string) => {
    const blob = new Blob([longString], { type: 'text/plain' }); // 'text/plain' 是 MIME 类型，你可以根据需要进行更改
    const file = new File([blob], 'filename.txt', { type: 'text/plain' }); // 'filename.txt' 是文件名，你可以根据需要进行更改
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('http://218.77.107.37:48999/upload/account', formData);
    return res.data.content.path;
}

const returnOption = sdk({
    xhrCallback: async (err) => {
        ElMessage.error('xhr请求错误');
        const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents))
        errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
    },
    fetchCallback: async (err) => {
        ElMessage.error('fetch请求错误');
        const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents))
        errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
    },
    jsCallback: async (err) => {
        const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents))
        errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
    },
    sourceCallback: async (err) => {
        ElMessage.error('文件资源加载错误上报');
        const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents))
        errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
    },
    unHandledRejectionCallback: async (err) => {
        ElMessage.error('未处理失败的Promise');
        const rrwebUrl = await upload(JSON.stringify(returnOption.rrwebEvents))
        errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
    },
    vueOption: {
        app: app,
        vueRouter: router,
        vueErrorCallback: (err) => {
            ElMessage.error('vue错误');
            errorTableData.value.push({ ...err, behavior: returnOption.tracker.getDetailsForErrorReporting(50), rrwebUrl });
        }
    },
    routerChangeCallback: (opt) => {
        // console.log('路由变化', opt);
        ElMessage.info('路由变化');
    },
    routerRealTimeDatasetOverMaxCallback: (opt) => {
        // console.log('路由变化收集达到阈值', opt);
        ElMessage.info('路由变化收集达到阈值');
        routerTableData.value = [...routerTableData.value, ...opt];
    },
    clickCallback: (opt) => {
        // console.log('点击事件收集', opt);
        ElMessage.info('点击事件收集');
    },
    clickRealTimeDatasetOverMaxCallback: (opt) => {
        // console.log('点击收集达到阈值', opt);
        ElMessage.info('点击收集达到阈值');
        clickTableData.value = [...clickTableData.value, ...opt];
    },
    requestRealTimeDatasetOverMaxCallback: (opt) => {
        ElMessage.info('接口请求收集达到阈值');
        requestTableData.value = [...requestTableData.value, ...opt];
    },
    isOpenRrweb: true,
    trackerOption: {
        trackerOption: {
            maxRealTimeLength: 10,
            backupSize: 50,
        },
        routerTrackerOption: {
            maxRealTimeLength: 10,
            backupSize: 10,
        },
        clickTrackerOption: {
            maxRealTimeLength: 10,
            backupSize: 10,
        },
        requestTrackerOption: {
            maxRealTimeLength: 10,
            backupSize: 50,
        }
    }
});
```
