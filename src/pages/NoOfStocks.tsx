import Card from "../components/Card";

const NoOfStocks = () => {
    // Placeholder data to match the screenshot
    const totalTracked = "140";
    const created24h = "1";
    const created7d = "1";
    const created30d = "5";
    const yearlyHigh = "141";
    const yearlyLow = "139";

    return (
        <div className="h-full bg-[#fdfdfd] text-slate-900">
            <main className="p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Nigerian Stocks Tracked by NSE</h1>
                    <p className="text-slate-500 max-w-5xl leading-relaxed">
                        Explore our stock count page, showcasing the total number of stocks in existence and the ongoing growth in the number of stocks tracked by NSE. Dive into historical counts, yearly expansions, and the number of stocks tracked on each sector.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats */}
                    <div className="space-y-6">
                        <Card title="Total Number of Stocks Tracked" className="bg-white border-gray-100 shadow-sm">
                            <div className="text-4xl font-bold text-slate-900 mt-2">{totalTracked}</div>
                        </Card>

                        <Card title="Total Stocks Created" className="bg-white border-gray-100 shadow-sm">
                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                    <span className="text-slate-500 font-medium">Last 24h</span>
                                    <span className="font-bold text-slate-700">{created24h}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                    <span className="text-slate-500 font-medium">Last 7d</span>
                                    <span className="font-bold text-slate-700">{created7d}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                    <span className="text-slate-500 font-medium">Last 30d</span>
                                    <span className="font-bold text-slate-700">{created30d}</span>
                                </div>
                            </div>
                        </Card>

                        <Card title="Yearly Performance" className="bg-white border-gray-100 shadow-sm">
                            <div className="space-y-3 mt-4">
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                    <span className="text-slate-500 font-medium">
                                        Yearly High <span className="text-slate-400 text-xs text-[10px]">(Jul 08, 2025)</span>
                                    </span>
                                    <span className="font-bold text-slate-700">{yearlyHigh}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                                    <span className="text-slate-500 font-medium">
                                        Yearly Low <span className="text-slate-400 text-xs text-[10px]">(Feb 10, 2026)</span>
                                    </span>
                                    <span className="font-bold text-slate-700">{yearlyLow}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Charts */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card title="New Stocks Tracked" className="bg-white border-gray-100 shadow-sm" action={
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">30d</button>
                                <button className="px-3 py-1 text-xs font-medium bg-white text-slate-900 rounded shadow-sm">1y</button>
                                <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">All</button>
                            </div>
                        }>
                            <div className="h-64 flex items-center justify-center bg-gray-50/30 rounded-lg border border-dashed border-gray-200 mt-4">
                                <span className="text-gray-400 text-sm">Chart Placeholder: New Stocks Tracked</span>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card title="Stocks by Sector" className="bg-white border-gray-100 shadow-sm" action={
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button className="px-3 py-1 text-xs font-medium bg-white text-slate-900 rounded shadow-sm">Market Share</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">Total</button>
                                </div>
                            }>
                                <div className="h-64 flex items-center justify-center bg-gray-50/30 rounded-lg border border-dashed border-gray-200 mt-4">
                                    <span className="text-gray-400 text-sm">Chart Placeholder: By Sector</span>
                                </div>
                            </Card>

                            <Card title="Total Tracked" className="bg-white border-gray-100 shadow-sm" action={
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">30d</button>
                                    <button className="px-3 py-1 text-xs font-medium bg-white text-slate-900 rounded shadow-sm">1y</button>
                                    <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">All</button>
                                </div>
                            }>
                                <div className="h-64 flex items-center justify-center bg-gray-50/30 rounded-lg border border-dashed border-gray-200 mt-4">
                                    <span className="text-gray-400 text-sm">Chart Placeholder: Total Tracked</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NoOfStocks;
