import {
    Chart as ChartJS,
    PointElement,
    LinearScale,
    Tooltip,
    Legend,
    type ChartData as ChartJSData,
    type ChartOptions
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary Chart.js components
ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

// Mock data generator for demonstrating the chart
export const mockBubbleData: ChartJSData<"bubble"> = {
    datasets: [
        {
            label: 'Oversold',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 50, max: 100 }),
                y: faker.number.int({ min: 0, max: 30 }),
                r: faker.number.int({ min: 5, max: 15 }),
            })),
            backgroundColor: '#129f6a',
        },
        {
            label: 'Weak',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 30, max: 40 }),
                r: faker.number.int({ min: 5, max: 15 }),
            })),
            backgroundColor: '#0d774f',
        },
        {
            label: 'Neutral',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 15, max: 100 }),
                y: faker.number.int({ min: 40, max: 60 }),
                r: faker.number.int({ min: 5, max: 15 }),
            })),
            backgroundColor: '#eee',
        },
        {
            label: 'Strong',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 60, max: 70 }),
                r: faker.number.int({ min: 5, max: 15 }),
            })),
            backgroundColor: '#8c2228',
        },
        {
            label: 'Overbought',
            data: Array.from({ length: 20 }).map(() => ({
                x: faker.number.int({ min: 35, max: 100 }),
                y: faker.number.int({ min: 70, max: 90 }),
                r: faker.number.int({ min: 5, max: 15 }),
            })),
            backgroundColor: '#d3333c',
        },
    ],
};

interface BubbleChartProps {
    data?: ChartJSData<"bubble">;
    height?: number;
}

const BubbleChart = ({
    data = mockBubbleData,
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
                <Bubble data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </div>
    );
};

export default BubbleChart;
