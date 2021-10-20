import axios from "axios";

import { formatDate } from '../utils';
import { DispenserProps, DeviceData, LoginProps } from "../utils/Interfaces";

export const baseUrl =
	"http://ec2-3-136-23-113.us-east-2.compute.amazonaws.com:8080";

const api = axios.create({
	baseURL: baseUrl,
});

// Dispensers
export async function getAllDispensers(): Promise<any> {
	let data;
	try {
		await api.get("/dispenser").then((res) => {
			data = res.data;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getLocalDispensers(
	local: string
): Promise<DispenserProps[]> {
	let data: DispenserProps[] = [];
	try {
		await api.get(`/dispenser/${local}`).then((res) => {
			data = res.data.dispensers;
		});

		data.forEach((_data) => {
			const {month, formattedDate} = formatDate(_data.lastStockedTime);

			_data.lastStockedTime = formattedDate;
		});

		return data;
	} catch (error) {
		console.error(error);
	}

	return [];
}

export async function getDeviceData(macAddress: string = ''): Promise<DeviceData[]> {
	let data: DeviceData[] = [];
	try {
		await api.get(`/devicedata/${macAddress}`).then((res) => {
			data = res.data;
		});

		data.forEach((_data) => {
			const {month, formattedDate} = formatDate(_data.updatedTime);

			_data.updatedTime = formattedDate;
		});

		return data;
	} catch (error) {
		console.error(error);
	}

	return data;
}

export async function getDeviceDataByLocal(local: string = ''): Promise<DeviceData[]> {
	let data: DeviceData[] = [];
	try {
		await api.get(`/devicedata/local/${local}`).then((res) => {
			data = res.data;
		});

		data.forEach((_data) => {
			const {month, formattedDate} = formatDate(_data.updatedTime);

			_data.updatedTime = formattedDate;
		});

		return data;
	} catch (error) {
		console.error(error);
	}

	return data;
}

// Users
export async function createUser(userData: Object): Promise<any> {
	let data;
	try {
		await api.post("/user", userData).then((res) => {
			data = res.data;
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getUsers(): Promise<any> {
	let data;
	try {
		await api.get("/user").then((res) => {
			data = res.data;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function loginUser(userData: LoginProps): Promise<any> {
	let data;
	try {
		await api.post("/user/login", userData).then((res) => {
			data = res.data.user;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

// Webhook
export function eventSource() {

}


