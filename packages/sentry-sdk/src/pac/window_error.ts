import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';

export default ({ eventBus, tracker }: { eventBus: EventEmitter; tracker: DetailTracker }) => {
	window.addEventListener(
		'error',
		function (err: ErrorEvent) {
			const data = {
				filename: err.filename,
				colno: err.colno,
				lineno: err.lineno,
				error: err.message,
			};
			if (err instanceof ErrorEvent && err.target instanceof Element) {
				const content = {
					timestamp: Date.now(),
					type: E_TrackerDetailType.资源加载错误,
					content: JSON.stringify(data),
				};
				eventBus.emit('sourceCallback', content);
				tracker.addDetail(content);
			} else {
				const content = {
					timestamp: Date.now(),
					type: E_TrackerDetailType.js运行错误,
					content: JSON.stringify(data),
				};
				eventBus.emit('jsCallback', content);
				tracker.addDetail(content);
			}
		},
		true
	);
};
