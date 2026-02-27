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
  Home as HomeIcon,
  BarChart2,
  Filter,
  // Settings,
  Star,
} from "lucide-react";
import { type ChartData as ChartJSData } from "chart.js";
import { faker } from "@faker-js/faker";
import type { NavItemType, NavLink, NavOption } from "../lib/definitions";
import type { TabItem } from "../lib/definitions";

export const navLinks: NavLink[] = [
  { href: "#", label: "NSE" },
  { href: "#", label: "Dashboards" },
];

export const dashboardLinks: NavOption = {
  NSE: [
    {
      title: "Nigerian Stock Exchange",
      icon: "emoji_events",
      links: [
        {
          href: "/indicators/ranking",
          label: "Ranking",
          icon: "emoji_events",
          iconClass: "text-yellow-600 bg-yellow-50",
        },
        {
          href: "#",
          label: "Categories",
          icon: "layers",
          iconClass: "text-indigo-600 bg-indigo-50",
        },
      ],
    },
    {
      title: "Leaderboard",
      icon: "emoji_events",
      links: [
        {
          href: "#",
          label: "Gainers & Losers",
          icon: "swap_vert",
          iconClass: "text-emerald-600 bg-emerald-50",
        },
        {
          href: "#",
          label: "Most Active",
          icon: "bolt",
          iconClass: "text-orange-600 bg-orange-50",
        },
      ],
    },
    {
      title: "Technical Analysis",
      icon: "monitoring",
      links: [
        {
          href: "/technical/rsi",
          label: "RSI",
          icon: "monitoring",
          iconClass: "text-cyan-600 bg-cyan-50",
        },
        {
          href: "/technical/macd",
          label: "MACD",
          icon: "bar_chart",
          iconClass: "text-emerald-600 bg-emerald-50",
        },
      ],
    },
  ],

  Dashboards: [
    {
      title: "Markets",
      icon: "public",
      links: [
        {
          href: "#",
          label: "Market Overview",
          icon: "public",
          iconClass: "text-blue-600 bg-blue-50",
        },
        {
          href: "/indicators/no-of-stocks",
          label: "No. of Stocks",
          icon: "grid_view",
          iconClass: "text-indigo-600 bg-indigo-50",
        },
      ],
    },
    {
      title: "Indicators",
      icon: "speed",
      links: [
        {
          href: "/indicators/fear-greed",
          label: "Fear and Greed Index",
          icon: "speed",
          iconClass: "text-green-600 bg-green-50",
        },
        {
          href: "/indicators/sp10",
          label: "StockPred 10 Index",
          icon: "trending_up",
          iconClass: "text-orange-600 bg-orange-50",
        },
        {
          href: "/indicators/sp30",
          label: "StockPred 30 Index",
          icon: "show_chart",
          iconClass: "text-purple-600 bg-purple-50",
        },
        {
          href: "#",
          label: "Market Cycle Indicators",
          icon: "sync",
          iconClass: "text-pink-600 bg-pink-50",
        },
      ],
    },
    {
      title: "Technical Analysis",
      icon: "monitoring",
      links: [
        {
          href: "/indicators/rsi",
          label: "RSI",
          icon: "monitoring",
          iconClass: "text-cyan-600 bg-cyan-50",
        },
        {
          href: "/technical/macd",
          label: "MACD",
          icon: "bar_chart",
          iconClass: "text-emerald-600 bg-emerald-50",
        },
      ],
    },
  ],
};

export const indicatorTabs: TabItem[] = [
  { label: "Fear & Greed", href: "/indicators/fear-greed" },
  { label: "SP10", href: "/indicators/sp10" },
  { label: "SP30", href: "/indicators/sp30" },
  { label: "Cycle Indicators", href: "#cycle-indicators" },
];

export const stockTabs: TabItem[] = [
  { label: "Chart", href: "#charts" },
  { label: "Markets", href: "#markets" },
  { label: "News", href: "#news" },
  { label: "About", href: "#about" },
];

export const color_zones = [
  { min: 0, max: 19, color: "#dc2626", label: "Extreme Fear" },
  { min: 20, max: 39, color: "#f97316", label: "Fear" },
  { min: 40, max: 59, color: "#eab308", label: "Neutral" },
  { min: 60, max: 79, color: "#22c55e", label: "Greed" },
  { min: 80, max: 100, color: "#16a34a", label: "Extreme Greed" },
];

