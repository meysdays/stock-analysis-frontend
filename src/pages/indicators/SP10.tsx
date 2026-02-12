import { mockIndexTenData, mockChartData, calculateStats, formatChartLabels, mockIndexTenLabels } from "../../lib/data-layer";
import LineChart from "../../components/Chart/LineChart";
import DoughnutChart from "../../components/Chart/DoughnutChart";
import MarketTable from "../../components/MarketTable/MarketTable";
import ChartCard from "../../components/Chart/ChartCard";
import IndicatorPageLayout from "../../components/Layout/IndicatorPageLayout";

const SP10 = () => {
  // Get chart data and stats
  const stats = calculateStats(mockChartData);

  return (
    <IndicatorPageLayout
      title="StockPred 10 Index"
      tag="SP10"
      description="Built by the world's most trusted cryptocurrency data authority, the StockPred 10 Index (SP10) provides the most unbiased, transparent, and data-driven way to track the performance of crypto markets."
      stats={stats}
      lineChart={
        <ChartCard
          title="StockPred 10 Index Chart"
          className="h-full"
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
        >
          <LineChart
            labels={formatChartLabels(mockChartData)}
            data={mockChartData.map((item) => item.price)}
            lineColor="#16c784"
            fillColor="#16c7841a"
            height={350}
          />
        </ChartCard>
      }
      marketTable={<MarketTable />}
      doughnutChart={
        <ChartCard title="Top Constituents">
          <DoughnutChart labels={mockIndexTenLabels} data={mockIndexTenData} height={350} />
        </ChartCard>
      }
    />
  );
};

export default SP10;
