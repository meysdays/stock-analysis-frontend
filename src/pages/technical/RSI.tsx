import { Info } from "lucide-react";
import SidePanel from "../../components/Navigation/SidePanel";
import Tab from "../../components/Navigation/Tab";
import Card from "../../components/Card";
import ChartCard from "../../components/Chart/ChartCard";
import BubbleChart from "../../components/Chart/BubbleChart";

const rsiTabs = [
    { label: "RSI", href: "/indicators/rsi" },
    { label: "MACD", href: "/indicators/macd" },
];

const AverageRSIGauge = () => {
    // Determine thumb position based on value (0-100)
    const value = 50;
    return (
        <div className="flex flex-col items-center justify-center py-4">

            <div className="mt-4 text-center">
                <h2 className="text-4xl font-bold text-gray-900">{value}</h2>
                <div className="flex justify-between w-full text-xs text-gray-500 mt-2 gap-12">
                    <span>Oversold</span>
                    <span>Overbought</span>
                </div>
            </div>
            {/* Slider bar at bottom mimicking the image */}
            <div className="w-full mt-4 h-1.5 bg-gray-200 rounded-full relative">

                <div className="absolute top-0 left-0 h-full bg-[#16c784] w-[16.67%]"></div>
                <div className="absolute top-0 left-[16.67%] h-full bg-[#0f8b5c] w-[16.67%]"></div>
                <div className="absolute top-0 left-[33.34%] h-full bg-gray-200 w-[16.67%]"></div>
                <div className="absolute top-0 left-[50%] h-full bg-gray-200 w-[16.67%]"></div>
                <div className="absolute top-0 left-[66.67%] h-full bg-[#a4282f] w-[16.67%]"></div>
                <div className="absolute top-0 left-[83.34%] h-full bg-[#ea3943] w-[16.67%]"></div>

                {/* Thumb */}
                <div className="absolute top-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" style={{ left: `${value}%` }}></div>
            </div>
        </div>
    )
}

const OverboughtVsOversold = () => {
    const value = {
        "oversold": 2.0,
        "overbought": 1.3
    };
    return (
        <div className="space-y-6 pt-2">
            <div className="flex justify-start gap-6">

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-medium text-gray-600">Oversold</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">2.0%</h3>

                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="text-xs font-medium text-gray-600">Overbought</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold">1.3%</h3>

                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
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
        <div className="space-y-4">
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
        <div className="flex h-screen bg-[#FDFDFD] overflow-hidden">
            <SidePanel name="Dashboards" />
            <main className="flex-1 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={rsiTabs} />

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto Relative Strength Index (RSI)</h1>
                    <p className="text-gray-500 max-w-6xl leading-relaxed">
                        This page shows the current crypto market Relative Strength Index heatmap and data. The dashboard includes the largest cryptos - such as Bitcoin, Ethereum and XRP - and their current overbought vs oversold status.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column Cards */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-[#1e2023] text-white rounded-xl p-0 overflow-hidden">
                            {/* Dark Theme Overrides for this section based on image? 
                       Actually the image has dark cards. 
                       The user's app seems to have light theme (see FearGreed.tsx using bg-[#FDFDFD] and white cards).
                       However, the user said "implement this layout", and the image is dark mode.
                       But the rest of the app is likely light mode. 
                       I should probably stick to the app's theme (Light) but use the layout structure.
                       OR should I try to make it look like the image (Dark)?
                       The user said "implement this layout". Usually implies structure.
                       "visually matches a provided image" was for another task.
                       "implement this layout for rsi page" is the current request.
                       I will stick to the existing project theme (Light) for consistency, unless I see dark mode classes in other files.
                       I saw 'bg-[#FDFDFD]' in FearGreed.tsx, which is very light.
                       I will use the standard Card component I saw earlier which seemed to be light themed.
                    */}
                            <Card title="Average Crypto RSI" subtitle={<Info className="w-4 h-4 text-gray-400" />}>
                                <AverageRSIGauge />
                            </Card>
                        </div>

                        <Card title="Overbought vs oversold" subtitle={<Info className="w-4 h-4 text-gray-400" />}>
                            <OverboughtVsOversold />
                        </Card>

                        <Card title="Historical RSI values" subtitle={<Info className="w-4 h-4 text-gray-400" />}>
                            <HistoricalRSI />
                        </Card>
                    </div>

                    {/* Right Column Heatmap */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full min-h-[500px] flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg text-gray-900">Crypto RSI Heatmap</h3>
                                    <Info className="w-4 h-4 text-gray-400" />
                                </div>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                    4h
                                </button>
                            </div>

                            {/* Placeholder for Heatmap */}
                            <ChartCard title="Crypto RSI Heatmap">
                                <BubbleChart />
                            </ChartCard>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RSI;
