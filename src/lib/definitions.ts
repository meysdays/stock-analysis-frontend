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