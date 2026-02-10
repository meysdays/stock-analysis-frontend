import api from "./api";
import type { StockName, StockApiData, SignalApiData } from "./definitions";

// Helper to Title Case the stock name (backend requires 'Stock\Name' but list returns 'STOCK\NAME')
const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getStocks = async (): Promise<StockName[]> => {
    const { data } = await api.get<StockName[]>("/stocks/stocks_name");
    return data;
};

export const getStockDetails = async (name: string): Promise<StockApiData[]> => {
    const formattedName = toTitleCase(name);
    const { data } = await api.get<StockApiData[]>(
        `/stocks/name/${encodeURIComponent(formattedName)}`
    );
    return data;
};

export const getSignal = async (name: string): Promise<SignalApiData> => {
    const formattedName = toTitleCase(name);
    const { data } = await api.get<SignalApiData>(
        `/stocks/signal?stock_name=${encodeURIComponent(formattedName)}`
    );
    return data;
};

export const fetchStockById = async (id: string) => {
    const [detailsData, signalData] = await Promise.all([
        getStockDetails(id),
        getSignal(id),
    ]);
    return { detailsData, signalData };
};