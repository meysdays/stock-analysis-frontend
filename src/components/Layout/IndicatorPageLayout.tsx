import type { ReactNode } from "react";
import SidePanel from "../Navigation/SidePanel";
import { indicatorTabs } from "../../utils/utils";
import Tab from "../Navigation/Tab";
import Card from "../Card";

interface StatsData {
    currentPrice: number;
    changePercent24h: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    yearlyHigh: number;
    yearlyHighDate: string;
    yearlyLow: number;
    yearlyLowDate: string;
}

interface IndicatorPageLayoutProps {
    title: string;
    tag: string;
    description: string;
    stats: StatsData;
    lineChart: ReactNode;
    marketTable: ReactNode;
    doughnutChart: ReactNode;
}

const IndicatorPageLayout = ({
    title,
    tag,
    description,
    stats,
    lineChart,
    marketTable,
    doughnutChart,
}: IndicatorPageLayoutProps) => {
    // Format the date for display
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    };

    return (
        <div className="flex h-full bg-[#FDFDFD]">
            <SidePanel />
            <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={indicatorTabs} />

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">{tag}</span>
                    </div>
                    <p className="text-gray-500 max-w-4xl">{description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[repeat(4,auto)] gap-6">
                    {/* Stats Cards */}
                    <Card title={tag} className="lg:col-start-1 lg:row-start-1 p-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-gray-900">₦{stats.currentPrice.toFixed(2)}</span>
                            <span className={`font-medium text-sm flex items-center ${stats.changePercent24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {stats.changePercent24h >= 0 ? "▲" : "▼"} {Math.abs(stats.changePercent24h).toFixed(2)}% (24h)
                            </span>
                        </div>
                    </Card>

                    <Card title="Historical Values" className="lg:col-start-1 lg:row-start-2 p-4">
                        <div className="space-y-1">
                            <div className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-xs">Yesterday</span>
                                <span className="text-gray-900 font-bold">₦{stats.yesterday.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-xs">Last Week</span>
                                <span className="text-gray-900 font-bold">₦{stats.lastWeek.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-xs">Last Month</span>
                                <span className="text-gray-900 font-bold">₦{stats.lastMonth.toFixed(2)}</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Yearly Performance" className="lg:col-start-1 lg:row-start-3 p-4">
                        <div className="space-y-1">
                            <div className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-xs">
                                    Yearly High <span className="text-gray-400 text-xs">({formatDate(stats.yearlyHighDate)})</span>
                                </span>
                                <span className="text-gray-900 font-bold">₦{stats.yearlyHigh.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-xs">
                                    Yearly Low <span className="text-gray-400 text-xs">({formatDate(stats.yearlyLowDate)})</span>
                                </span>
                                <span className="text-gray-900 font-bold">₦{stats.yearlyLow.toFixed(2)}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Main Chart */}
                    <div className="lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-3">
                        {lineChart}
                    </div>

                    {/* Market Table */}
                    <div className="lg:col-start-1 lg:col-span-2 lg:row-start-4 h-[450px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {marketTable}
                    </div>

                    {/* Doughnut Chart */}
                    <div className="lg:col-start-3 lg:row-start-4">
                        {doughnutChart}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IndicatorPageLayout;
