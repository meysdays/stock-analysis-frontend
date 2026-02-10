import SidePanel from "../../components/SidePanel";
import { indicatorTabs } from "../../utils/utils";
import Tab from "../../components/Tab";
import Card from "../../components/Card";
import ChartCard from "../../components/ChartCard";
import { mockChartData, formatChartLabels, extractPrices } from "../../lib/data-layer";

const FearGreed = () => {
    // Get chart data
    const labels = formatChartLabels(mockChartData);
    const prices = extractPrices(mockChartData);

    // Context aware styling helper
    const getSentimentStyle = (value: number) => {
        if (value >= 75) return "bg-green-500 text-white";
        if (value >= 55) return "bg-green-100 text-green-700";
        if (value >= 45) return "bg-yellow-100 text-yellow-800";
        if (value >= 25) return "bg-orange-500 text-white";
        return "bg-red-500 text-white";
    };

    const getSentimentLabel = (value: number) => {
        if (value >= 75) return "Extreme Greed";
        if (value >= 55) return "Greed";
        if (value >= 45) return "Neutral";
        if (value >= 25) return "Fear";
        return "Extreme Fear";
    }

    return (
        <div className="flex h-full bg-[#FDFDFD] overflow-auto">
            <SidePanel />
            <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={indicatorTabs} />

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">CMC Crypto Fear and Greed Index</h1>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            See API Details
                        </button>
                    </div>
                    <p className="text-gray-500 max-w-5xl leading-relaxed">
                        Discover our Fear and Greed Index, a powerful tool that analyzes market sentiment to help you make informed crypto investment decisions. Stay ahead of market trends with real-time and historical data available through our easy-to-use API.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats */}
                    <div className="space-y-6">
                        <Card title="CMC Crypto Fear and Greed Index">
                            {/* Meter Placeholder */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="relative w-48 h-24 overflow-hidden mb-2">
                                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full border-[12px] border-gray-100 border-b-0"></div>
                                    <div className="absolute top-0 left-0 w-full h-full rounded-t-full border-[12px] border-transparent border-t-green-500 border-l-red-500 border-r-green-500 border-b-0 transform rotate-[-45deg] opacity-80"></div>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full z-10"></div>
                                </div>
                                <div className="text-center mt-2">
                                    <span className="block text-4xl font-bold text-gray-900">10</span>
                                    <span className="text-sm font-medium text-gray-500">Extreme Fear</span>
                                </div>
                            </div>
                        </Card>

                        <Card title="Historical Values">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 font-medium">Yesterday</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentStyle(9)}`}>
                                        {getSentimentLabel(9)} - 9
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 font-medium">Last Week</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentStyle(17)}`}>
                                        {getSentimentLabel(17)} - 17
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 font-medium">Last Month</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentStyle(40)}`}>
                                        {getSentimentLabel(40)} - 40
                                    </span>
                                </div>
                            </div>
                        </Card>

                        <Card title="Yearly High and Low">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 font-medium">
                                        Yearly High <span className="text-gray-400 text-xs">(May 23, 2025)</span>
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentStyle(76)}`}>
                                        {getSentimentLabel(76)} - 76
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-500 font-medium">
                                        Yearly Low <span className="text-gray-400 text-xs">(Feb 06, 2026)</span>
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentStyle(5)}`}>
                                        {getSentimentLabel(5)} - 5
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Chart */}
                    <div className="lg:col-span-2">
                        <ChartCard
                            title="Fear and Greed Index Chart"
                            labels={labels}
                            data={prices}
                            lineColor="#16c784"
                            fillColor="rgba(22, 199, 132, 0.1)"
                            actions={
                                <div className="flex items-center gap-1 text-xs">
                                    {["30d", "1y", "All"].map((period) => (
                                        <button
                                            key={period}
                                            className={`px-3 py-1 rounded-md transition-colors ${period === 'All' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            }
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FearGreed;
