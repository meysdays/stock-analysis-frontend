import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Bell, Sun, Moon } from "lucide-react";
import TabNavigator from "../components/Navigation/TabNavigator";
import { getStockInfo } from "../lib/data";
import type { StockInfoResponse } from "../lib/definitions";

interface StockDashboardLayoutProps {
    children: ReactNode;
    // sidebarData: StockApiData & { signal: string; score: number };
    tabs: { label: string; href: string }[];
}

const StockDashboardLayout = ({ children, tabs }: StockDashboardLayoutProps) => {
    const { id } = useParams<{ id: string }>();
    const [stockInfo, setStockInfo] = useState<StockInfoResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchStockInfo = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const data = await getStockInfo(Number(id));
                setStockInfo(data);
            } catch (error) {
                console.error("Failed to fetch stock info:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStockInfo();
    }, [id]);

    const formatCurrency = (value: number | null) => {
        if (value === null || value === undefined) return "n/a";
        return `₦${value.toLocaleString()}`;
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "n/a";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getSentimentColor = (sentiment: string | null) => {
        if (!sentiment) return "text-gray-600";
        const lower = sentiment.toLowerCase();
        if (lower.includes("bullish")) return "text-green-600";
        if (lower.includes("bearish")) return "text-red-600";
        return "text-gray-600";
    };

    return (
        <div className="min-h-screen bg-[#fdfdfd] text-slate-900 flex font-sans selection:bg-indigo-100">
            {/* Sidebar */}
            {/* Sidebar implementation details... */}
            { }
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 ">
                {/* Header */}
                <header className="h-20 border-b border-gray-200 flex items-center justify-between px-10 shrink-0 bg-white/80 backdrop-blur-xs z-10 mb-8 sticky top-0">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-semibold tracking-wide text-indigo-600">StockPred</Link>
                        <div className="relative hidden md:block flex items-center">
                            <span className="material-symbols-outlined absolute left-3 top-[50%] -translate-y-[50%] text-[18px] opacity-50 text-slate-400">search</span>
                            <input
                                placeholder="Search here"
                                className="pl-10 pr-4 py-2 bg-gray-100 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs w-64 text-slate-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600">light_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600">notifications</span>
                    </div>
                </header>
                {/* Top Info Card */}
                {isLoading ? (
                    <div className="bg-white rounded-2xl py-8 flex items-center justify-center mx-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : stockInfo ? (
                    <div className="bg-white rounded-2xl py-4 flex justify-between items-start mx-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {stockInfo.name || "Unknown"} - {stockInfo.symbol}
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-slate-500 text-xs font-regular uppercase">IPO Date:</span>
                                <span className="text-slate-700 text-xs font-bold uppercase">
                                    {formatDate(stockInfo.ipo_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-slate-500 text-xs font-regular uppercase">Sector:</span>
                                <span className="text-slate-700 text-xs font-bold uppercase">
                                    {stockInfo.sector || "n/a"}
                                </span>
                            </div>

                            <p className="text-xs text-slate-500 mt-1">
                                NGX · {stockInfo.sector || "Unknown"} · {stockInfo.industry || "Unknown"}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-10 text-xs">
                            <div className="flex flex-col gap-3">
                                <p className="text-slate-900 font-bold text-base">Trend Strength</p>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-slate-500 text-xs font-medium">52w High</span>
                                    <span className="text-slate-900 text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_two_week_high)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-slate-500 text-xs font-medium">52w Low</span>
                                    <span className="text-slate-900 text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_two_week_low)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-slate-500 text-xs font-medium">50d MA</span>
                                    <span className="text-slate-900 text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_day_moving_average)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-900 font-semibold text-base">Sentiment</p>
                                <div className={`w-16 h-16 flex items-center justify-center mt-2 font-bold text-sm ${getSentimentColor(stockInfo.sentiment)}`}>
                                    {stockInfo.sentiment || "n/a"}
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-900 font-semibold text-base">SP Score</p>
                                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mt-2 font-bold text-lg">
                                    {stockInfo.sp_score ?? "n/a"}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl py-8 flex items-center justify-center mx-10">
                        <p className="text-gray-500">Failed to load stock information</p>
                    </div>
                )}

                <div className="mb-2 px-10 mt-8">
                    <TabNavigator tabs={tabs} />
                </div>

                {/* Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden px-8 custom-scrollbar">
                    <div className="mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StockDashboardLayout;
