import { DetailTracker } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';

export default ({ eventBus, vue, tracker }: { eventBus: EventEmitter; vue: any; tracker: DetailTracker }) => {
	vue.config.errorHandler = (err: Error, vm: any, info: string) => {
		const data = {
			error: err.message || err,
			component: vm.$options.name || 'Unknown Component',
			info: info,
		};

		const content = {
			timestamp: Date.now(),
			type: 8,
			content: JSON.stringify(data),
		};

		eventBus.emit('vueErrorCallback', content);

		tracker.addDetail(content);
	};
};
