import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import SidePanel from "../components/SidePanel";
// import ChatModal from "../components/ChatModal";
import { stockTabs } from "../utils/utils";
import {
    getStocks,
    getStockDetails,
    getSignal,
} from "../lib/data";
import {
    type StockName,
    type StockApiData,
    type SignalApiData,
} from "../lib/definitions";
import Tab from "../components/Tab";



const StockPage = () => {
    const [stocks, setStocks] = useState<StockName[]>([]);
    const [activeTab, setActiveTab] = useState<string>(stockTabs[0].label);
    const [allStocks, setAllStocks] = useState<StockApiData[]>([]);
    const [signal, setSignal] = useState<SignalApiData | null>(null);
    const [stockName, setStockName] = useState<string>(urlStockId ?? "");
    const [error, setError] = useState<Error | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const fetchStocks = async (): Promise<void> => {
        try {
            const data = await getStocks();
            setStocks(data);
            if (data.length > 0 && !stockName) {
                setStockName(data[0].stock_name);
            }
        } catch (e) {
            if (e instanceof Error) setError(e);
        }
    };

    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    const handleChat = () => {
        setIsChatOpen(true);
    };


    const fetchStockData = async (name: string): Promise<void> => {
        try {
            setLoading(true);
            const [detailsData, signalData] = await Promise.all([
                getStockDetails(name),
                getSignal(name),
            ]);

            setAllStocks(detailsData);
            setSignal(signalData);
        } catch (e) {
            if (e instanceof Error) setError(e);
        } finally {
            setLoading(false);
        }
    };

    // Effect: Load stock data on mount or when URL ID changes
    useEffect(() => {
        if (urlStockId) {
            // User clicked from MarketTable - fetch specific stock
            const stockWithPrefix = `Stock\\${urlStockId}`;
            console.log(stockWithPrefix);

            setStockName(stockWithPrefix);
            fetchStockData(stockWithPrefix);
        } else {
            // Normal dashboard access - load first stock if available
            const loadDefaultStock = async () => {
                try {
                    setLoading(true);
                    const stocks = await getStocks();
                    if (stocks.length > 0) {
                        setStockName(stocks[0].stock_name);
                        await fetchStockData(stocks[0].stock_name);
                    }
                } catch (e) {
                    if (e instanceof Error) setError(e);
                } finally {
                    setLoading(false);
                }
            };
            loadDefaultStock();
        }
    }, [urlStockId]);

    // Process data for chart and stats
    const { chartData, latestData } = useMemo(() => {
        if (!allStocks.length)
            return { chartData: { labels: [], prices: [] }, latestData: null };

        const sorted = [...allStocks].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        const monthlyData = Object.values(
            sorted.reduce(
                (acc, item) => {
                    const month = new Date(item.date).toISOString().slice(0, 7);
                    acc[month] = item;
                    return acc;
                },
                {} as Record<string, StockApiData>,
            ),
        );

        const labels = monthlyData.map((item) =>
            new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            }),
        );
        const prices = monthlyData.map((item) => parseFloat(item.close));

        return {
            chartData: { labels, prices },
            latestData: sorted[sorted.length - 1],
        };
    }, [allStocks]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 text-red-500">
                <p>Error loading data: {error.message}. Is the backend running?</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-600">
                <p>Loading stock data...</p>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#FDFDFD] font-sans">
            <SidePanel />

            <main className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={stockTabs} />

                {/* {
                    isChatOpen ? (
                        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                    ) : (
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-[200px] flex flex-col justify-between">
                            <div>
                                <h3 className="text-gray-900 font-bold text-lg mb-2">AI Chat Bot</h3>
                                <p className="text-gray-400 text-sm">Ask our AI assistant about market trends and analysis.</p>
                            </div>
                            <button className="mt-4" onClick={handleChat}>
                                <button className="w-full bg-orange-500 text-white font-medium py-2 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2" onClick={handleChat}>
                                    <span className="text-lg">✨</span> Start Chat
                                </button>
                            </button>
                        </div>
                    )
                } */}
            </main>

            {/* <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> */}
        </div >
    );
};

export default StockPage;
