import { NavLink } from "react-router-dom";
import type { TableHeader } from "../Table";
import type { MarketItem } from "./types";

export const fmt = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v);

export const fmtLarge = (v: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);

export const defaultHeaders: TableHeader<MarketItem>[] = [
    {
        key: "symbol",
        label: "Symbol",
        align: "left",
        render: (r) => (
            <NavLink to={`/stock/${r.id}`} className="font-bold text-blue-600 hover:underline">
                {r.symbol}
            </NavLink>
        ),
    },
    {
        key: "name",
        label: "Name",
        align: "left",
        render: (r) => <span className="text-gray-900">{r.name}</span>,
    },
    {
        key: "sector",
        label: "Sector",
        align: "left",
        render: (r) => <span className="text-gray-500">{r.sector}</span>,
    },
    {
        key: "industry",
        label: "Industry",
        align: "left",
        render: (r) => <span className="text-gray-400 text-sm">{r.industry}</span>,
    },
    {
        key: "exchange",
        label: "Exchange",
        align: "center",
        render: (r) => (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">
                {r.exchange}
            </span>
        ),
    },
    {
        key: "last_updated",
        label: "Last Updated",
        align: "right",
        render: (r) => (
            <span className="text-gray-400 text-xs">
                {r.last_updated ? new Date(r.last_updated).toLocaleDateString() : "n/a"}
            </span>
        ),
    },
];
