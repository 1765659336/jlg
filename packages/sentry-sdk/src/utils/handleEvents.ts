type CallbackFunction = (...args: any[]) => void;

// 全局事件总线
export default class EventEmitter {
	private events: Record<string, CallbackFunction[]> = {};

	// 挂载
	public on(eventName: string, callback: CallbackFunction) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}

	// 卸载
	public off(eventName: string, callback: CallbackFunction) {
		if (!this.events[eventName]) {
			return;
		}
		const index = this.events[eventName].indexOf(callback);
		if (index >= 0) {
			this.events[eventName].splice(index, 1);
		}
	}

	// 卸载全部
	public offAll(eventName: string) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName] = [];
	}

	// 触发
	public emit(eventName: string, ...args: any[]) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName].forEach((callback) => {
			callback(...args);
		});
	}
}
