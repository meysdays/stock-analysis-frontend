import { useState, useMemo, useEffect } from "react";
import { formatValue } from "../../../utils/utils";
import { useStockPageData } from "../../../hooks/useStockPageData";
import StatisticPageLayout from "../../../components/StatisticPageLayout";
import LineChart from "../../../components/Chart/LineChart";
import { useParams } from "react-router-dom";
import { getRelatedStocks, getMarketCapHistory } from "../../../lib/data";
import type { MarketCapHistoryItem } from "../../../lib/definitions";

export default function MarketCap() {
    const { id } = useParams<{ id: string }>();
    const { info, stats, isLoading: isLoadingMain } = useStockPageData();
    const [isRelatedLoading, setIsRelatedLoading] = useState(true);
    const [isHistoryLoading, setIsHistoryLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState("1M");
    const [relatedStocks, setRelatedStocks] = useState<any[]>([]);
    const [history, setHistory] = useState<MarketCapHistoryItem[]>([]);

    const ranges = ["1M", "6M", "YTD", "1Y", "3Y", "5Y"];

    useEffect(() => {
        const fetchRelated = async () => {
            if (!id) return;
            try {
                setIsRelatedLoading(true);
                const relatedStocksData = await getRelatedStocks(Number(id));
                setRelatedStocks(relatedStocksData);
            } catch (err) {
                console.error("Failed to fetch related stocks:", err);
            } finally {
                setIsRelatedLoading(false);
            }
        };

        const fetchHistory = async () => {
            if (!id) return;
            try {
                setIsHistoryLoading(true);
                // Map range to limit if needed, for now use default 500
                const response = await getMarketCapHistory(Number(id), 500);
                setHistory(response.history);
            } catch (err) {
                console.error("Failed to fetch market cap history:", err);
            } finally {
                setIsHistoryLoading(false);
            }
        };

        fetchRelated();
        fetchHistory();
    }, [id]);

    const chartData = useMemo(() => {
        if (!history.length) return { labels: [], data: [] };

        // Simple range filtering logic based on history data dates
        const now = new Date();
        let filtered = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const months = selectedRange.includes("M") ? parseInt(selectedRange) : 0;
        const years = selectedRange.includes("Y") ? parseInt(selectedRange) : 0;

        if (months || years || selectedRange === "YTD") {
            const startDate = new Date();
            if (selectedRange === "YTD") {
                startDate.setMonth(0, 1);
            } else if (months) {
                startDate.setMonth(now.getMonth() - months);
            } else if (years) {
                startDate.setFullYear(now.getFullYear() - years);
            }
            filtered = filtered.filter(item => new Date(item.date) >= startDate);
        }

        return {
            labels: filtered.map(item => new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })),
            data: filtered.map(item => item.market_cap || 0)
        };
    }, [history, selectedRange]);

    if (isLoadingMain || isRelatedLoading || isHistoryLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const symbol = info?.symbol || "Unknown";
    const name = info?.name || "this stock";
    const marketCapFormatted = formatValue(stats?.market_cap);

    const historyDataFormatted = history.slice(0, 10).map((item, index, arr) => {
        const nextItem = arr[index + 1];
        let change = "n/a";
        let positive = true;

        if (nextItem && item.market_cap && nextItem.market_cap) {
            const diff = item.market_cap - nextItem.market_cap;
            const percent = (diff / nextItem.market_cap) * 100;
            change = `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
            positive = percent >= 0;
        }

        return {
            date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            value: formatValue(item.market_cap),
            change,
            positive
        };
    });

    const relatedStocksFormatted = relatedStocks?.map((stock) => ({
        name: stock?.symbol || "Unknown",
        value: formatValue(stock?.market_cap),
    }));

    return (
        <StatisticPageLayout
            symbol={`NGX:${symbol}`}
            description={`${symbol}:${name} has a market cap or net worth of ${marketCapFormatted} as of today. Market capitalization is the total value of all of a company's outstanding shares.`}
            headerStats={[
                { label: "Market Cap", value: marketCapFormatted },
                { label: "Enterprise Value", value: "n/a" },
                { label: "Revenue", value: formatValue(stats?.revenue_ttm) },
                { label: "Ranking", value: "n/a" },
                { label: "PE Ratio", value: formatValue(stats?.pe_ratio) },
                { label: "Stock Price", value: formatValue(stats?.previous_close) },
            ]}
            sidebarTitle="Market Capitalization"
            sidebarText="Market capitalization, also called net worth, is the total value of all of a company's outstanding shares. It is calculated by multiplying the stock price by the number of shares outstanding. Formula: Market Cap = Stock Price × Shares Outstanding."
            chartTitle="Market Cap Chart"
            chartComponent={<LineChart
                labels={chartData.labels}
                data={chartData.data}
                lineColor="#1a5b81"
                fillColor="rgba(26, 91, 129, 0.05)"
                height={400}
            />}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            ranges={ranges}
            summaryText={
                <>
                    {history.length > 1 && (
                        <>
                            Since {new Date(history[history.length - 1].date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}, <span className="font-bold">NGX:{symbol}</span>'s market cap has changed from {formatValue(history[history.length - 1].market_cap)} to {marketCapFormatted}.
                        </>
                    )}
                </>
            }
            relatedStocks={relatedStocksFormatted}
            relatedStocksTitle="Related Stocks"
            historyTitle="Market Cap History"
            historyData={historyDataFormatted}
            historyValueLabel="Market Cap"
        />
    );
}
