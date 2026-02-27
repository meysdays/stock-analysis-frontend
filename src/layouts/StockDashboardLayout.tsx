import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import ChatModal from "../components/ChatModal";
import { Link, useParams } from "react-router-dom";
import TabNavigator from "../components/Navigation/TabNavigator";
import { getStockInfo } from "../lib/data";
import type { StockInfoResponse } from "../lib/definitions";
import Summary from "../pages/dashboard/stock/Summary";
import Financials from "../pages/dashboard/stock/Financials";
import StatisticsMain from "../pages/dashboard/stock/StatisticsMain";
import ChatModalV2 from "../components/ChatModalV2";

interface StockDashboardLayoutProps {
    children: ReactNode;
    // sidebarData: StockApiData & { signal: string; score: number };
    tabs: { label: string; href: string }[];
}

const StockDashboardLayout = ({ children, tabs }: StockDashboardLayoutProps) => {
    const { id } = useParams<{ id: string }>();
    const [stockInfo, setStockInfo] = useState<StockInfoResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);

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
        if (!sentiment) return "text-secondary";
        const lower = sentiment.toLowerCase();
        if (lower.includes("bullish")) return "text-positive";
        if (lower.includes("bearish")) return "text-negative";
        return "text-secondary";
    };

    return (
        <div className="min-h-screen bg-background-1 text-primary flex font-sans selection:bg-blue-400/20">
            {/* Sidebar */}
            {/* Sidebar implementation details... */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 ">
                {/* Header */}
                <header className="h-20 border-b border-gray-100 flex items-center justify-between px-10 shrink-0 bg-surface-1/80 backdrop-blur-xs z-10 mb-8 sticky top-0">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-semibold tracking-wide text-link">StockPred</Link>
                        <div className="relative hidden md:block flex items-center">
                            <span className="material-symbols-outlined absolute left-3 top-[50%] -translate-y-[50%] text-[18px] opacity-50 text-secondary">search</span>
                            <input
                                placeholder="Search here"
                                className="pl-10 pr-4 py-2 bg-background-2 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-link/30 text-xs w-64 text-primary placeholder:text-caption"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-secondary">
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">light_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">notifications</span>
                    </div>
                </header>
                {/* Top Info Card */}
                {isLoading ? (
                    <div className="bg-white rounded-2xl py-8 flex items-center justify-center mx-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                ) : stockInfo ? (
                    <div className="bg-surface-1 rounded-2xl py-4 flex justify-between items-start mx-auto w-full px-5">
                        <div>
                            <h2 className="text-2xl font-bold text-primary">
                                {stockInfo.name || "Unknown"} - {stockInfo.symbol}
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-secondary text-xs font-regular uppercase">IPO Date:</span>
                                <span className="text-primary text-xs font-bold uppercase">
                                    {formatDate(stockInfo.ipo_date)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-secondary text-xs font-regular uppercase">Sector:</span>
                                <span className="text-primary text-xs font-bold uppercase">
                                    {stockInfo.sector || "n/a"}
                                </span>
                            </div>

                            <p className="text-xs text-secondary mt-1">
                                NGX · {stockInfo.sector || "Unknown"} · {stockInfo.industry || "Unknown"}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-10 text-xs">
                            <div className="flex flex-col gap-3">
                                <p className="text-primary font-bold text-base">Trend Strength</p>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-secondary text-xs font-medium">52w High</span>
                                    <span className="text-primary text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_two_week_high)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-secondary text-xs font-medium">52w Low</span>
                                    <span className="text-primary text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_two_week_low)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 justify-between">
                                    <span className="text-secondary text-xs font-medium">50d MA</span>
                                    <span className="text-primary text-xs font-bold">
                                        {formatCurrency(stockInfo.fifty_day_moving_average)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-primary font-semibold text-base">Sentiment</p>
                                <div className={`w-16 h-16 flex items-center justify-center mt-2 font-bold text-sm ${getSentimentColor(stockInfo.sentiment)}`}>
                                    {stockInfo.sentiment || "n/a"}
                                </div>
                            </div>
                            <div>
                                <p className="text-primary font-semibold text-base">SP Score</p>
                                <div className="w-16 h-16 rounded-full border-4 border-positive text-positive flex items-center justify-center mt-2 font-bold text-lg">
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

                <div className="mb-2 w-full mt-8">
                    <TabNavigator tabs={tabs} />
                </div>

                {/* Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <div className="mx-auto space-y-8">
                        {/* {children} */}
                        <Summary/>
                        <Financials/>
                        <StatisticsMain/>
                    </div>
                </main>

                {/* Floating Chat Button */}
                {/* <button
                  className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center text-2xl focus:outline-none focus:ring"
                  onClick={() => setChatOpen(true)}
                  title="Ask Stock AI"
                >
                  <span className="material-symbols-outlined">chat</span>
                </button>

                {/* Chat Modal */}
                {/* <ChatModalV2 open={chatOpen} onClose={() => setChatOpen(false)} stockId={id || ""} /> */} 
            </div>
        </div>
    );
};

export default StockDashboardLayout;
