// Dispensers
export interface DispenserProps {
	fluidLevel: string;
	local: string;
	used: string;
	macAddress: string;
	lastStockedTime: string;
	allUsedCount: string;
	creationDate: string;
	onPress?: () => void;
}

export interface DispenserReducedProps {
	fluidLevel: string;
	local: string;
	used: string;
	macAddress: string;
	lastStockedTime: string;
	onPress: () => void;
}

export interface DeviceData {
	dispenser: DispenserProps;
	fluidLevel: string;
	local: string;
	used: string;
	allUsedCount: string;
	updatedTime: string;
	stocked: boolean;
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
	role: "admin" | "analist" | "viewer";
}

export interface UserProps {
	name: string;
	role: "admin" | "analist" | "viewer";
}

export interface LoginProps {
	login: string;
	password: string;
}
