import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';
import { v4 as uuidv4 } from 'uuid';

export default ({ eventBus, app, tracker }: { eventBus: EventEmitter; app: any; tracker: DetailTracker }) => {
	app.config.errorHandler = (err: Error, vm: any, info: string) => {
		const data = {
			error: err.message || err,
			component: vm.$options.name || 'Unknown Component',
			info: info,
		};

		const content = {
			uuid: uuidv4(),
			timestamp: Date.now(),
			type: E_TrackerDetailType.vue错误,
			content: JSON.stringify(data),
		};

		eventBus.emit('vueErrorCallback', content);

		tracker.addDetail(content);
	};
};
