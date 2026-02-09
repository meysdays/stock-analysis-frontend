import {
    Globe,
    LayoutGrid,
    Gauge,
    TrendingUp,
    ChartNoAxesCombined,
    RefreshCw,
    Activity,
    ChartColumn,
    Trophy,
    Layers,
    ArrowUpDown,
    Zap,
    BarChart3,
} from "lucide-react";

import type { NavLink, NavOption } from "../lib/definitions"
import type { TabItem } from "../lib/definitions";

export const navLinks: NavLink[] = [
    { href: "#", label: "NSE" },
    { href: "#", label: "Dashboards" },
]


export const dashboardLinks: NavOption = {
    NSE: [
        {
            title: "Nigerian Stock Exchange",
            icon: Trophy,
            links: [
                { href: "#", label: "Ranking", icon: Trophy, iconClass: "text-yellow-600 bg-yellow-50" },
                { href: "#", label: "Categories", icon: Layers, iconClass: "text-indigo-600 bg-indigo-50" },
            ],
        },
        {
            title: "Leaderboard",
            icon: Trophy,
            links: [
                { href: "#", label: "Gainers & Losers", icon: ArrowUpDown, iconClass: "text-emerald-600 bg-emerald-50" },
                { href: "#", label: "Most Active", icon: Zap, iconClass: "text-orange-600 bg-orange-50" },
                { href: "#", label: "Most Traded", icon: BarChart3, iconClass: "text-blue-600 bg-blue-50" },
            ],
        },
    ],

    Dashboards: [
        {
            title: "Markets",
            icon: Globe,
            links: [
                { href: "#", label: "Market Overview", icon: Globe, iconClass: "text-blue-600 bg-blue-50" },
                { href: "#", label: "No. of Stocks", icon: LayoutGrid, iconClass: "text-indigo-600 bg-indigo-50" },
            ],
        },
        {
            title: "Indicators",
            icon: Gauge,
            links: [
                { href: "#", label: "Fear and Greed Index", icon: Gauge, iconClass: "text-green-600 bg-green-50" },
                { href: "/indicators/sp20", label: "StockPred 20 Index", icon: TrendingUp, iconClass: "text-orange-600 bg-orange-50" },
                { href: "#", label: "StockPred 100 Index", icon: ChartNoAxesCombined, iconClass: "text-purple-600 bg-purple-50" },
                { href: "#", label: "Market Cycle Indicators", icon: RefreshCw, iconClass: "text-pink-600 bg-pink-50" },
            ],
        },
        {
            title: "Technical Analysis",
            icon: Activity,
            links: [
                { href: "#", label: "RSI", icon: Activity, iconClass: "text-cyan-600 bg-cyan-50" },
                { href: "#", label: "MACD", icon: ChartColumn, iconClass: "text-emerald-600 bg-emerald-50" },
            ],
        },
    ]

}

export const indicatorTabs: TabItem[] = [
    { label: "Fear & Greed", href: "#fear-greed" },
    { label: "SP20", href: "#sp20" },
    { label: "SP100", href: "#sp100" },
    { label: "Cycle Indicators", href: "#cycle-indicators" },
]

export const stockTabs: TabItem[] = [
    { label: "Chart", href: "#charts" },
    { label: "Markets", href: "#markets" },
    { label: "News", href: "#news" },
    { label: "About", href: "#about" },
]
