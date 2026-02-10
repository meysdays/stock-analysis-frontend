import SidePanel from "../../components/SidePanel";
import { indicatorTabs } from "../../utils/utils";
import Tab from "../../components/Tab";
import Card from "../../components/Card";
import { mockChartData, calculateStats } from "../../lib/data-layer";

const SP30 = () => {
    // Get chart data and stats
    const stats = calculateStats(mockChartData);

    // Format the date for display
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    };

    return (
        <div className="flex h-full bg-[#FDFDFD] overflow-y-auto">
            <SidePanel />
            <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={indicatorTabs} />

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">StockPred 30 Index</h1>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">SP30</span>
                    </div>
                    <p className="text-gray-500 max-w-4xl">
                        Built by the world's most trusted cryptocurrency data authority, the StockPred 30 Index (SP30) provides the most unbiased, transparent, and data-driven way to track the performance of crypto markets.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats */}
                    <div className="space-y-6">
                        <Card title="SP30">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-gray-900">₦{stats.currentPrice.toFixed(2)}</span>
                                <span className={`font-medium text-sm flex items-center ${stats.changePercent24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                                    {stats.changePercent24h >= 0 ? "▲" : "▼"} {Math.abs(stats.changePercent24h).toFixed(2)}% (24h)
                                </span>
                            </div>
                        </Card>

                        <Card title="Historical Values">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 font-medium">Yesterday</span>
                                    <span className="text-gray-900 font-bold">₦{stats.yesterday.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 font-medium">Last Week</span>
                                    <span className="text-gray-900 font-bold">₦{stats.lastWeek.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 font-medium">Last Month</span>
                                    <span className="text-gray-900 font-bold">₦{stats.lastMonth.toFixed(2)}</span>
                                </div>
                            </div>
                        </Card>

                        <Card title="Yearly Performance">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 font-medium">
                                        Yearly High <span className="text-gray-400 text-xs">({formatDate(stats.yearlyHighDate)})</span>
                                    </span>
                                    <span className="text-gray-900 font-bold">₦{stats.yearlyHigh.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-gray-500 font-medium">
                                        Yearly Low <span className="text-gray-400 text-xs">({formatDate(stats.yearlyLowDate)})</span>
                                    </span>
                                    <span className="text-gray-900 font-bold">₦{stats.yearlyLow.toFixed(2)}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Chart Placeholder */}
                    <div className="lg:col-span-2">
                        {/* ChartCard removed as per request "leave the graph for me" */}
                        <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-400">
                            Chart Placeholder
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SP30;
