import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getKlines, getStockStats } from "../../../lib/data";
import type { KlineData, StockStatsResponse } from "../../../lib/definitions";
import LineChart from "../../../components/Chart/LineChart";


const Summary = () => {
    const { id } = useParams<{ id: string }>();
    const [klines, setKlines] = useState<KlineData[]>([]);
    const [stats, setStats] = useState<StockStatsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState("1M");

    const rangeConfig: Record<string, { interval: string; limit: number }> = {
        "1W": { interval: "week", limit: 24 },
        "1M": { interval: "month", limit: 12 },
        "YTD": { interval: "year", limit: 2 },
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const config = rangeConfig[selectedRange];

                const [klineData, statsData] = await Promise.all([
                    getKlines(Number(id), config.interval, config.limit),
                    getStockStats(Number(id))
                ]);

                // Add defensive check for klines data
                console.log("Kline data received:", klineData);

                if (klineData && Array.isArray(klineData.klines)) {
                    setKlines([...klineData.klines].reverse());
                } else {
                    console.error("Invalid klines data structure:", klineData);
                    setKlines([]);
                }

                setStats(statsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setKlines([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, selectedRange]);

    const formatValue = (value: any, suffix: string = "") => {
        if (value === null || value === undefined || value === "") return "n/a";
        if (typeof value === "number") {
            // Basic formatting for large numbers
            if (value >= 1e12) return (value / 1e12).toFixed(2) + "T" + suffix;
            if (value >= 1e9) return (value / 1e9).toFixed(2) + "B" + suffix;
            if (value >= 1e6) return (value / 1e6).toFixed(2) + "M" + suffix;
            return value.toLocaleString() + suffix;
        }
        return value + suffix;
    };

    const metricsLeft = [
        { label: "Market Cap", value: formatValue(stats?.market_cap) },
        { label: "Revenue (ttm)", value: formatValue(stats?.revenue_ttm) },
        { label: "Net Income", value: formatValue(stats?.net_income) },
        { label: "EPS", value: formatValue(stats?.eps) },
        { label: "Shares Out", value: formatValue(stats?.shares_outstanding) },
        { label: "PE Ratio", value: formatValue(stats?.pe_ratio) },
        { label: "Forward PE", value: formatValue(stats?.forward_pe) },
        { label: "Dividend", value: formatValue(stats?.dividend) },
        { label: "Ex-Dividend Date", value: formatValue(stats?.ex_dividend_date) },
    ];

    const metricsRight = [
        { label: "Volume", value: formatValue(stats?.volume) },
        { label: "Average Volume", value: formatValue(stats?.avg_volume) },
        { label: "Open", value: formatValue(stats?.open) },
        { label: "Previous Close", value: formatValue(stats?.previous_close) },
        { label: "Day's Range", value: formatValue(stats?.day_range) },
        { label: "52-Week Range", value: formatValue(stats?.fifty_two_week_range) },
        { label: "Beta", value: formatValue(stats?.beta) },
        { label: "RSI", value: formatValue(stats?.rsi) },
        { label: "Earnings Date", value: formatValue(stats?.earnings_date) },
    ];

    const timeRanges = ["1W", "1M", "YTD"];

    return (
        <div className="bg-surface-1 px-6">
            <div className="grid grid-cols-12 gap-12">
                {/* Metrics Section */}
                <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-x-10">
                    <div className="space-y-0 text-[13px]">
                        {metricsLeft.map((m, i) => (
                            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 h-[46px]">
                                <span className="text-secondary font-medium underline decoration-gray-100 underline-offset-4 cursor-help">{m.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-primary font-bold">{m.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-0 text-[13px]">
                        {metricsRight.map((m, i) => (
                            <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 h-[46px]">
                                <span className="text-secondary font-medium">{m.label}</span>
                                <span className="text-primary font-bold">{m.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart Section */}
                <div className="col-span-12 lg:col-span-7 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex bg-background-2 p-1 rounded-lg">
                            {timeRanges.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setSelectedRange(range)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${range === selectedRange
                                        ? "bg-surface-1 text-primary shadow-sm"
                                        : "text-secondary hover:text-primary"
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <div className="text-right">
                            <span className="text-positive font-bold text-lg">+14.38%</span>
                            <span className="text-caption text-sm ml-1">({selectedRange})</span>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 min-h-[350px] relative">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-background-1/30 rounded-xl border border-gray-100">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-positive"></div>
                            </div>
                        ) : klines.length > 0 ? (
                            <LineChart
                                labels={klines.map(k => {
                                    const date = new Date(k.date);
                                    if (selectedRange === "1W") {
                                        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                                    }
                                    return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
                                })}
                                data={klines.map(k => k.close)}
                                height={350}
                                stepped={true}
                                lineColor="#1a5b81" // emerald-500
                                fillColor="rgba(26, 91, 129, 0.05)"
                                showGrid={true}
                            />
                        ) : (
                            <div className="absolute inset-0 border border-dashed border-gray-100 rounded-xl flex items-center justify-center bg-background-1/30">
                                <div className="text-center">
                                    <p className="text-caption font-medium">No chart data available</p>
                                    <p className="text-gray-500 text-xs mt-1">Try a different stocks or check back later</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
