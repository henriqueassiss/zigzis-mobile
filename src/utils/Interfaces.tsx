// Dispensers
export interface AllDispenserProps {
	id: number;
    fluidLevel: number;
	local: string;
    used: number;
    allUsedCount: number;
    macAddress: string;
    creationDate: string;
    lastStockedTime: string;
}

export interface DispenserProps {
	local: string;
	fluidLevel: number;
	used: number;
}

export interface RoomListProps {
	local: string;
	dispensers: number;
	onPress: () => void;
}

// Users
export interface AllUserProps {
	name: string;
	email: string;
	password: string;
	cpf: number;
	login: string;
	position: string;
	role: 'admin'|'analist'|'viewer';
}

export interface UserProps {
	name: string;
	role: 'admin'|'analist'|'viewer';
}

export interface LoginProps {
	login: string;
	password: string;
}
