import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import {
	LoginProps,
	AllDispenserProps,
} from '../utils/Interfaces';

const webSocket = new W3CWebSocket('ws://127.0.0.1:8000');

const api = axios.create({
	baseURL: 'http://ec2-3-15-211-207.us-east-2.compute.amazonaws.com:8080'
});

// Dispensers
export async function getAllDispensers() : Promise<any> {
	let data;
	try {
		await api.get('/dispenser').then(res => {
			data = res.data;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getLocalDispensers(local: string) : Promise<AllDispenserProps[]> {
	let data: AllDispenserProps[] = [];
	try {
		await api.get('/dispenser/' + local).then(res => {
			data = res.data.dispensers;
		});

		return data;
	} catch (error) {
		console.error(error);
	}

	return [];
}

export async function getDeviceData() : Promise<any> {
	let data;
	try {
		await api.get('/devicedata').then(res => {
			data = res.data;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

// Users
export async function createUser(userData: Object) : Promise<any> {
	let data;
	try {
		await api.post('/user', userData).then(res => {
			data = res.data;
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getUsers() : Promise<any> {
	let data;
	try {
		await api.get('/user').then(res => {
			data = res.data;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function loginUser(userData : LoginProps) : Promise<any> {
	let data;
	try {
		await api.post('/user/login', userData).then(res => {
			data = res.data.user;
		});

		return data;
	} catch (error) {
		console.error(error);
	}
}

// WebSocket
export function setWebSocket() {
	webSocket.onopen = () => {
		console.log('WebSocket Client Connected');
	};

	webSocket.onmessage = (message) => {
		console.log(message);
	};
}
