import type { LucideIcon } from "lucide-react";

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

export interface StockName {
    stock_name: string;
}

export interface SignalApiData {
    symbol: string;
    signal: string;
    score: number;
    reasons: string[];
}