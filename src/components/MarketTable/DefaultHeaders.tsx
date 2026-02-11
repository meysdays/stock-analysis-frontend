import { NavLink } from "react-router-dom";
import type { TableHeader } from "../Table";
import type { MarketItem } from "./types";
import SparklineChart from "../Chart/SparklineChart";

export const fmt = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v);

export const fmtLarge = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);

export const defaultHeaders: TableHeader<MarketItem>[] = [
    {
        key: "name",
        label: "Name",
        align: "left",
        render: (r) => (
            <NavLink to={`/stock/${r.id}`} className="pointer-events-auto">
                {r.name}
            </NavLink>
        ),
    },
    {
        key: "price",
        label: "Price",
        align: "right",
        render: (r) => <>${fmt(r.price)}</>,
    },
    {
        key: "percent1h",
        label: "1h %",
        align: "right",
        render: (r) => (
            <span className={r.percent1h >= 0 ? "text-green-600" : "text-red-600"}>
                {r.percent1h >= 0 ? "+" : ""}
                {fmt(r.percent1h)}%
            </span>
        ),
    },
    {
        key: "percent24h",
        label: "24h %",
        align: "right",
        render: (r) => (
            <span className={r.percent24h >= 0 ? "text-green-600" : "text-red-600"}>
                {r.percent24h >= 0 ? "+" : ""}
                {fmt(r.percent24h)}%
            </span>
        ),
    },
    {
        key: "percent7d",
        label: "7d %",
        align: "right",
        render: (r) => (
            <span className={r.percent7d >= 0 ? "text-green-600" : "text-red-600"}>
                {r.percent7d >= 0 ? "+" : ""}
                {fmt(r.percent7d)}%
            </span>
        ),
    },
    {
        key: "marketCap",
        label: "Market Cap",
        align: "right",
        render: (r) => <>${fmtLarge(r.marketCap)}</>,
    },
    {
        key: "volume24h",
        label: "Volume(24h)",
        align: "right",
        render: (r) => <>${fmtLarge(r.volume24h)}</>,
    },
    {
        key: "circulatingSupply",
        label: "Circulating Supply",
        align: "right",
        render: (r) => <>{fmtLarge(r.circulatingSupply)}</>,
    },
    {
        key: "sparkline7d",
        label: "Last 7 Days",
        align: "center",
        render: (r) => <SparklineChart data={r.sparkline7d} label="7-Day Trend" />,
    },
];
