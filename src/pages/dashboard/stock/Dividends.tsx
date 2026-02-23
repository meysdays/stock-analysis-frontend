import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getDividends } from "../../../lib/data";
import { useStockPageData } from "../../../hooks/useStockPageData";
import type { DividendData } from "../../../lib/definitions";
import LineChart from "../../../components/Chart/LineChart";
import StatisticsCard from "../../../components/StatisticsCard";

const Dividends = () => {
    const { id } = useParams<{ id: string }>();
    const { info, stats } = useStockPageData();
    const [dividends, setDividends] = useState<DividendData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartMode, setChartMode] = useState<"All" | "TTM">("All");

    useEffect(() => {
        const fetchDividends = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const response = await getDividends(Number(id));
                setDividends(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Failed to fetch dividends:", error);
                setDividends([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDividends();
    }, [id]);

    const formatDate = (dateStr: string | null | undefined) => {
        if (!dateStr) return "n/a";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatCurrency = (val: number | null | undefined) => {
        if (val === null || val === undefined) return "n/a";
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(val);
    };

    const formatPercent = (val: number | null | undefined) => {
        if (val === null || val === undefined) return "n/a";
        return `${val.toFixed(2)}%`;
    };

    const dividendStats = [
        { label: "Dividend Yield", value: formatPercent(stats?.dividend_per_share ? (stats.dividend_per_share / (stats.previous_close || 1)) * 100 : null) },
        { label: "Annual Dividend", value: formatCurrency(stats?.dividend_per_share) },
        { label: "Ex-Dividend Date", value: formatDate(stats?.ex_div_date) },
        { label: "Payout Frequency", value: stats?.payout_frequency || "Annual" },
        { label: "Payout Ratio", value: formatPercent(stats?.payout_ratio) },
        { label: "Dividend Growth", value: formatPercent(stats?.dividend_growth) },
    ];

    const chartData = useMemo(() => {
        if (!dividends.length) return { labels: [], values: [] };

        const sorted = [...dividends].sort((a, b) =>
            new Date(a.ex_dividend_date || 0).getTime() - new Date(b.ex_dividend_date || 0).getTime()
        );

        let filtered = sorted;
        if (chartMode === "TTM") {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            filtered = sorted.filter(d => d.ex_dividend_date && new Date(d.ex_dividend_date) >= oneYearAgo);
        }

        return {
            labels: filtered.map(d => formatDate(d.ex_dividend_date)),
            values: filtered.map(d => d.amount || 0)
        };
    }, [dividends, chartMode]);

    const annualDiv = formatCurrency(stats?.dividend_per_share);
    const divYield = formatPercent(stats?.dividend_per_share ? (stats.dividend_per_share / (stats.previous_close || 1)) * 100 : null);
    const exDate = formatDate(stats?.ex_div_date);

    return (
        <div className="space-y-4">
            <StatisticsCard
                symbol={`${info?.name || "Stock"} Dividends`}
                description={`${info?.symbol || "STOCK"} pays an annual dividend of ${annualDiv} per share, with a dividend yield of ${divYield}. The next dividend ex-date is ${exDate}.`}
                stats={dividendStats}
                sidebarTitle="Dividend Information"
                sidebarText="A dividend is a distribution of a portion of a company's earnings, decided and managed by the company's board of directors, and paid to a class of its shareholders."
            />

            {/* Dividend History Table */}
            <div className="bg-surface-1 rounded-xl  overflow-hidden mt-8 ">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-primary">Dividend History</h2>
                    <p className="text-sm text-secondary">Historical dividend payments and yield.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-background-2 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-caption uppercase tracking-wider">Ex-Dividend Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-caption uppercase tracking-wider text-right">Dividend Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-caption uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-caption uppercase tracking-wider">Frequency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-link"></div>
                                    </td>
                                </tr>
                            ) : dividends.length > 0 ? (
                                dividends.map((div, i) => (
                                    <tr key={i} className="hover:bg-background-2 transition-colors">
                                        <td className="px-6 py-4 text-sm text-primary font-medium">
                                            {formatDate(div.ex_dividend_date)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-primary font-bold text-right">
                                            {div.currency === "NGN" ? "₦" : div.currency}{div.amount?.toFixed(2) || "0.00"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary">
                                            {formatDate(div.pay_date)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-secondary">
                                            {div.frequency || "Annual"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-secondary italic">
                                        No dividend history available for this stock.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dividend Charts Section */}
            <div className="bg-surface-1 p-6 mt-8 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary">Dividend Charts</h2>
                    <div className="flex bg-background-2 p-1 rounded-lg">
                        {(["All", "TTM"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setChartMode(mode)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${chartMode === mode
                                    ? "bg-surface-1 text-primary shadow-sm"
                                    : "text-secondary hover:text-primary"
                                    }`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative border border-gray-100 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">

                        <h3 className="text-lg font-bold text-primary">
                            NGX:{info?.symbol || "STOCK"} Dividends
                        </h3>
                        <button className="p-1 hover:bg-background-2 rounded transition-colors">
                            <span className="material-symbols-outlined text-caption">more_vert</span>
                        </button>
                    </div>

                    <div className="h-[400px] w-full">
                        {isLoading ? (
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-link"></div>
                            </div>
                        ) : chartData.values.length > 0 ? (
                            <LineChart
                                labels={chartData.labels}
                                data={chartData.values}
                                height={400}
                                stepped={false}
                                tension={0}
                                lineColor="#1a5b81"
                                fillColor="rgba(26, 91, 129, 0.05)"
                                showGrid={true}
                            />
                        ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center text-caption border border-dashed border-gray-100 rounded-xl bg-background-1/30">
                                <span className="material-symbols-outlined text-4xl mb-2">bar_chart</span>
                                <p className="font-medium">Insufficient data for chart</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dividends;
