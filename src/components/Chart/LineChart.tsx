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
    type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

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

interface LineChartProps {
    labels: string[];
    data: number[];
    label?: string;
    lineColor?: string;
    fillColor?: string;
    showGrid?: boolean;
    height?: number;
    stepped?: boolean;
    tension?: number;
}

const LineChart = ({
    labels,
    data,
    tension,
    label = "Price",
    lineColor = "#16c784",
    fillColor = "#16c7841a",
    showGrid = true,
    height = 400,
    stepped = false,
}: LineChartProps) => {
    const chartData = {
        labels,
        datasets: [
            {
                label,
                data,
                stepped,
                tension,
                fill: true,
                borderColor: lineColor,
                backgroundColor: fillColor,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: lineColor,
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#1f2937",
                titleColor: "#9ca3af",
                bodyColor: "#fff",
                borderColor: "#374151",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => `₦${context.parsed.y?.toFixed(2) ?? "N/A"}`,
                },
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: showGrid,
                    color: "rgba(156, 163, 175, 0.1)",
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11,
                    },
                    maxTicksLimit: 6,
                },
                border: {
                    display: false,
                },
            },
            y: {
                display: true,
                position: "right",
                grid: {
                    display: showGrid,
                    color: "rgba(156, 163, 175, 0.1)",
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11,
                    },
                    callback: (value) => `₦${value}`,
                },
                border: {
                    display: false,
                },
            },
        },
    };

    return (
        <div style={{ height: `${height}px`, width: "100%" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
