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
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[#1a5b81]">{chartTitle}</h2>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[20px] text-gray-500">more_vert</span>
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                    <span className="text-xs font-semibold text-gray-500 px-3 py-1">Range</span>
                                    {ranges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => onRangeChange(range)}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${range === selectedRange
                                                ? "bg-white text-[#1a5b81] shadow-sm border border-gray-100"
                                                : "text-gray-400 hover:text-gray-600"
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                    <span>15 Feb 2021</span>
                                    <span className="text-gray-400">→</span>
                                    <span>13 Feb 2026</span>
                                </div>
                            </div>

                            <div className="h-[400px] w-full mt-4">
                                {chartComponent}
                            </div>
                        </div>
                    </div>

                    {/* Summary Info Box */}
                    <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="mt-1">
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                <span className="material-symbols-outlined text-[16px]">info</span>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            {summaryText}
                        </p>
                    </div>
                </div>

                {/* Right Column: Related Stocks */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm max-w-[400px]">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-[#1a5b81]">{relatedStocksTitle}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-sm font-bold text-gray-700">Company</th>
                                        <th className="px-4 py-3 text-sm font-bold text-gray-700 text-right">{historyValueLabel}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {relatedStocks.map((stock, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <a href="#" className="text-[#0073e6] hover:underline font-medium text-base leading-tight">
                                                    {stock.name}
                                                </a>
                                            </td>
                                            <td className="px-4 py-3 text-right text-[#1a1a1a] font-medium text-base">
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
            <div className="bg-white overflow-hidden">
                <div className="p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-black">{historyTitle}</h2>
                    <div className="relative">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            Annual <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700">Date</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">{historyValueLabel}</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-700 text-right">% Change</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {historyData.filter((row) => row.value && row.date).map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                                    <td className="px-6 py-4 text-[#1a1a1a] font-medium">{row.date}</td>
                                    <td className="px-6 py-4 text-right text-[#1a1a1a] font-medium">
                                        {

                                            row.value
                                        }
                                    </td>
                                    <td className={`px-6 py-4 text-right font-medium ${row.isLocked ? "" : row.positive ? "text-emerald-600" : "text-rose-500"}`}>
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
