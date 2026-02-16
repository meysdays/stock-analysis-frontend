import {
    Chart as ChartJS,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
    type ChartData as ChartJSData,
    type ChartOptions,
    type Plugin
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(PointElement, LinearScale,);

// Mock data generator for demonstrating the chart

const backgroundZonesPlugin: Plugin<"bubble"> = {
    id: "backgroundZones",
    beforeDraw(chart, _args, _options) {
        const { ctx, chartArea, scales } = chart;
        const { left, right } = chartArea;

        ctx.save();
        const y = scales.y;

        const zones = [
            { min: 0, max: 30, color: "rgba(18, 159, 106, 0.4)" },
            { min: 30, max: 40, color: "rgba(13, 119, 79, 0.4)" },
            { min: 40, max: 60, color: "rgba(238, 238, 238, 0.4)" },
            { min: 60, max: 70, color: "rgba(140, 34, 40, 0.4)" },
            { min: 70, max: 100, color: "rgba(211, 51, 60, 0.4)" },
        ]


        zones.forEach(zone => {
            const y1 = y.getPixelForValue(zone.min);
            const y2 = y.getPixelForValue(zone.max);
            ctx.fillStyle = zone.color;
            ctx.fillRect(left, y1, right - left, y2 - y1);
        });
        ctx.restore();
    }
}

interface BubbleChartProps {
    data: ChartJSData<"bubble">;
    height?: number;
}

const BubbleChart = ({
    data,
    height = 450,
}: BubbleChartProps) => {

    const options: ChartOptions<"bubble"> = {
        maintainAspectRatio: false,
        layout: {
            padding: 20
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)"
                },
                title: {
                    display: true,
                    text: 'RSI Value'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    boxWidth: 8
                }
            },
            datalabels: {
                display: false
            },
            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#333333",
                bodyColor: "#000000",
                borderColor: "#374151",
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: (context) => {
                        const point = context.raw as { x: number, y: number, r: number };
                        return `RSI: ${point.y}, Vol: ${point.r}`;
                    }
                }
            }
        },
    };

    return (
        <div style={{ height: `${height}px`, width: "100%" }} className="flex justify-center">
            <div className="w-full h-full">
                <Bubble data={data} options={options} plugins={[ChartDataLabels, Legend, Tooltip, backgroundZonesPlugin]} />
            </div>
        </div>
    );
};

export default BubbleChart;
