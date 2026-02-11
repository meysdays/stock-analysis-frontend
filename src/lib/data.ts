import api from "./api";
import type { StockApiData } from "./definitions";


export const getStockById = async (id: number): Promise<StockApiData[]> => {
    const { data } = await api.get<StockApiData[]>(`/stocks/${id}`);
    return data;
};

export const fetchStockById = async (id: number) => {
    const [detailsData] = await Promise.all([
        getStockById(id),
    ]);
    return { detailsData };
};

export const getPaginatedMarketData = async (page: number, limit: number): Promise<any[]> => {
    const { data } = await api.get<any[]>(`/market?page=${page}&limit=${limit}`);
    return data;
};