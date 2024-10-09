type CallbackFunction = (...args: any[]) => void;

export default class EventEmitter {
	private events: Record<string, CallbackFunction[]> = {};

	public on(eventName: string, callback: CallbackFunction) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}

	public off(eventName: string, callback: CallbackFunction) {
		if (!this.events[eventName]) {
			return;
		}
		const index = this.events[eventName].indexOf(callback);
		if (index >= 0) {
			this.events[eventName].splice(index, 1);
		}
	}

	public offAll(eventName: string) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName] = [];
	}

	public emit(eventName: string, ...args: any[]) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName].forEach((callback) => {
			callback(...args);
		});
	}
}
