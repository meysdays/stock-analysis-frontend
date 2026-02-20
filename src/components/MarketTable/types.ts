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

export interface DashboardItem {
    id?: string;
    symbol: string;
    companyName: string;
    marketCap: string;
    stockPrice: string;
    change: string;
    industry: string;
    volume: string;
    peRatio: string;
}

export interface FinancialItem {
    id?: string;
    FiscalYear: string;
    FY2021: string
    FY2022: string
    FY2023: string
    FY2024: string
    FY2025: string
}

export interface FinancialItemProps {
    fetchUrl?: string;
    fetcher?: () => Promise<FinancialItem[]>;
    data?: FinancialItem[];
    headers?: TableHeader<FinancialItem>[];
}
export interface MarketTableProps {
    fetchUrl?: string;
    fetcher?: (page: number, limit: number) => Promise<MarketItem[]>;
    data?: MarketItem[];
    headers?: TableHeader<MarketItem>[];
}
