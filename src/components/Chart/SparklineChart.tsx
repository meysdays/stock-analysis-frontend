import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { SparklinePoint } from "../../lib/definitions";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SparklineChartProps {
  data: number[] | SparklinePoint[];
  label?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * A lightweight line chart component designed for high-density dashboards.
 * Displays a trend over time without axis labels or background noise.
 */
export default function SparklineChart({
  data: rawData = [],
  label = "Trend",
}: SparklineChartProps) {
  // Extract values if data is an array of objects
  const data = (rawData || []).map((item) => (typeof item === "number" ? item : item.value));

  // Return placeholder if no data
  if (data.length === 0) {
    return <div className="w-28 h-12 bg-gray-50/50 rounded animate-pulse" />;
  }

  // Determine color: green if uptrend (last >= first), red if downtrend
  const isUptrend = data.length > 0 ? data[data.length - 1] >= data[0] : true;
  const lineColor = isUptrend ? "#359592ff" : "#a62d2dff";

  // Configuration object for Chart.js line chart
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        label,
        data,
        backgroundColor: "transparent",
        borderColor: lineColor,
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }, // Disable tooltips for sparkline
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="flex justify-center items-center w-28 h-12">
      <Line data={chartData} options={options} />
    </div>
  );
}
