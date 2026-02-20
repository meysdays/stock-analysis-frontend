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

interface ComparisonChartProps {
    datasets: {
        label: string;
        data: number[];
        color: string;
    }[];
    labels: string[];
    height?: number;
}

const ComparisonChart = ({
    datasets,
    labels,
    height = 500,
}: ComparisonChartProps) => {
    const chartData = {
        labels,
        datasets: datasets.map((ds) => ({
            label: ds.label,
            data: ds.data,
            borderColor: ds.color,
            backgroundColor: ds.color,
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: ds.color,
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
            borderWidth: 2,
        })),
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
                display: true,
                position: "top",
                align: "end",
                labels: {
                    usePointStyle: false,
                    boxWidth: 12,
                    boxHeight: 12,
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                    padding: 20,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: "#fff",
                titleColor: "#64748b",
                bodyColor: "#1e293b",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                padding: 12,
                multiKeyBackground: "transparent",
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        const val = context.parsed.y;
                        if (val === null || val === undefined) return "";
                        return `${context.dataset.label}: ${val > 0 ? "+" : ""}${val.toFixed(2)}%`;
                    },
                },
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 11,
                    },
                    maxTicksLimit: 8,
                },
                border: {
                    display: false,
                },
            },
            y: {
                display: true,
                position: "right",
                grid: {
                    color: "rgba(226, 232, 240, 0.5)",
                },
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 11,
                    },
                    callback: (value) => `${value}%`,
                },
                border: {
                    display: false,
                },
            },
        },
    };

    return (
        <div style={{ height: `${height}px`, width: "100%" }} className="mt-4">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ComparisonChart;
