import { browserName } from '../col/browser';
import { deviceInfo } from '../col/device';
import { networkType } from '../col/network';

export enum E_TrackerDetailType {
	点击 = 1,
	页面跳转,
	js运行错误,
	资源加载错误,
	xhr请求,
	xhr请求错误,
	fetch请求,
	fetch请求错误,
	未处理失败promise错误,
	vue错误,
	自定义行为,
}

export declare interface I_TrackerDetail {
	timestamp: number;
	content: string;
	type: E_TrackerDetailType;
	uuid: string;
	[k: string]: any;
}

export declare interface I_TrackerOption {
	maxRealTimeLength: number;
	backupSize: number;
	otherOptions?: object;
	realTimeDatasetOverMaxCallback?: (dataset: I_TrackerDetail[]) => void;
}

export class DetailTracker {
	private realTimeDataset: I_TrackerDetail[];
	private backupDataset: I_TrackerDetail[];
	private maxRealTimeLength: number;
	private backupSize: number;
	private otherOptions: object = {};
	private realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void;

	constructor(
		maxRealTimeLength: number,
		backupSize: number,
		otherOptions: object,
		realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void
	) {
		this.maxRealTimeLength = maxRealTimeLength;
		this.backupSize = backupSize;
		this.otherOptions = otherOptions;
		this.realTimeDataset = [];
		this.backupDataset = [];
		this.realTimeDatasetOverMaxCallback = realTimeDatasetOverMaxCallback;
	}

	addDetail(detail: I_TrackerDetail): void {
		if (this.realTimeDataset.length >= this.maxRealTimeLength) {
			this.realTimeDatasetOverMaxCallback(this.realTimeDataset);
			this.flushRealTimeDataset();
		}
		this.realTimeDataset.push({
			...detail,
			...this.otherOptions,
			networkType: networkType.value,
			deviceInfo: deviceInfo.value,
			browserName: browserName.value,
		});
	}

	private flushRealTimeDataset(): void {
		this.backupDataset = [...this.realTimeDataset, ...this.backupDataset];
		if (this.backupDataset.length > this.backupSize) {
			this.backupDataset = this.backupDataset.slice(0, this.backupSize);
		}
		this.realTimeDataset = [];
	}

	getDetailsForErrorReporting(requiredCount: number): I_TrackerDetail[] {
		const totalAvailable = this.realTimeDataset.length + this.backupDataset.length;
		const neededFromBackup = Math.max(0, requiredCount - this.realTimeDataset.length);
		const detailsFromBackup = this.backupDataset.slice(0, neededFromBackup);
		const detailsFromRealTime = this.realTimeDataset.slice(0, requiredCount - neededFromBackup);
		const availableDetails = [...detailsFromRealTime, ...detailsFromBackup];
		return availableDetails.slice(0, totalAvailable);
	}
}

export default ({ maxRealTimeLength, backupSize, otherOptions, realTimeDatasetOverMaxCallback }: I_TrackerOption) => {
	return new DetailTracker(maxRealTimeLength, backupSize, otherOptions ?? {}, realTimeDatasetOverMaxCallback ?? (() => {}));
};
