import Card from "../../components/Card";
import ChartCard from "../../components/Chart/ChartCard";
import BubbleChart from "../../components/Chart/BubbleChart";
import TechnicalIndicatorLayout from "../../components/Layout/TechnicalIndicatorLayout";
import { mockBubbleData } from "../../utils/utils";

const AverageRSIGauge = () => {
    const value = 50;
    return (
        <div className="mx-auto">
            <div className="mt-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
                <div className="flex justify-between w-full text-xs text-gray-500 mt-2 gap-12">
                    <span>Oversold</span>
                    <span>Overbought</span>
                </div>
            </div>
            <div className="w-full mt-2 h-1.5 bg-gray-200 rounded-full relative">
                <div className="absolute top-0 left-0 h-full bg-[#16c784] w-[16.67%]"></div>
                <div className="absolute top-0 left-[16.67%] h-full bg-[#0f8b5c] w-[16.67%]"></div>
                <div className="absolute top-0 left-[33.34%] h-full bg-gray-200 w-[16.67%]"></div>
                <div className="absolute top-0 left-[50%] h-full bg-gray-200 w-[16.67%]"></div>
                <div className="absolute top-0 left-[66.67%] h-full bg-[#a4282f] w-[16.67%]"></div>
                <div className="absolute top-0 left-[83.34%] h-full bg-[#ea3943] w-[16.67%]"></div>
                <div className="absolute top-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: `${value}%` }}></div>
            </div>
        </div>
    )
}

const OverboughtVsOversold = () => {
    const value = { "oversold": 2.0, "overbought": 1.3 };
    return (
        <div className="space-y-3 pt-1">
            <div className="flex justify-start gap-6">
                <div>
                    <div className="flex justify-between items-">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-medium text-gray-600">Oversold</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">2.0%</h3>
                </div>
                <div>
                    <div className="flex justify-between items-">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="text-xs font-medium text-gray-600">Overbought</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">1.3%</h3>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className="h-2 rounded-full"
                    style={{
                        width: "100%",
                        background: `linear-gradient(to right, #16c784 ${(value.oversold / (value.oversold + value.overbought)) * 100}%, #ea3943 ${(value.oversold / (value.oversold + value.overbought)) * 100}%)`
                    }}
                ></div>
            </div>
        </div>
    )
}

const HistoricalRSI = () => {
    const history = [
        { label: "Yesterday", value: 42.20, status: "neutral" },
        { label: "7 Days Ago", value: 39.46, status: "good" },
        { label: "30 Days Ago", value: 47.03, status: "neutral" },
        { label: "90 Days Ago", value: 45.76, status: "neutral" },
    ];
    const getStatusColor = (status: string) => {
        if (status === "good") return "bg-green-500 text-white";
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

const RSI = () => {
    return (
        <TechnicalIndicatorLayout
            title="NSE Relative Strength Index (RSI)"
            description="This page shows the current Nigerian stock market Relative Strength Index heatmap and data. The dashboard includes the largest stocks - such as MTN, Airtel and Dangote - and their current overbought vs oversold status."
            leftCards={[
                <Card title="Average NSE RSI" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <AverageRSIGauge />
                </Card>,
                <Card title="Overbought vs oversold" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <OverboughtVsOversold />
                </Card>,
                <Card title="Historical RSI values" action={<span className="material-symbols-outlined text-[18px] text-gray-400">info</span>}>
                    <HistoricalRSI />
                </Card>
            ]}
            rightContent={
                <ChartCard
                    title="NSE RSI Heatmap"
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

export default RSI;
