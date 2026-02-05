import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from "chart.js";
import type { ScriptableContext } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

interface ChartProps {
    data: {
        labels: string[];
        prices: number[];
    };
}

const StockChart = ({ data }: ChartProps) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: "Price",
                data: data.prices,
                borderColor: "rgb(255, 165, 0)", // Orange
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "rgba(255, 165, 0, 0.2)");
                    gradient.addColorStop(1, "rgba(255, 165, 0, 0)");
                    return gradient;
                },
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "rgb(255, 165, 0)",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#1f2937",
                padding: 12,
                titleFont: { size: 13 },
                bodyFont: { size: 13 },
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#9ca3af",
                    font: { size: 11 },
                    maxTicksLimit: 8,
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "#f3f4f6",
                },
                ticks: {
                    color: "#9ca3af",
                    font: { size: 11 },
                    callback: (value: any) => '$' + value,
                },
                border: {
                    display: false,
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index' as const,
        },
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Growth</h3>
                <select className="text-sm text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer">
                    <option>Yearly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>
            <div className="flex-1 min-h-[300px]">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default StockChart;
