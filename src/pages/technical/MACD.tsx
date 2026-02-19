import Card from "../../components/Card";
import ChartCard from "../../components/Chart/ChartCard";
import TechnicalIndicatorLayout from "../../components/Layout/TechnicalIndicatorLayout";
import { mockBubbleData } from "../../utils/utils";
import BubbleChart from "../../components/Chart/BubbleChart";

const AverageMACD = () => {
    const value = 0.4;
    return (
        <div className="mx-auto">
            <div className="mt-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
                <div className="flex justify-between w-full text-xs text-gray-500 mt-2 gap-12">
                    <span>Positive</span>
                    <span>Negative</span>
                </div>
            </div>
            <div className="w-full mt-2 h-1.5 bg-gray-200 rounded-full relative">
                <div className="absolute top-0 left-0 h-full bg-[#16c784] w-[50%]"></div>
                <div className="absolute top-0 left-[50%] h-full bg-[#ea3943] w-[50%]"></div>
                <div className="absolute top-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: `${value * 100}%` }}></div>
            </div>
        </div>
    )
}

const MACDSignalStatus = () => {
    const value = { "positive": 85, "negative": 15 };
    return (
        <div className="space-y-3 pt-1">
            <div className="flex justify-start gap-6">
                <div>
                    <div className="flex justify-between items-">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-medium text-gray-600">Positive</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">{value.positive}%</h3>
                </div>
                <div>
                    <div className="flex justify-between items-">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="text-xs font-medium text-gray-600">Negative</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">{value.negative}%</h3>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className="h-2 rounded-full"
                    style={{
                        width: "100%",
                        background: `linear-gradient(to right, #16c784 ${(value.positive / (value.positive + value.negative)) * 100}%, #ea3943 ${(value.negative / (value.positive + value.negative)) * 100}%)`
                    }}
                ></div>
            </div>
        </div>
    )
}

const HistoricalMACD = () => {
    const history = [
        { label: "Yesterday", value: 1.10, status: "neutral" },
        { label: "7 Days Ago", value: 0.85, status: "good" },
        { label: "30 Days Ago", value: 0.50, status: "good" },
        { label: "90 Days Ago", value: -0.20, status: "bad" },
    ];
    const getStatusColor = (status: string) => {
        if (status === "good") return "bg-green-500 text-white";
        if (status === "bad") return "bg-red-500 text-white";
        return "bg-gray-100 text-gray-600";
    }
    return (
        <div className="space-y-3">
            {history.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">{item.label}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>
                        {item.value.toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    )
}

const MACD = () => {
    return (
        <TechnicalIndicatorLayout
            title="NSE MACD (Moving Average Convergence Divergence)"
            description="MACD is a trend-following momentum indicator that shows the relationship between two moving averages of a security’s price. This dashboard provides a consolidated view of MACD values across major Nigerian stocks."
            leftCards={[
                <Card title="Average Normalized MACD" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <AverageMACD />
                </Card>,
                <Card title="Positive vs Negative Momentum" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <MACDSignalStatus />
                </Card>,
                <Card title="Historical MACD values" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <HistoricalMACD />
                </Card>
            ]}
            rightContent={
                <ChartCard
                    title="NSE MACD Divergence Chart"
                    className="h-full"
                    actions={
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium transition-colors">
                            4h
                        </button>
                    }
                >
                    <BubbleChart data={mockBubbleData} />
                </ChartCard>
            }
        />
    );
};

export default MACD;
