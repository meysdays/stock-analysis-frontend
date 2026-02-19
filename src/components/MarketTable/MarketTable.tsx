import { useEffect, useState } from "react";
import { getPaginatedMarketData } from "../../lib/data";
import Table from "../Table";
import { PaginationControls } from "./PaginationControls";
import { defaultHeaders } from "./DefaultHeaders";
import type { DashboardItem, MarketTableProps } from "./types";

/**
 * MarketTable component fetches and displays stock/market data in a responsive table.
 */

export default function MarketTable({
  fetchUrl,
  fetcher,
  data: initialData,
  headers,
}: MarketTableProps) {
  const [data, setData] = useState<DashboardItem[] | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        let res: DashboardItem[] = [];

        if (fetcher) {
          res = await fetcher();
        } else if (fetchUrl) {
          const r = await fetch(fetchUrl);
          if (!r.ok) throw new Error("Fetch failed");
          res = await r.json();
        } else {
          // Use paginated backend endpoint
          const items = await getPaginatedMarketData(1, ITEMS_PER_PAGE);

          if (mounted) {
            setData(items);
            setCurrentPage(1);
            setHasMore(items.length === ITEMS_PER_PAGE);
          }
          res = items;
        }

        if (mounted) setData(res);
      } catch (err: Error | unknown) {
        const errMsg = err instanceof Error ? err.message : "Failed to load";
        if (mounted) setError(errMsg);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (!initialData) load();

    return () => {
      mounted = false;
    };
  }, [initialData, fetchUrl, fetcher]);

  /**
   * Load more stocks handler - fetches the next batch of stocks
   */
  const loadMoreHandlers = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const newItems = await getPaginatedMarketData(nextPage, ITEMS_PER_PAGE);

      // Append new items to existing data
      setData((prevData) => (prevData ? [...prevData, ...newItems] : newItems));

      setCurrentPage(nextPage);
      setHasMore(newItems.length === ITEMS_PER_PAGE);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to load";
      setError(errMsg);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Loading state: show loading message while fetching
  if (loading)
    return (
      <div className="p-4 text-center text-gray-600">Loading market data…</div>
    );

  // Error state: show error message in red if fetch fails
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  // Empty state: show message if no data available
  if (!data || data.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">
        No market data available.
      </div>
    );

  return (
    <div>
      <Table
        headers={headers ?? defaultHeaders}
        data={data}
        rowKey={(r, idx) => r.id ?? `${r.symbol}${idx}`}
      />

      <PaginationControls
        onLoadMore={loadMoreHandlers}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
      />
    </div>
  );
}
