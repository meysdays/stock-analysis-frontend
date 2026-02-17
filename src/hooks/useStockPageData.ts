import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStockStats, getStockInfo } from "../lib/data";
import type { StockStatsResponse, StockInfoResponse } from "../lib/definitions";

export const useStockPageData = () => {
    const { id } = useParams<{ id: string }>();
    const [stats, setStats] = useState<StockStatsResponse | null>(null);
    const [info, setInfo] = useState<StockInfoResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const [statsData, infoData] = await Promise.all([
                    getStockStats(Number(id)),
                    getStockInfo(Number(id))
                ]);
                setStats(statsData);
                setInfo(infoData);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch stock page data:", err);
                setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { id, stats, info, isLoading, error };
};
