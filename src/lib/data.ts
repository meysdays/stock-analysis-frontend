import api from "./api";
import type { APIStock, KlineResponse, StockStatsResponse, StockInfoResponse } from "./definitions";


export const getStockById = async (id: number): Promise<APIStock> => {
    const { data } = await api.get<APIStock>(`/stocks/${id}`);
    return data;
};

export const getPaginatedMarketData = async (page: number, limit: number): Promise<any[]> => {
    const { data } = await api.get<any[]>(`/market?page=${page}&limit=${limit}`);
    return data;
};

export const getKlines = async (id: number, interval: string = "week", limit: number = 100): Promise<KlineResponse> => {
    const { data } = await api.get<KlineResponse>(`/stocks/${id}/klines`, {
        params: { interval, limit }
    });
    return data;
};

export const getStockStats = async (id: number): Promise<StockStatsResponse> => {
    const { data } = await api.get<StockStatsResponse>(`/stocks/${id}/stats`);
    return data;
};

export const getStockInfo = async (id: number): Promise<StockInfoResponse> => {
    const { data } = await api.get<StockInfoResponse>(`/stocks/${id}/info`);
    return data;
};