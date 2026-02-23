import React from "react";
import StatisticsCard from "./StatisticsCard";

interface StatItem {
    label: string;
    value: string;
}

interface TableRow {
    date?: string;
    name?: string;
    cap?: string;
    value?: string;
    change?: string;
    positive?: boolean;
    isLocked?: boolean;
}

interface StatisticPageLayoutProps {
    symbol: string;
    description: string;
    headerStats: StatItem[];
    sidebarTitle: string;
    sidebarText: string;
    chartTitle: string;
    chartComponent: React.ReactNode;
    chartColor?: string;
    chartFillColor?: string;
    selectedRange: string;
    onRangeChange: (range: string) => void;
    ranges: string[];
    summaryText: React.ReactNode;
    relatedStocks: { name: string; value: string }[];
    relatedStocksTitle: string;
    historyTitle: string;
    historyData: TableRow[];
    historyValueLabel: string;
}

const StatisticPageLayout: React.FC<StatisticPageLayoutProps> = ({
    symbol,
    description,
    headerStats,
    sidebarTitle,
    sidebarText,
    chartTitle,
    chartComponent,
    selectedRange,
    onRangeChange,
    ranges,
    summaryText,
    relatedStocks,
    relatedStocksTitle,
    historyTitle,
    historyData,
    historyValueLabel,
}) => {
    return (
        <div className="space-y-8">
            <StatisticsCard
                symbol={symbol}
                description={description}
                stats={headerStats}
                sidebarTitle={sidebarTitle}
                sidebarText={sidebarText}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column: Chart and Summary */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart Section */}
                    <div className="bg-surface-1 rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-link">{chartTitle}</h2>
                                <button className="p-2 hover:bg-background-2 rounded-lg transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px] text-secondary">more_vert</span>
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 bg-background-2 p-1 rounded-lg border border-gray-100">
                                    <span className="text-xs font-semibold text-secondary px-3 py-1">Range</span>
                                    {ranges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => onRangeChange(range)}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${range === selectedRange
                                                ? "bg-surface-1 text-link shadow-sm border border-gray-100"
                                                : "text-caption hover:text-secondary"
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm font-medium text-secondary flex items-center gap-2">
                                    <span>15 Feb 2021</span>
                                    <span className="text-caption">→</span>
                                    <span>13 Feb 2026</span>
                                </div>
                            </div>

                            <div className="h-[400px] w-full mt-4">
                                {chartComponent}
                            </div>
                        </div>
                    </div>

                    {/* Summary Info Box */}
                    <div className="flex items-start gap-4 bg-surface-1 p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="mt-1">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-link text-white">
                                <span className="material-symbols-outlined text-[16px]">info</span>
                            </div>
                        </div>
                        <p className="text-primary leading-relaxed">
                            {summaryText}
                        </p>
                    </div>
                </div>

                {/* Right Column: Related Stocks */}
                <div className="lg:col-span-1">
                    <div className="bg-surface-1 rounded-xl border border-gray-100 overflow-hidden shadow-sm max-w-[400px]">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-link">{relatedStocksTitle}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-background-2 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-sm font-bold text-secondary">Company</th>
                                        <th className="px-4 py-3 text-sm font-bold text-secondary text-right">{historyValueLabel}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {relatedStocks.map((stock, i) => (
                                        <tr key={i} className="hover:bg-background-2 transition-colors">
                                            <td className="px-4 py-3">
                                                <a href="#" className="text-link hover:underline font-medium text-base leading-tight">
                                                    {stock.name}
                                                </a>
                                            </td>
                                            <td className="px-4 py-3 text-right text-primary font-medium text-base">
                                                {stock.value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="bg-surface-1 overflow-hidden rounded-xl border border-gray-100 shadow-sm p-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary">{historyTitle}</h2>
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg text-sm font-semibold text-secondary hover:bg-background-2 transition-colors">
                            Annual <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-background-2/50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-secondary">Date</th>
                                <th className="px-6 py-4 text-sm font-bold text-secondary text-right">{historyValueLabel}</th>
                                <th className="px-6 py-4 text-sm font-bold text-secondary text-right">% Change</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyData.filter((row) => row.value && row.date).map((row, i) => (
                                <tr key={i} className="hover:bg-background-2/30 transition-colors">
                                    <td className="px-6 py-4 text-primary font-medium">{row.date}</td>
                                    <td className="px-6 py-4 text-right text-primary font-medium">
                                        {
                                            row.value
                                        }
                                    </td>
                                    <td className={`px-6 py-4 text-right font-medium ${row.isLocked ? "" : row.positive ? "text-positive" : "text-negative"}`}>
                                        {
                                            row.change
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatisticPageLayout;
