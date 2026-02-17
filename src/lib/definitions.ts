import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface CardProps {
    children?: ReactNode;
    title?: string;
    value?: string | number;
    className?: string;
    action?: ReactNode;
}

export interface NavLink {
    href: string;
    label: string;
}


export interface DashboardSection {
    title: string;
    icon: LucideIcon;
    links: { href: string; label: string; icon: LucideIcon; iconClass: string }[];
}
export type NavItem = DashboardSection[]

export type NavOption = {
    [key: string]: NavItem
}

export interface TabItem {
    label: string;
    href: string;
}

export interface StockApiData {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    stock_name: string;
}

export interface APIStock {
    symbol: string;
    id: number;
    name: string;
    outstanding_shares: number;
    sector: string;
    industry: string;
    description: string;
    website: string;
    market_cap: string;
    currency: string;
    exchange: string;
    last_updated: string;
    pe_ratio: string;
    fifty_two_week_high: string;
    fifty_two_week_low: string;
    adjustment_factor: string | null;
}

export interface StockName {
    id: number;
    stock_name: string;
}

export interface SignalApiData {
    symbol: string;
    signal: string;
    score: number;
    reasons: string[];
}

export interface KlineData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface KlineResponse {
    symbol: string;
    interval: string;
    klines: KlineData[];
}

export interface StockStatsResponse {
    stock_id: number;
    symbol: string;
    market_cap: number | null;
    revenue_ttm: number | null;
    net_income: number | null;
    eps: number | null;
    shares_outstanding: number | null;
    pe_ratio: number | null;
    forward_pe: number | null;
    dividend: number | null;
    ex_dividend_date: string | null;
    volume: number | null;
    avg_volume: number | null;
    open: number | null;
    previous_close: number | null;
    day_range: string | null;
    fifty_two_week_range: string | null;
    beta: number | null;
    rsi: number | null;
    earnings_date: string | null;
}

export interface StockInfoResponse {
    stock_id: number;
    symbol: string;
    ipo_date: string | null;
    name: string | null;
    fifty_two_week_high: number | null;
    fifty_two_week_low: number | null;
    fifty_day_moving_average: number | null;
    sector: string | null;
    industry: string | null;
    sentiment: string | null;
    sp_score: number | null;
}

export type Stat = {
    label: string;
    value: string;
}

export interface StatisticsCardProps {
    symbol: string;
    description: string;
    stats: Stat[];
    sidebarTitle: string;
    sidebarText: string;
}

export interface NavItemType {
    name: string;
    path: string;
    icon: React.ElementType;
}