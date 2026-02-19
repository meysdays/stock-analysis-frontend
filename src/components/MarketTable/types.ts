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
    fetcher?: () => Promise<DashboardItem[]>;
    data?: DashboardItem[];
    headers?: TableHeader<DashboardItem>[];
}
