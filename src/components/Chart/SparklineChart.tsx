import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

/**
 * Register Chart.js components needed for line charts.
 * This must be done once before rendering any charts.
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

/**
 * Props for SparklineChart component.
 */
interface SparklineChartProps {
  data?: number[]; // Array of price points (typically last 7 closing prices)
  label?: string; // Optional label for the chart
}

/**
 * SparklineChart component renders a mini line chart using Chart.js.
 * Visualizes 7-day price trends with automatic color coding:
 * - Green if price increased (last >= first)
 * - Red if price decreased (last < first)
 *
 * @param {SparklineChartProps} props - Component props
 * @returns JSX element containing a Chart.js line chart
 */
export default function SparklineChart({
  data = [],
  label = "Price",
}: SparklineChartProps) {
  // Return placeholder if no data
  if (!data || data.length === 0) {
    return <div className="w-34 h-8 bg-gray-100 rounded" />;
  }

  // Determine color: green if uptrend (last >= first), red if downtrend
  const isUptrend = data[data.length - 1] >= data[0];
  const lineColor = isUptrend ? "#10b981" : "#ef4444";
  const backgroundColor = isUptrend ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)";

  // Configuration object for Chart.js line chart
  const chartData = {
    // X-axis labels: day numbers (not shown but needed for chart structure)
    labels: data.map((_, i) => i),
    datasets: [
      {
        label, // Dataset label displayed in tooltip
        data, // Array of price points
        borderColor: lineColor, // Line color (green or red)
        backgroundColor, // Fill color under the line
        fill: true, // Enable area fill under the line
        borderWidth: 2, // Line thickness
        pointRadius: 0, // Hide individual data points (cleaner sparkline look)
        pointHoverRadius: 4, // Show point on hover
        pointBackgroundColor: lineColor, // Point color (matches line)
        tension: 0.4, // Smooth curve instead of sharp angles
        spanGaps: true, // Connect gaps in data
      },
    ],
  };

  // Chart.js configuration options for minimal styling
  const options = {
    responsive: true, // Responsive resizing
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Hide legend for sparkline
      },
      tooltip: {
        mode: "index" as const, // Show tooltip on hover
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark tooltip background
        padding: 6,
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
        callbacks: {
          // Format tooltip label to show price with 2 decimal places
          label: (context: any) => {
            const value = context.raw;
            return `$${typeof value === "number" ? value.toFixed(2) : value}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // Hide X-axis labels
        grid: {
          display: false, // Hide X-axis grid
        },
      },
      y: {
        display: false, // Hide Y-axis labels
        grid: {
          display: false, // Hide Y-axis grid
        },
      },
    },
  };

  // Render the chart
  return (
    <div className="flex justify-center items-center w-28 h-12">
      <Line data={chartData} options={options} />
    </div>
  );
}
