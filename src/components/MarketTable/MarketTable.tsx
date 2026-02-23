import { useEffect, useState } from "react";
import { getDashboardStocks } from "../../lib/data";
import Table from "../Table";
import { PaginationControls } from "./PaginationControls";
import { defaultHeaders } from "./DefaultHeaders";
import type { MarketItem, MarketTableProps } from "./types";

/**
 * MarketTable component fetches and displays stock/market data in a responsive table.
 */

export default function MarketTable({
  fetchUrl,
  fetcher,
  data: initialData,
  headers,
}: MarketTableProps) {
  const [data, setData] = useState<MarketItem[] | null>(initialData ?? null);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    let mounted = true;

    const loadInitial = async () => {
      if (initialData) return;
      try {
        setLoading(true);
        let items: MarketItem[] = [];

        if (fetcher) {
          items = await fetcher(1, ITEMS_PER_PAGE);
        } else if (fetchUrl) {
          const r = await fetch(fetchUrl);
          if (!r.ok) throw new Error("Fetch failed");
          items = await r.json();
        } else {
          items = await getDashboardStocks(1, ITEMS_PER_PAGE);
        }

        if (mounted) {
          setData(items);
          setCurrentPage(1);
          setHasMore(items.length >= ITEMS_PER_PAGE);
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadInitial();
    return () => { mounted = false; };
  }, [fetcher, fetchUrl, initialData]);

  const loadMoreHandlers = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      let newItems: MarketItem[] = [];

      if (fetcher) {
        newItems = await fetcher(nextPage, ITEMS_PER_PAGE);
      } else {
        newItems = await getDashboardStocks(nextPage, ITEMS_PER_PAGE);
      }

      setData((prev) => (prev ? [...prev, ...newItems] : newItems));
      setCurrentPage(nextPage);
      setHasMore(newItems.length >= ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more");
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Loading state: show loading message while fetching
  if (loading)
    return (
      <div className="p-4 text-center text-secondary">Loading market data…</div>
    );

  // Error state: show error message in red if fetch fails
  if (error)
    return <div className="p-4 text-center text-negative">Error: {error}</div>;

  // Empty state: show message if no data available
  if (!data || data.length === 0)
    return (
      <div className="p-4 text-center text-caption">
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
