export type Item = {
	photoURL: string;
	name: string;
	owner: string;
	cost: number;
	costTime: "month" | "day" | "hour" | "minute";
	id: number;
};