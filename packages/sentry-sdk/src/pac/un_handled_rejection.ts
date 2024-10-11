import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
import { v4 as uuidv4 } from 'uuid';

export default ({ eventBus, tracker }: { eventBus: EventEmitter; tracker: DetailTracker }) => {
	window.addEventListener('unhandledrejection', (event): void => {
		event.preventDefault();
		const data = {
			reason: event.reason,
			promise: event.promise,
		};
		const content = {
			uuid: uuidv4(),
			timestamp: Date.now(),
			type: E_TrackerDetailType.未处理失败promise错误,
			content: JSON.stringify(data),
		};
		eventBus.emit('unHandledRejectionCallback', content);
		tracker.addDetail(content);
	});
};
