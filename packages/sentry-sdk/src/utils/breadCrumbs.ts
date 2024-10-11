import { browserName } from '../col/browser';
import { deviceInfo } from '../col/device';
import { networkType } from '../col/network';
import pako from 'pako';

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

export interface I_TrackerDetail {
	timestamp: number;
	content: string;
	type: E_TrackerDetailType;
	uuid: string;
	[k: string]: any;
}

export interface I_TrackerOption {
	maxRealTimeLength: number;
	backupSize: number;
	backupTime: number;
	sessionKey?: string;
	otherOptions?: object;
	saveIntervalTime?: number;
	realTimeDatasetOverMaxCallback?: (dataset: I_TrackerDetail[]) => void;
}

export class DetailTracker {
	private realTimeDataset: I_TrackerDetail[];
	private backupDataset: I_TrackerDetail[];
	private maxRealTimeLength: number;
	private backupSize: number;
	private backupTime: number;
	private otherOptions: object = {};
	private realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void;
	private saveIntervalTime: number;
	private sessionKey: string;

	constructor(
		maxRealTimeLength: number,
		backupSize: number,
		otherOptions: object,
		realTimeDatasetOverMaxCallback: (dataset: I_TrackerDetail[]) => void,
		saveIntervalTime: number = 3000,
		sessionKey: string,
		backupTime: number
	) {
		this.maxRealTimeLength = maxRealTimeLength;
		this.backupSize = backupSize;
		this.otherOptions = otherOptions;
		this.realTimeDataset = [];
		this.backupDataset = [];
		this.realTimeDatasetOverMaxCallback = realTimeDatasetOverMaxCallback;
		this.saveIntervalTime = saveIntervalTime;
		this.sessionKey = sessionKey;
		this.backupTime = backupTime;

		const sessionData = localStorage.getItem(this.sessionKey);
		if (sessionData) {
			const unzipData = pako.ungzip(JSON.parse(sessionData), { to: 'string' });
			try {
				const parsedData = JSON.parse(unzipData);
				if (parsedData && Array.isArray(parsedData.backupDataset) && Array.isArray(parsedData.realTimeDataset)) {
					this.backupDataset = parsedData.backupDataset;
					this.realTimeDataset = parsedData.realTimeDataset;
				}
			} catch {
				/* empty */
			}
		}

		setInterval(() => {
			this.saveToSession();
		}, this.saveIntervalTime);

		setInterval(() => {
			this.flushRealTimeDataset();
			this.realTimeDatasetOverMaxCallback(this.realTimeDataset);
		}, this.backupTime);
	}

	addDetail(detail: I_TrackerDetail): void {
		if (this.realTimeDataset.length >= this.maxRealTimeLength) {
			this.realTimeDatasetOverMaxCallback(this.realTimeDataset);
			this.flushRealTimeDataset();
			this.saveToSession();
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

	private saveToSession(): void {
		const dataToSave = pako.gzip(
			JSON.stringify({
				backupDataset: this.backupDataset,
				realTimeDataset: this.realTimeDataset,
			})
		);
		localStorage.setItem(this.sessionKey, JSON.stringify(dataToSave));
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

export default ({
	backupTime,
	maxRealTimeLength,
	backupSize,
	otherOptions,
	realTimeDatasetOverMaxCallback,
	saveIntervalTime,
	sessionKey,
}: I_TrackerOption) => {
	return new DetailTracker(
		maxRealTimeLength,
		backupSize,
		otherOptions ?? {},
		realTimeDatasetOverMaxCallback ?? (() => {}),
		saveIntervalTime,
		String(sessionKey),
		backupTime
	);
};
