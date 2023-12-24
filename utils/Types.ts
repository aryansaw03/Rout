export type Item = {
	photoURL: string;
	name: string;
	owner: string;
	cost: number;
	costTime: "month" | "day" | "hour" | "minute";
	id: string;
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
	groupID: string;
	inviteCode?: string;
};

export type Market = LocationMarket | GroupMarket;

