import type { TableHeader } from "../Table";
import type { SparklinePoint } from "../../lib/definitions";

export interface MarketItem {
    id: number;
    symbol: string;
    name: string;
    sector?: string | null;
    industry?: string | null;
    exchange?: string | null;
    price: number;
    change_1h: number | null;
    change_24h: number | null;
    change_7d: number | null;
    market_cap: number;
    volume_24h: number;
    circulatingSupply?: number;
    sparkline_7d: SparklinePoint[] | number[];
    last_updated?: string | null;
}

export interface MarketTableProps {
    fetchUrl?: string;
    fetcher?: (page: number, limit: number) => Promise<MarketItem[]>;
    data?: MarketItem[];
    headers?: TableHeader<MarketItem>[];
}