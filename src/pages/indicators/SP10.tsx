import SidePanel from "../../components/SidePanel";
import { indicatorTabs } from "../../utils/utils";
import Tab from "../../components/Tab";
import Card from "../../components/Card";
import ChartCard from "../../components/ChartCard";
import { mockChartData, formatChartLabels, extractPrices, calculateStats } from "../../lib/data-layer";

const SP20 = () => {
  // Get chart data and stats
  const labels = formatChartLabels(mockChartData);
  const prices = extractPrices(mockChartData);
  const stats = calculateStats(mockChartData);

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
            <h1 className="text-2xl font-bold text-gray-900">StockPred 10 Index</h1>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">SP10</span>
          </div>
          <p className="text-gray-500 max-w-4xl">
            Built by the world's most trusted cryptocurrency data authority, the StockPred 10 Index (SP10) provides the most unbiased, transparent, and data-driven way to track the performance of crypto markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="space-y-6">
            <Card title="SP10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">${stats.currentPrice.toFixed(2)}</span>
                <span className={`font-medium text-sm flex items-center ${stats.changePercent24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.changePercent24h >= 0 ? "▲" : "▼"} {Math.abs(stats.changePercent24h).toFixed(2)}% (24h)
                </span>
              </div>
            </Card>

            <Card title="Historical Values">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium">Yesterday</span>
                  <span className="text-gray-900 font-bold">${stats.yesterday.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium">Last Week</span>
                  <span className="text-gray-900 font-bold">${stats.lastWeek.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium">Last Month</span>
                  <span className="text-gray-900 font-bold">${stats.lastMonth.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Card title="Yearly Performance">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium">
                    Yearly High <span className="text-gray-400 text-xs">({formatDate(stats.yearlyHighDate)})</span>
                  </span>
                  <span className="text-gray-900 font-bold">${stats.yearlyHigh.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 font-medium">
                    Yearly Low <span className="text-gray-400 text-xs">({formatDate(stats.yearlyLowDate)})</span>
                  </span>
                  <span className="text-gray-900 font-bold">${stats.yearlyLow.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-2">
            <ChartCard
              title="StockPred 10 Index Chart"
              labels={labels}
              data={prices}
              lineColor="#16c784"
              fillColor="rgba(22, 199, 132, 0.1)"
              actions={
                <div className="flex items-center gap-1 text-xs">
                  {["24h", "7d", "30d", "1y", "All"].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
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

export default SP20;
