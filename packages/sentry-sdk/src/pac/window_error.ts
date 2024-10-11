import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
import { v4 as uuidv4 } from 'uuid';

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
			const uuid = uuidv4();

			if (err.target instanceof HTMLScriptElement || err.target instanceof HTMLLinkElement) {
				const content = {
					uuid,
					timestamp: Date.now(),
					type: E_TrackerDetailType.资源加载错误,
					content: JSON.stringify({ src: (err.target as HTMLScriptElement).src }),
				};
				eventBus.emit('sourceCallback', content);
				tracker.addDetail(content);
			} else {
				const content = {
					uuid,
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
