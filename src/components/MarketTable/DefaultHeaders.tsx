import { NavLink } from "react-router-dom";
import type { TableHeader } from "../Table";
import type { DashboardItem } from "./types";
// import SparklineChart from "../Chart/SparklineChart";

export const fmt = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v);

export const fmtLarge = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);

export const defaultHeaders: TableHeader<DashboardItem>[] = [
    {
        key: "Symbol",
        label: "Symbol",
        align: "left",
        render: (r) => (
            <NavLink to={`/stock/${r.id}`} className="pointer-events-auto">
                {r.symbol}
            </NavLink>
        ),
    },
    {
        key: "Company Name",
        label: "Company Name",
        align: "right",
        render: (r) => <>{r.companyName}</>,
    },
    {
        key: "marketCap",
        label: "Market Cap",
        align: "right",
        render: (r) => <>${fmtLarge(Number(r.marketCap))}</>,
    },
    {
        key: "stockPrice",
        label: "Stock Price",
        align: "right",
        render: (r) => <>${fmt(Number(r.stockPrice))}</>,
    },
    {
        key: "change",
        label: "Change",
        align: "right",
        render: (r) => <>${fmt(Number(r.change))}</>,
    },
    {
        key: "Company Name",
        label: "Company Name",
        align: "right",
        render: (r) => <>{r.industry}</>,
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
   
    {
        key: "volume",
        label: "Volume",
        align: "right",
        render: (r) => <>${fmtLarge(Number(r.volume))}</>,
    },
    {
        key: "peRatio",
        label: "P/E Ratio",
        align: "right",
        render: (r) => <>{fmt(Number(r.peRatio))}</>,
    }
];
