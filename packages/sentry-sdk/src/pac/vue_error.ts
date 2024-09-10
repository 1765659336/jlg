import { DetailTracker, E_TrackerDetailType } from '../utils/breadCrumbs';
import EventEmitter from '../utils/handleEvents';

export default ({ uuid, eventBus, app, tracker }: { uuid: string; eventBus: EventEmitter; app: any; tracker: DetailTracker }) => {
	app.config.errorHandler = (err: Error, vm: any, info: string) => {
		const data = {
			error: err.message || err,
			component: vm.$options.name || 'Unknown Component',
			info: info,
		};

		const content = {
			uuid,
			timestamp: Date.now(),
			type: E_TrackerDetailType.vue错误,
			content: JSON.stringify(data),
		};

		eventBus.emit('vueErrorCallback', content);

		tracker.addDetail(content);
	};
};
