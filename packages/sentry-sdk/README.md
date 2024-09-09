# 错误监控sdk

## 痛点

---

- 用户错误测试环境复现耗时太长或者无法复现只能去用户电脑上查看
- 用户错误感知不及时，用户发现错误->反馈问题->到达开发之间沟通成本高
- 帮助开发定位错误、调试代码信息少

## 解决手段

---

- 定位源码

   打包生成的source-map源码，将错误信息通过source-map反编译能够得到具体是项目源码中哪个源文件哪行哪列报错

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

- 记录用户行为

   通过前两种方式可以解决大部分问题，假如用户做了很多操作，操作的间隔超过了单次录屏时长，录制的视频可能是不完整的，此时可以借助用户行为来分析用户的操作（比如用户切换页面、鼠标行为、键盘敲击），帮助复现问题

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

#### 错误捕获方式

1）try/catch

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

2） window.onerror

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

3） window.addEventListener

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

4）Promise 错误

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

5）Vue错误

```js
Vue.config.errorHandler = (err, vm, info) => {
	console.log('进来啦~', err);
};
```

#### 用户行为记录

1）路由页面切换收集

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

2）点击事件收集

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

3）接口调用收集

### 数据存储与分析

`将收集错误信息，存储服务端`

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

### 数据展示

`多端查看（大屏、PC端、手机端）`

`实时通知（邮件Or短信通知）`

`数据实时（socket通信）`

[参考](https://www.webfunny.cn/wf_monitor/home.html)

# 如何使用
```tsx
const returnOption = sdk({
    xhrCallback: (err) => {
        console.log('xhr请求错误', err);
        ElMessage.error('xhr请求错误');
    },
    fetchCallback: (err) => {
        console.log('fetch请求错误', err);
        ElMessage.error('fetch请求错误');
    },
    jsCallback: (err) => {
        console.log('js错误', err);
    },
    sourceCallback: (err) => {
        console.log('文件资源加载错误上报', err);
        ElMessage.error('文件资源加载错误上报');
    },
    unHandledRejectionCallback: (event) => {
        console.log('未处理失败的Promise', event);
        ElMessage.error('未处理失败的Promise');
    },
    vueErrorOption: {
        vue: app,
        vueErrorCallback: (err) => {
            console.log('vue错误', err);
            console.log(returnOption.rrwebEvents, 'returnOption.rrwebEvents');
            console.log('returnOption.tracker', returnOption.tracker.getDetailsForErrorReporting(30));
            ElMessage.error('vue错误');
        }
    },
    routerChangeCallback: (opt) => {
        console.log('路由变化', opt);
        ElMessage.info('路由变化');
    },
    routerRealTimeDatasetOverMaxCallback: (opt) => {
        console.log('路由变化收集达到阈值', opt);
        ElMessage.info('路由变化收集达到阈值');
    },
    clickCallback: (opt) => {
        console.log('点击事件收集', opt);
        ElMessage.info('点击事件收集');
    },
    clickRealTimeDatasetOverMaxCallback: (opt) => {
        console.log('点击收集达到阈值', opt);
        ElMessage.info('点击收集达到阈值');
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
        }
    }
});
```