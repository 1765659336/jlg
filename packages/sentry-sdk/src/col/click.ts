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
