import StatisticsCard from "../../../components/StatisticsCard";
import { formatValue } from "../../../utils/utils";
import { useStockPageData } from "../../../hooks/useStockPageData";

export default function StatisticsMain() {
    const { info, stats, isLoading } = useStockPageData();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const symbol = info?.symbol || "Unknown";
    const name = info?.name || "this stock";

    return (
        <StatisticsCard
            symbol={`NGX:${symbol}`}
            description={`${symbol}:${name} statistics overview. This page provides a high-level summary of the company's valuation, profitability, and trading metrics.`}
            stats={[
                { label: "Market Cap", value: formatValue(stats?.market_cap) },
                { label: "PE Ratio", value: formatValue(stats?.pe_ratio) },
                { label: "Revenue (TTM)", value: formatValue(stats?.revenue_ttm) },
                { label: "EPS", value: formatValue(stats?.eps) },
                { label: "Beta", value: formatValue(stats?.beta) },
                { label: "Volume", value: formatValue(stats?.volume) },
            ]}
            sidebarTitle="Statistics Overview"
            sidebarText="Financial statistics provide a quantitative summary of a company's performance and valuation. These metrics help investors assess the company's growth potential and risk profile."
        />
    );
}
