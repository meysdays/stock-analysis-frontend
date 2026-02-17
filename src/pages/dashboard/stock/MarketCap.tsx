import { useState, useMemo, useEffect } from "react";
import { formatValue, generateMockMarketCapData } from "../../../utils/utils";
import { useStockPageData } from "../../../hooks/useStockPageData";
import StatisticPageLayout from "../../../components/StatisticPageLayout";
import LineChart from "../../../components/Chart/LineChart";
import { useParams } from "react-router-dom";
import { getRelatedStocks } from "../../../lib/data";

export default function MarketCap() {
    const { id } = useParams<{ id: string }>();
    const { info, stats, isLoading: isLoadingMain } = useStockPageData();
    const [isRelatedLoading, setIsRelatedLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState("1M");
    const [relatedStocks, setRelatedStocks] = useState<any[]>([]);

    const ranges = ["1M", "6M", "YTD", "1Y", "3Y", "5Y"];

    const mockChartData = useMemo(() => {
        return generateMockMarketCapData(selectedRange);
    }, [selectedRange]);

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

        fetchRelated();
    }, [id]);

    if (isLoadingMain || isRelatedLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const symbol = info?.symbol || "Unknown";
    const name = info?.name || "this stock";
    const marketCapFormatted = formatValue(stats?.market_cap);

    const historyData = [
        { date: "Feb 13, 2026", value: "14.87T", change: "38.73%", positive: true },
        { date: "Dec 31, 2025", value: "10.72T", change: "155.54%", positive: true },
        { date: "Dec 31, 2024", value: "4.19T", change: "-24.24%", positive: false },
        { date: "Dec 29, 2023", value: "5.54T", change: "26.66%", positive: true },
        { date: "Dec 30, 2022", value: "4.37T", change: "8.98%", positive: true },
        { date: "Dec 31, 2021", value: "4.01T", change: "15.95%", positive: true },
        { date: "Dec 31, 2020", isLocked: true },
        { date: "Dec 31, 2019", isLocked: true },
        { date: "May 20, 2019", isLocked: true },
    ];

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
                labels={mockChartData.labels}
                data={mockChartData.data}
                lineColor="#1a5b81"
                fillColor="rgba(26, 91, 129, 0.05)"
                height={400}
            />}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            ranges={ranges}
            summaryText={
                <>
                    Since May 20, 2019, <span className="font-bold">NGX:{symbol}</span>'s market cap has increased from 2.44T to {marketCapFormatted}, an increase of <span className="text-emerald-600 font-bold">509.89%</span>. That is a compound annual growth rate of <span className="font-bold">30.76%</span>.
                </>
            }
            relatedStocks={relatedStocksFormatted}
            relatedStocksTitle="Related Stocks"
            historyTitle="Market Cap History"
            historyData={historyData}
            historyValueLabel="Market Cap"
        />
    );
}
