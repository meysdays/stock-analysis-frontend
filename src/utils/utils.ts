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

import {
    type ChartData as ChartJSData,

} from "chart.js";
import { faker } from '@faker-js/faker';
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
                { href: "/indicators/ranking", label: "Ranking", icon: Trophy, iconClass: "text-yellow-600 bg-yellow-50" },
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
                { href: "/indicators/no-of-stocks", label: "No. of Stocks", icon: LayoutGrid, iconClass: "text-indigo-600 bg-indigo-50" },
            ],
        },
        {
            title: "Indicators",
            icon: Gauge,
            links: [
                { href: "/indicators/fear-greed", label: "Fear and Greed Index", icon: Gauge, iconClass: "text-green-600 bg-green-50" },
                { href: "/indicators/sp10", label: "StockPred 10 Index", icon: TrendingUp, iconClass: "text-orange-600 bg-orange-50" },
                { href: "/indicators/sp30", label: "StockPred 30 Index", icon: ChartNoAxesCombined, iconClass: "text-purple-600 bg-purple-50" },
                { href: "#", label: "Market Cycle Indicators", icon: RefreshCw, iconClass: "text-pink-600 bg-pink-50" },
            ],
        },
        {
            title: "Technical Analysis",
            icon: Activity,
            links: [
                { href: "/technical/rsi", label: "RSI", icon: Activity, iconClass: "text-cyan-600 bg-cyan-50" },
                { href: "/technical/macd", label: "MACD", icon: ChartColumn, iconClass: "text-emerald-600 bg-emerald-50" },
            ],
        },
    ]

}

export const indicatorTabs: TabItem[] = [
    { label: "Fear & Greed", href: "/indicators/fear-greed" },
    { label: "SP10", href: "/indicators/sp10" },
    { label: "SP30", href: "/indicators/sp30" },
    { label: "Cycle Indicators", href: "#cycle-indicators" },
]

export const stockTabs: TabItem[] = [
    { label: "Chart", href: "#charts" },
    { label: "Markets", href: "#markets" },
    { label: "News", href: "#news" },
    { label: "About", href: "#about" },
]

export const color_zones = [
    { min: 0, max: 19, color: "#dc2626", label: "Extreme Fear" },
    { min: 20, max: 39, color: "#f97316", label: "Fear" },
    { min: 40, max: 59, color: "#eab308", label: "Neutral" },
    { min: 60, max: 79, color: "#22c55e", label: "Greed" },
    { min: 80, max: 100, color: "#16a34a", label: "Extreme Greed" },
]

export const mockBubbleData: ChartJSData<"bubble"> = {
    datasets: [
        {
            label: 'Oversold',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 50, max: 100 }),
                y: faker.number.int({ min: 0, max: 30 }),
                r: 10,
            })),
            backgroundColor: '#129f6a',
        },
        {
            label: 'Weak',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 30, max: 40 }),
                r: 10,
            })),
            backgroundColor: '#0d774f',
        },
        {
            label: 'Neutral',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 15, max: 100 }),
                y: faker.number.int({ min: 40, max: 60 }),
                r: 10,
            })),
            backgroundColor: '#eee',
        },
        {
            label: 'Strong',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 60, max: 70 }),
                r: 10,
            })),
            backgroundColor: '#8c2228',
        },
        {
            label: 'Overbought',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 70, max: 90 }),
                r: 10,
            })),
            backgroundColor: '#d3333c',
        },
    ],
};


export const dummySidebarData = {
    stock_name: "Stock\\DUMMY",
    volume: "1,234,567",
    close: "150.25",
    high: "155.00",
    low: "148.50",
    open: "149.00",
    signal: "Buy",
    score: 85
};
