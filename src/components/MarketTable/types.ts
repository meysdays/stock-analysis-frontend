import type { TableHeader } from "../Table";

export interface MarketItem {
    id?: string;
    name: string;
    price: number;
    percent1h: number;
    percent24h: number;
    percent7d: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    sparkline7d?: number[];
}

export interface MarketTableProps {
    fetchUrl?: string;
    fetcher?: () => Promise<MarketItem[]>;
    data?: MarketItem[];
    headers?: TableHeader<MarketItem>[];
}
