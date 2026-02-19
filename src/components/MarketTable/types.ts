import type { TableHeader } from "../Table";

export interface MarketItem {
    id: number;
    symbol: string;
    name: string | null;
    sector: string | null;
    industry: string | null;
    exchange: string | null;
    currency: string | null;
    last_updated: string | null;
}

export interface MarketTableProps {
    fetchUrl?: string;
    fetcher?: () => Promise<MarketItem[]>;
    data?: MarketItem[];
    headers?: TableHeader<MarketItem>[];
}
