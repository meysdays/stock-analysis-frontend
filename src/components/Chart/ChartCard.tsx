import type { ReactNode } from "react";
import LineChart from "./LineChart";

interface ChartCardProps {
    title: string;
    labels: string[];
    data: number[];
    className?: string;
    actions?: ReactNode;
    lineColor?: string;
    fillColor?: string;
}

const ChartCard = ({
    title,
    labels,
    data,
    className = "",
    actions,
    lineColor = "#16c784",
    fillColor = "rgba(22, 199, 132, 0.1)",
}: ChartCardProps) => {
    return (
        <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
            <div className="w-full">
                <LineChart
                    labels={labels}
                    data={data}
                    lineColor={lineColor}
                    fillColor={fillColor}
                    height={350}
                />
            </div>
        </div>
    );
};

export default ChartCard;