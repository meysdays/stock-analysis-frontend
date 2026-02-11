import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Navigation/Sidebar";
import { stockTabs, dummySidebarData } from "../utils/utils";
import {
    getStockById,
} from "../lib/data";
import Tab from "../components/Navigation/Tab";
import type { StockApiData } from "../lib/definitions";


const StockPage = () => {
    const { id } = useParams();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [stockData, setStockData] = useState<StockApiData[]>([]);


    // Effect: Load stock data on mount or when URL ID changes
    useEffect(() => {
        const loadData = async () => {
            const numericId = id ? Number(id) : undefined;

            try {
                setLoading(true);
                if (numericId && !isNaN(numericId)) {
                    // Fetch specific stock by numeric ID
                    const detailsData = await getStockById(numericId);
                    setStockData(detailsData);
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
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#FDFDFD] font-sans">
            <Sidebar {...dummySidebarData} />

            <main className="flex-1 overflow-y-auto p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <Tab tabProps={stockTabs} />
            </main>

        </div >
    );
};

export default StockPage;
