import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';

export default ({
	uuid,
	eventBus,
	tracker,
	clickTracker,
}: {
	uuid: string;
	eventBus: EventEmitter;
	tracker: DetailTracker;
	clickTracker: DetailTracker;
}) => {
	let clientX: number, clientY: number;

	function getMousePosition(event: MouseEvent) {
		clientX = event.clientX;
		clientY = event.clientY;
	}

	function getPageInfo() {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

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
			const data = {
				dom: dom,
				title: document.title,
				url: window.history.state.current,
				...getPageInfo(),
				clientX,
				clientY,
			};
			const content = { uuid, timestamp: Date.now(), type: E_TrackerDetailType.点击, content: JSON.stringify(data) };
			eventBus.emit('clickCallback', content);
			tracker.addDetail(content);
			clickTracker.addDetail(content);
		},
		true
	);
};
