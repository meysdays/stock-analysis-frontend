import {
    Chart as ChartJS,
    ArcElement,
    type Color as ChartJSColor,
    type ChartData as ChartJSData,
    Tooltip,
    Legend,
    type ChartOptions
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: ChartJS) {
        const { width } = chart;
        const { height } = chart;
        const { ctx } = chart;

        ctx.save();
        ctx.font = "bold 20px  Inter";
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Top Constituents", width / 2, height / 2 - 10);
        ctx.restore();
    }
}

ChartJS.register(ArcElement);



interface DoughnutChartProps {
    labels: string[];
    data: number[];
    label?: string;
    colors?: ChartJSColor[];
    height?: number;
}

const defaultColors: ChartJSColor[] = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#F97316",
    "#84CC16",
    "#14B8A6",
    "#9CA3AF"
];


const DoughnutChart = ({
    labels,
    data,
    label = "%",
    colors = defaultColors,
    height = 350,
}: DoughnutChartProps) => {




    const chartData: ChartJSData<"doughnut"> = {
        labels,
        datasets: [
            {
                label,
                data,
                backgroundColor: colors,
                borderColor: colors,
                spacing: 4,
                borderWidth: 0,
                hoverOffset: 12,
                borderRadius: 12
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        cutout: "70%",
        maintainAspectRatio: false,
        layout: {
            padding: 20
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: false   // 👈 hides labels on chart
            },

            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#333333",
                bodyColor: "#000000",
                borderColor: "#374151",
                borderWidth: 1,
            }
        },
    };

    return (
        <div style={{ height: `${height}px`, width: "100%" }} className="flex justify-center">
            <div style={{ height: "100%", width: "100%", maxWidth: `${height}px` }}>
                <Doughnut data={chartData} options={options} plugins={[centerTextPlugin, Tooltip, Legend, ChartDataLabels]} />
            </div>
        </div>
    );
};

export default DoughnutChart;
