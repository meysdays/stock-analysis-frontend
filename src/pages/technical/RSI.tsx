import { Info } from "lucide-react";
import SidePanel from "../../components/Navigation/SidePanel";
import Tab from "../../components/Navigation/Tab";
import Card from "../../components/Card";

const rsiTabs = [
    { label: "RSI", href: "/indicators/rsi" },
    { label: "MACD", href: "/indicators/macd" },
];

const AverageRSIGauge = () => {
    // Determine needle rotation based on value (0-100) -> (-90deg to 90deg)
    const value = 44.27;
    const rotation = (value / 100) * 180 - 90;

    return (
        <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-24 overflow-hidden">
                {/* Dial Background - simple gray arc or gradient */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-t-full"></div>

                {/* Colored Zones (Simplified for now, just a bar at bottom or gradient) */}
                <div className="absolute bottom-0 left-0 w-full h-2 flex">
                    <div className="h-full bg-red-500 w-[30%]"></div>
                    <div className="h-full bg-gray-300 w-[40%]"></div>
                    <div className="h-full bg-green-500 w-[30%]"></div>
                </div>

                {/* Needle */}
                <div
                    className="absolute bottom-0 left-1/2 w-1 h-20 bg-gray-800 origin-bottom transform transition-transform duration-500"
                    style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                ></div>

                {/* Center Dot */}
                <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800 transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="mt-4 text-center">
                <h2 className="text-4xl font-bold text-gray-900">{value}</h2>
                <div className="flex justify-between w-full text-xs text-gray-500 mt-2 gap-12">
                    <span>Oversold</span>
                    <span>Overbought</span>
                </div>
            </div>
            {/* Slider bar at bottom mimicking the image */}
            <div className="w-full mt-4 h-1.5 bg-gray-200 rounded-full relative">
                <div className="absolute top-0 left-0 h-full bg-green-500 rounded-l-full w-[30%]"></div>
                <div className="absolute top-0 right-0 h-full bg-red-500 rounded-r-full w-[30%]"></div>
                {/* Thumb */}
                <div className="absolute top-1/2 left-[44.27%] w-4 h-4 bg-white border border-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
            </div>
        </div>
    )
}

const OverboughtVsOversold = () => {
    return (
        <div className="space-y-6 pt-2">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium text-gray-600">Oversold</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold">2.0%</h3>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "2%" }}></div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-sm font-medium text-gray-600">Overbought</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold">1.3%</h3>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "1.3%" }}></div>
                </div>
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
            <SidePanel />
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
                            <div className="flex-1 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-0.5 opacity-30">
                                    {Array.from({ length: 72 }).map((_, i) => (
                                        <div key={i} className={`
                                    ${i % 3 === 0 ? 'bg-red-200' : i % 3 === 1 ? 'bg-green-200' : 'bg-gray-200'}
                                `}></div>
                                    ))}
                                </div>
                                <div className="z-10 text-center">
                                    <p className="text-gray-500 font-medium">RSI Heatmap Placeholder</p>
                                    <p className="text-xs text-gray-400 mt-1">Chart visualization would go here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RSI;
