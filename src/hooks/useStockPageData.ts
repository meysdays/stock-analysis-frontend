import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStockInfo, getStockComparison } from "../lib/data";
import type { StockInfoResponse, StockComparisonItem } from "../lib/definitions";

export const useStockPageData = () => {
    const { id } = useParams<{ id: string }>();
    const [info, setInfo] = useState<StockInfoResponse | null>(null);
    const [stats, setStats] = useState<StockComparisonItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            const numericId = Number(id);
            try {
                setIsLoading(true);
                // We fetch both info and comparison (which has all stats)
                const [infoData, statsData] = await Promise.all([
                    getStockInfo(numericId),
                    getStockComparison(numericId)
                ]);
                setInfo(infoData);
                setStats(statsData);
            } catch (err) {
                console.error("Failed to fetch stock page data:", err);
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [id]);

    return { info, stats, isLoading, error };
};