export const mockBubbleData: ChartJSData<"bubble"> = {
  datasets: [
    {
      label: "Oversold",
      data: Array.from({ length: 20 }).map(() => ({
        x: faker.number.int({ min: 50, max: 100 }),
        y: faker.number.int({ min: 0, max: 30 }),
        r: 10,
      })),
      backgroundColor: "#129f6a",
    },
    {
      label: "Weak",
      data: Array.from({ length: 20 }).map(() => ({
        x: faker.number.int({ min: 35, max: 100 }),
        y: faker.number.int({ min: 30, max: 40 }),
        r: 10,
      })),
      backgroundColor: "#0d774f",
    },
    {
      label: "Neutral",
      data: Array.from({ length: 20 }).map(() => ({
        x: faker.number.int({ min: 15, max: 100 }),
        y: faker.number.int({ min: 40, max: 60 }),
        r: 10,
      })),
      backgroundColor: "#eee",
    },
    {
      label: "Strong",
      data: Array.from({ length: 20 }).map(() => ({
        x: faker.number.int({ min: 35, max: 100 }),
        y: faker.number.int({ min: 60, max: 70 }),
        r: 10,
      })),
      backgroundColor: "#8c2228",
    },
    {
      label: "Overbought",
      data: Array.from({ length: 20 }).map(() => ({
        x: faker.number.int({ min: 35, max: 100 }),
        y: faker.number.int({ min: 70, max: 90 }),
        r: 10,
      })),
      backgroundColor: "#d3333c",
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
  score: 85,
};

export const formatValue = (value: any, suffix: string = ""): string => {
  if (value === null || value === undefined || value === "") return "n/a";
  if (typeof value === "number") {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + "T" + suffix;
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B" + suffix;
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M" + suffix;
    return value.toLocaleString() + suffix;
  }
  return value + suffix;
};

export const generateMockMarketCapData = (range: string) => {
  const points = range === "1M" ? 30 : range === "6M" ? 180 : range === "YTD" ? 100 : range === "1Y" ? 365 : 500;
  const data = [];
  const labels = [];
  let baseValue = 10000; // Starting at 10T

  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    labels.push(date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }));

    // Add some random walk
    baseValue += (Math.random() - 0.45) * 100;
    data.push(Math.round(baseValue));
  }

  return { labels, data };
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
};

export const navItems: NavItemType[] = [
  { name: "Dashboard", path: "/", icon: "home" },
  { name: "Stocks", path: "/stocks", icon: "bar_chart" },
  { name: "WatchList", path: "/users", icon: "star" },
  { name: "Comparison Tool", path: "/comparison", icon: "query_stats" }
];

export const Tabs = (id: number) => [
  { label: "Overview", id: "overview", href: `/stock/${id}/summary` },
  {
    label: "Financials",
    id: "financials",
    href: `/stock/${id}/financials`,
    children: [
      {
        label: "Income Statement",
        href: `/stock/${id}/financials`,
      },
      { label: "Balance Sheet", href: `/stock/${id}/financials/balance-sheet` },
      { label: "Cash Flow", href: `/stock/${id}/financials/cash-flow` },
      { label: "Ratios", href: `/stock/${id}/financials/ratios` },
      { label: "KPIs", href: `/stock/${id}/financials/kpis` },
    ],
  },
  { label: "Forecast", id: "forecast", href: `/stock/${id}/forecast` },
  {
    label: "Statistics",
    id: "statistics",
    href: `/stock/${id}/statistics`,
    children: [
      { label: "Statistics", href: `/stock/${id}/statistics` },
      { label: "Market Cap", href: `/stock/${id}/statistics/market-cap` },
      { label: "Revenue", href: `/stock/${id}/statistics/revenue` },
    ],
  },
  { label: "Dividends", id: "dividends", href: `/stock/${id}/dividends` },
  { label: "History", id: "history", href: `/stock/${id}/history` },
  { label: "Profile", id: "profile", href: `/stock/${id}/profile` },
  { label: "Chart →", id: "chart", href: `/stock/${id}/chart` },
];
