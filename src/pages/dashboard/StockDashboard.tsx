import { useEffect, useState } from "react";
import { useParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import StockDashboardLayout from "../../layouts/StockDashboardLayout";
import { getStockById } from "../../lib/data";
import { Tabs } from "../../utils/utils";
import type { APIStock } from "../../lib/definitions";

const StockDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [stockData, setStockData] = useState<APIStock | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const numericId = id ? Number(id) : undefined;
            if (!numericId || isNaN(numericId)) return;

            try {
                setLoading(true);
                // Fetch stock data
                // Note: The getStockById returns an array, we take the first item
                const data = await getStockById(numericId);
                if (data) {
                    setStockData(data);
                } else {
                    setError(new Error("Stock not found"));
                }
            } catch (e) {
                if (e instanceof Error) setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    // Navigate to summary tab by default if no tab is selected
    useEffect(() => {
        if (stockData && location.pathname === `/stock/${id}`) {
            navigate(`/stock/${id}/summary`, { replace: true });
        }
    }, [stockData, location.pathname, id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#fdfdfd] text-slate-400">
                <div className="animate-pulse">Loading stock data...</div>
            </div>
        );
    }

    if (error || !stockData) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#fdfdfd] text-red-500">
                <p>Error: {error?.message || "Stock not found"}</p>
            </div>
        );
    }



    return (
        <StockDashboardLayout tabs={Tabs(Number(id))}>
            <Outlet />
        </StockDashboardLayout>
    );
};

export default StockDashboard;
