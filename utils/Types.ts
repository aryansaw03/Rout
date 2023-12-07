export type Item = {
	photoURL: string;
	name: string;
	owner: string;
	cost: number;
	costTime: "month" | "day" | "hour" | "minute";
	id: number;
};

export type LocationMarket = {
	type: "location";
	city: string;
	state: string;
	longitude: number;
	latitude: number;
};

export type GroupMarket = {
	type: "group";
	name: string;
	groupID: number;
};

export type Market = LocationMarket | GroupMarket;