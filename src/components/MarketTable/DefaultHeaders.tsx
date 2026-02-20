import { NavLink } from "react-router-dom";
import type { TableHeader } from "../Table";
import type { MarketItem } from "./types";
import SparklineChart from "../Chart/SparklineChart";

export const fmt = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v);

export const fmtLarge = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 0, notation: 'compact' }).format(v);

// --- Shared Renderers with Simplified Styling ---

const SymbolCell = (r: MarketItem) => (
    <NavLink to={`/stock/${r.id}`} className="font-regular text-black hover:underline">
        {r.symbol}
    </NavLink>
);

const NameCell = (r: MarketItem) => <span className="text-gray-900">{r.name}</span>;

const PriceCell = (r: MarketItem) => <span className="text-gray-900 font-medium">₦{fmt(r.price)}</span>;

const PercentCell = (v: number | null) => {
    if (v === null) return <span className="text-gray-400 font-medium">n/a</span>;
    const isPositive = v >= 0;
    return (
        <span className={isPositive ? "text-emerald-600 font-medium" : "text-rose-600 font-medium"}>
            {isPositive ? "+" : ""}{fmt(v)}%
        </span>
    );
};

const MarketCapCell = (r: MarketItem) => <span className="text-gray-600">₦{fmtLarge(r.market_cap)}</span>;

// --- Specialized Header Sets ---

export const homeHeaders: TableHeader<MarketItem>[] = [
    { key: "symbol", label: "Symbol", align: "left", render: SymbolCell },
    { key: "name", label: "Name", align: "left", render: NameCell },
    { key: "price", label: "Price", align: "right", render: PriceCell },
    {
        key: "change_1h",
        label: "1h %",
        align: "right",
        render: (r) => PercentCell(r.change_1h),
    },
    {
        key: "change_24h",
        label: "24h %",
        align: "right",
        render: (r) => PercentCell(r.change_24h),
    },
    {
        key: "change_7d",
        label: "7d %",
        align: "right",
        render: (r) => PercentCell(r.change_7d),
    },
    { key: "market_cap", label: "Market Cap", align: "right", render: MarketCapCell },
    {
        key: "volume_24h",
        label: "Volume (24h)",
        align: "right",
        render: (r) => <span className="text-gray-600">₦{fmtLarge(r.volume_24h)}</span>,
    },
    {
        key: "sparkline",
        label: "Last 7 Days",
        align: "center",
        render: (r) => <SparklineChart data={r.sparkline_7d as number[]} />,
    },
    // {
    //     key: "percent1h",
    //     label: "1h %",
    //     align: "right",
    //     render: (r) => (
    //         <span className={r.percent1h >= 0 ? "text-green-600" : "text-red-600"}>
    //             {r.percent1h >= 0 ? "+" : ""}
    //             {fmt(r.percent1h)}%
    //         </span>
    //     ),
    // },
    // {
    //     key: "percent24h",
    //     label: "24h %",
    //     align: "right",
    //     render: (r) => (
    //         <span className={r.percent24h >= 0 ? "text-green-600" : "text-red-600"}>
    //             {r.percent24h >= 0 ? "+" : ""}
    //             {fmt(r.percent24h)}%
    //         </span>
    //     ),
    // },
    // {
    //     key: "percent7d",
    //     label: "7d %",
    //     align: "right",
    //     render: (r) => (
    //         <span className={r.percent7d >= 0 ? "text-green-600" : "text-red-600"}>
    //             {r.percent7d >= 0 ? "+" : ""}
    //             {fmt(r.percent7d)}%
    //         </span>
    //     ),
    // },

];


export const defaultHeaders = homeHeaders;
