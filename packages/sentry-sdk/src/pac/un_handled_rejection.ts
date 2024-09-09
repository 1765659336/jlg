import { DetailTracker } from '../utils/breadCrumbs';
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
			type: 7,
			content: JSON.stringify(data),
		};
		eventBus.emit('unHandledRejectionCallback', content);
		tracker.addDetail(content);
	});
};
