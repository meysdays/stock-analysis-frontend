import { useEffect, useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import StockList from "./components/StockList";
import StockChart from "./components/StockChart";
import ChatModal from "./components/ChatModal";
import { getStocks, getStockDetails, getSignal, type StockName, type StockApiData, type SignalApiData } from "./api";
import NavBar from "./components/NavBar";


const tabs = [
  { label: "Chart", href: "#Charts" },
  { label: "Markets", href: "#Markets" },
  { label: "News", href: "#News" },
  { label: "About", href: "#About" },
];

const App = () => {
  const [stocks, setStocks] = useState<StockName[]>([]);
  const [allStocks, setAllStocks] = useState<StockApiData[]>([]);
  const [signal, setSignal] = useState<SignalApiData | null>(null);
  const [stockName, setStockName] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);


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

  const handleChat = () => {
    setIsChatOpen(true);
  };


  const fetchStockData = async (name: string): Promise<void> => {
    try {

      const [detailsData, signalData] = await Promise.all([
        getStockDetails(name),
        getSignal(name)
      ]);

      setAllStocks(detailsData);
      setSignal(signalData);
    } catch (e) {
      if (e instanceof Error) setError(e);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (stockName) {
      fetchStockData(stockName);
    }
  }, [stockName]);

  // Process data for chart and stats
  const { chartData, latestData } = useMemo(() => {
    if (!allStocks.length) return { chartData: { labels: [], prices: [] }, latestData: null };

    const sorted = [...allStocks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const monthlyData = Object.values(
      sorted.reduce((acc, item) => {
        const month = new Date(item.date).toISOString().slice(0, 7);
        acc[month] = item;
        return acc;
      }, {} as Record<string, StockApiData>)
    );

    const labels = monthlyData.map((item) =>
      new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
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
    )
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
        <Sidebar />

        <main className="flex-1 ml-64 p-8">
          <header className="flex justify-between items-center mb-8">
            {tabs.map((tab) => (
              <a
                key={tab.label}
                href={tab.href}
                onClick={() => setActiveTab(tab.label)}
                className={`text-gray-600 hover:text-gray-800 transition-colors ${activeTab === tab.label ? "border-b-2 border-orange-500" : ""}`}
              >
                {tab.label}
              </a>
            ))}
          </header>

          {/* Top Stats Row */}
          <div className="flex flex-wrap gap-6 mb-8">
            <StatsCard
              title="Signal"
              value={signal ? signal.signal : "---"}
              description={signal ? `Score: ${signal.score}` : "Loading..."}
              trend={signal && signal.score >= 0 ? "up" : "down"}
              percentage={signal ? `${signal.score}` : "0"}
            />
            <StatsCard
              title="Volume"
              value={latestData ? parseInt(latestData.volume).toLocaleString() : "---"}
              description="Traded today"
              trend="down"
              percentage="0.8%"
            />
            {
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
            }

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">

            <div className="lg:col-span-2 h-full">
              <StockChart data={chartData} />
            </div>
            <div className="lg:col-span-1 h-full">
              <StockList
                stocks={stocks}
                selectedStock={stockName}
                onSelect={setStockName}
              />
            </div>
          </div>
        </main>

        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  );
};

export default App;
