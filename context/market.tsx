import React, { useState, useContext, createContext } from "react";
import { Market } from "@utils/Types";

type MarketContextType = {
	market: Market | undefined;
	setMarket: React.Dispatch<React.SetStateAction<Market | undefined>>;
};

const MarketContext = createContext<MarketContextType | undefined>(undefined);

type MarketProviderProps = {
	children: React.ReactNode;
};

export const MarketProvider: React.FC<MarketProviderProps> = ({ children }) => {
	const [market, setMarket] = useState<Market | undefined>({
		type: "location",
		city: "Ashburn",
		state: "VA",
		longitude: 39.0438,
		latitude: 77.4874,
	});

	return (
		<MarketContext.Provider value={{ market, setMarket }}>
			{children}
		</MarketContext.Provider>
	);
};

export const useMarket = () => {
	const context = useContext(MarketContext);
	if (!context) {
		throw new Error("useMarket must be used within a MarketProvider");
	}
	return context;
};
