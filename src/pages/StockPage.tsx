import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Navigation/Sidebar";
import { stockTabs, dummySidebarData } from "../utils/utils";
import {
    getStockById,
} from "../lib/data";
import Tab from "../components/Navigation/Tab";
import type { APIStock } from "../lib/definitions";


const StockPage = () => {
    const { id } = useParams();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [stockData, setStockData] = useState<APIStock | null>(null);


    // Effect: Load stock data on mount or when URL ID changes
    useEffect(() => {
        const loadData = async () => {
            const numericId = id ? Number(id) : undefined;

            try {
                setLoading(true);
                if (numericId && !isNaN(numericId)) {
                    // Fetch specific stock by numeric ID
                    const data = await getStockById(numericId);
                    setStockData(data);
                }
            } catch (e) {
                if (e instanceof Error) setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

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
        <div className="flex h-screen overflow-hidden bg-[#FDFDFD] font-sans">
            <Sidebar
                {...dummySidebarData}
                stock_name={stockData?.name || dummySidebarData.stock_name}
                volume={stockData?.market_cap || dummySidebarData.volume}
            />

            <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <Tab tabProps={stockTabs} />
                {stockData && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{stockData.name}</h2>
                        <p className="text-slate-600">{stockData.description}</p>
                    </div>
                )}
            </main>

        </div >
    );
};

export default StockPage;
