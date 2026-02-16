import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

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
    id: number;
    stock_name: string;
}

export interface SignalApiData {
    symbol: string;
    signal: string;
    score: number;
    reasons: string[];
}

export interface NavItemType {
  name: string;
  path: string;
  icon: React.ElementType;
}

export interface CardProps {
  children?: ReactNode;
  title?: string;
  value?: string | number;
  className?: string;
  action?: ReactNode;
}