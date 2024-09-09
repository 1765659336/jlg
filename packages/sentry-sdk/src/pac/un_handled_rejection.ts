import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';

export default ({ eventBus, tracker }: { eventBus: EventEmitter; tracker: DetailTracker }) => {
	window.addEventListener('unhandledrejection', (event): void => {
		event.preventDefault();
		const data = {
			reason: event.reason,
			promise: event.promise,
		};
		const content = {
			timestamp: Date.now(),
			type: E_TrackerDetailType.未处理失败promise错误,
			content: JSON.stringify(data),
		};
		eventBus.emit('unHandledRejectionCallback', content);
		tracker.addDetail(content);
	});
};
