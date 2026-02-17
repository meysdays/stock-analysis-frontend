import { useEffect, useState } from "react";
import { useParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import StockDashboardLayout from "../../layouts/StockDashboardLayout";
import { getStockById } from "../../lib/data";
import type { APIStock } from "../../lib/definitions";
import { Tabs } from "../../utils/utils";

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
            <div className="flex  items-center justify-center h-screen bg-[#fdfdfd] text-red-500">
                <p>Error: {error?.message || "Stock not found"}</p>
            </div>
        );
    }

    const tabs = [
        { label: "Overview", href: `/stock/${id}/summary` },
        { label: "Financials", href: `/stock/${id}/financials` },
        { label: "Forecast", href: `/stock/${id}/forecast` },
        { label: "Statistics", href: `/stock/${id}/statistics` },
        { label: "Metrics", href: `/stock/${id}/metrics` },
        { label: "Dividends", href: `/stock/${id}/dividends` },
        { label: "History", href: `/stock/${id}/history` },
        { label: "Profile", href: `/stock/${id}/profile` },
        { label: "Chart →", href: `/stock/${id}/chart` },
    ];

    return (
        <StockDashboardLayout tabs={tabs}>
            <Outlet />
        </StockDashboardLayout>
    );
};

export default StockDashboard;
