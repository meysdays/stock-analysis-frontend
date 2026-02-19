import type { IncomeStatement } from "../../lib/definitions";
import type { TableHeader } from "../Table";
// import type { FinancialItem } from "./types";


export const financialHeaders: TableHeader<IncomeStatement>[] = [
    {
        key: "fiscal_year",
        label: "Fiscal Year",
        align: "left",
        render: (r) => <>{r.period_ending}</>,
    },
    {
        key: "FY2021",
        label: "FY2021",
        align: "right",
        render: (r) => <>{r.FY2021}</>,
    },
    {
        key: "FY2022",
        label: "FY2022",
        align: "right",
        render: (r) => <>{r.FY2022}</>,
    },
    {
        key: "FY2023",
        label: "FY2023",
        align: "right",
        render: (r) => <>{r.FY2023}</>,
    },
    {
        key: "FY2024",
        label: "FY2024",
        align: "right",
        render: (r) => <>{r.FY2024}</>,
    },
    {
        key: "FY2025",
        label: "FY2025",
        align: "right",
        render: (r) => <>{r.FY2025}</>,
    }
];
