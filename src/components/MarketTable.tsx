import { useEffect, useState } from "react";
import { getStocks, getStockDetails } from "../api";
import SparklineChart from "./SparklineChart";
import { NavLink } from "react-router-dom";
import Table from "./Table";
import type { TableHeader } from "./Table";

/**
 * MarketItem interface represents a single market/stock entry with pricing,
 * percentage changes over different time periods, and market metrics.
 * Used internally by MarketTable to maintain type safety when rendering rows.
 */
export interface MarketItem {
  id?: string; // Optional unique identifier for the item
  name: string; // Stock/asset name (e.g., "Stock\\AAPL")
  price: number; // Current price in dollars
  percent1h: number; // 1-hour percentage change
  percent24h: number; // 24-hour percentage change
  percent7d: number; // 7-day percentage change
  marketCap: number; // Market capitalization in dollars
  volume24h: number; // 24-hour trading volume
  circulatingSupply: number; // Total circulating supply units
  sparkline7d?: number[]; // Array of closing prices for last 7 days (for chart visualization)
}

/**
 * Props interface for MarketTable component.
 * Allows three ways to provide data: pre-fetched, URL-based, or custom fetcher function.
 */
interface Props {
  fetchUrl?: string; // Optional URL to fetch market data from
  fetcher?: () => Promise<MarketItem[]>; // Optional custom function to fetch market items
  data?: MarketItem[]; // Optional pre-loaded market data (bypasses all fetching)
  headers?: TableHeader<MarketItem>[]; // Optional custom headers
}

/**
 * Format a number to 2 decimal places using locale-aware formatting.
 * Example: 1234.5678 → "1,234.57"
 */
const fmt = (v: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(v);

/**
 * Format large numbers with no decimal places for market cap and volume display.
 * Example: 1234567 → "1,234,567"
 */
const fmtLarge = (v: number) =>
  new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(v);

// Default table headers for MarketTable (can be overridden via props)
const defaultHeaders: TableHeader<MarketItem>[] = [
  {
    key: "name",
    label: "Name",
    align: "left",
    render: (r) => (
      <NavLink to={`/stocks/${r.name}`} className="hover:text-orange-600">
        {r.name}
      </NavLink>
    ),
  },
  {
    key: "price",
    label: "Price",
    align: "right",
    render: (r) => <>${fmt(r.price)}</>,
  },
  {
    key: "percent1h",
    label: "1h %",
    align: "right",
    render: (r) => (
      <span className={r.percent1h >= 0 ? "text-green-600" : "text-red-600"}>
        {r.percent1h >= 0 ? "+" : ""}
        {fmt(r.percent1h)}%
      </span>
    ),
  },
  {
    key: "percent24h",
    label: "24h %",
    align: "right",
    render: (r) => (
      <span className={r.percent24h >= 0 ? "text-green-600" : "text-red-600"}>
        {r.percent24h >= 0 ? "+" : ""}
        {fmt(r.percent24h)}%
      </span>
    ),
  },
  {
    key: "percent7d",
    label: "7d %",
    align: "right",
    render: (r) => (
      <span className={r.percent7d >= 0 ? "text-green-600" : "text-red-600"}>
        {r.percent7d >= 0 ? "+" : ""}
        {fmt(r.percent7d)}%
      </span>
    ),
  },
  {
    key: "marketCap",
    label: "Market Cap",
    align: "right",
    render: (r) => <>${fmtLarge(r.marketCap)}</>,
  },
  {
    key: "volume24h",
    label: "Volume(24h)",
    align: "right",
    render: (r) => <>${fmtLarge(r.volume24h)}</>,
  },
  {
    key: "circulatingSupply",
    label: "Circulating Supply",
    align: "right",
    render: (r) => <>{fmtLarge(r.circulatingSupply)}</>,
  },
  {
    key: "sparkline7d",
    label: "Last 7 Days",
    align: "center",
    render: (r) => <SparklineChart data={r.sparkline7d} label="7-Day Trend" />,
  },
];

/**
 * Sparkline component (DEPRECATED) - replaced by SparklineChart using Chart.js
 * Kept for reference; use SparklineChart instead.
 */

/**
 * MarketTable component fetches and displays stock/market data in a responsive table.
 * Supports three data-loading modes: pre-loaded data, custom fetcher, or backend API integration.
 *
 * @component
 * @param {Props} props - Component props
 * @returns JSX element rendering a market data table with charts and formatted values
 */
export default function MarketTable({
  fetchUrl,
  fetcher,
  data: initialData,
  headers,
}: Props) {
  // State: holds the array of market items to display
  const [data, setData] = useState<MarketItem[] | null>(initialData ?? null);

  // State: tracks loading state; initialized true if no initialData is provided
  const [loading, setLoading] = useState<boolean>(!initialData);

  // State: holds error message if fetch/processing fails
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [allStocks, setAllStocks] = useState<any[]>([]); // All available stocks
  const [currentOffset, setCurrentOffset] = useState<number>(0); // Current offset for pagination
  const [hasMore, setHasMore] = useState<boolean>(false); // Whether more stocks are available
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // Loading state for "See More" button
  const ITEMS_PER_PAGE = 10;

  /**
   * Helper function to fetch and process details for a batch of stocks
   */
  const fetchStocksBatch = async (stocks: any[]): Promise<MarketItem[]> => {
    const items: MarketItem[] = [];
    
    for (const s of stocks) {
      try {
        const details = await getStockDetails(s.stock_name);
        if (!details || details.length === 0) continue;

        const sorted = details
          .slice()
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        const last = sorted[sorted.length - 1];
        const lastClose = Number(last.close);
        const prev1 = sorted[sorted.length - 2];
        const prev7 = sorted[sorted.length - 8] || sorted[0];

        const pct24 = prev1
          ? ((lastClose - Number(prev1.close)) / Number(prev1.close)) * 100
          : 0;

        const pct7 = prev7
          ? ((lastClose - Number(prev7.close)) / Number(prev7.close)) * 100
          : 0;

        const pct1h = pct24 / 24;
        const volume24h = Number(last.volume || 0);
        const marketCap = lastClose * 1000000;
        const circulatingSupply = marketCap / (lastClose || 1);
        const sparkline = sorted.slice(-7).map((d) => Number(d.close));

        items.push({
          id: s.stock_name, // Full name with "Stock\" for navigation
          name: s.stock_name.replace(/^Stock\\/, ""), // Display name without "Stock\"
          price: lastClose,
          percent1h: Number(pct1h.toFixed(2)),
          percent24h: Number(pct24.toFixed(2)),
          percent7d: Number(pct7.toFixed(2)),
          marketCap: Math.round(marketCap),
          volume24h: Math.round(volume24h),
          circulatingSupply: Math.round(circulatingSupply),
          sparkline7d: sparkline,
        });
        console.debug(
          "MarketTable: added item",
          s.stock_name,
          Math.round(lastClose),
        );
      } catch (e: Error | unknown) {
        const errMsg = e instanceof Error ? e.message : String(e);
        console.debug(
          "MarketTable: skipped stock due to error",
          s.stock_name,
          errMsg,
        );
        continue;
      }
    }
    
    return items;
  };

  /**
   * Effect hook: Fetches market data on component mount if not already provided.
   * Supports three data sources in priority order:
   * 1. Custom fetcher function (highest priority)
   * 2. fetchUrl HTTP endpoint
   * 3. Backend API (getStocks + getStockDetails)
   *
   * Processes each stock's details, calculates percentage changes, and builds sparkline data.
   */
  useEffect(() => {
    let mounted = true; // Tracks if component is still mounted (prevents state updates on unmounted components)

    /**
     * Load function: Async function that fetches and processes market data.
     * Logs debug info and handles errors gracefully, skipping individual stock failures.
     */
    const load = async () => {
      console.debug("MarketTable: load start", {
        fetchUrl,
        hasFetcher: !!fetcher,
        hasInitialData: !!initialData,
      });
      try {
        setLoading(true);
        let res: MarketItem[] = []; // Result array to hold fetched market items

        if (fetcher) {
          // Use custom fetcher function if provided
          console.debug("MarketTable: using fetcher");
          res = await fetcher();
        } else if (fetchUrl) {
          // Fetch from URL if provided
          console.debug("MarketTable: fetching from URL", fetchUrl);
          const r = await fetch(fetchUrl);
          if (!r.ok) throw new Error("Fetch failed");
          res = await r.json();
        } else {
          // Default adapter: Use backend stock endpoints to build market table
          const stocks = await getStocks(); // Fetch list of all available stocks
          console.debug(
            "MarketTable: getStocks returned",
            Array.isArray(stocks) ? stocks.length : stocks,
            Array.isArray(stocks) ? stocks.slice(0, 5) : stocks,
          );

          // Store all stocks for pagination
          if (mounted) setAllStocks(stocks);

          // Fetch details for first batch
          const firstBatchStocks = stocks.slice(0, ITEMS_PER_PAGE);
          const items = await fetchStocksBatch(firstBatchStocks);

          // Update state
          if (mounted) {
            setData(items);
            setHasMore(stocks.length > ITEMS_PER_PAGE);
            setCurrentOffset(ITEMS_PER_PAGE);
          }
          res = items;
        }

        // Update state only if component is still mounted
        if (mounted) setData(res);
      } catch (err: Error | unknown) {
        // Log and display error message
        const errMsg = err instanceof Error ? err.message : "Failed to load";
        console.error("MarketTable: load error", err);
        if (mounted) setError(errMsg);
      } finally {
        // Always stop loading spinner when done
        if (mounted) setLoading(false);
      }
    };

    // Trigger load if no initial data was provided
    if (!initialData) load();

    // Cleanup function: prevent state updates after unmount
    return () => {
      mounted = false;
    };
  }, [initialData, fetchUrl, fetcher]);

  /**
   * Load more stocks handler - fetches the next batch of stocks
   */
  const loadMore = async () => {
    if (isLoadingMore || !hasMore || allStocks.length === 0) return;

    setIsLoadingMore(true);
    try {
      const nextBatchStocks = allStocks.slice(
        currentOffset,
        currentOffset + ITEMS_PER_PAGE,
      );
      const newItems = await fetchStocksBatch(nextBatchStocks);

      // Append new items to existing data
      setData((prevData) =>
        prevData ? [...prevData, ...newItems] : newItems,
      );

      const newOffset = currentOffset + ITEMS_PER_PAGE;
      setCurrentOffset(newOffset);
      setHasMore(newOffset < allStocks.length);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to load";
      console.error("MarketTable: loadMore error", err);
      setError(errMsg);
    } finally {
      setIsLoadingMore(false);
    }
  };

  /**
   * Load all remaining stocks handler - fetches all remaining stocks at once
   */
  const loadAll = async () => {
    if (isLoadingMore || !hasMore || allStocks.length === 0) return;

    setIsLoadingMore(true);
    try {
      const remainingStocks = allStocks.slice(currentOffset);
      const newItems = await fetchStocksBatch(remainingStocks);

      // Append all remaining items to existing data
      setData((prevData) =>
        prevData ? [...prevData, ...newItems] : newItems,
      );

      setCurrentOffset(allStocks.length);
      setHasMore(false);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to load";
      console.error("MarketTable: loadAll error", err);
      setError(errMsg);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Loading state: show loading message while fetching
  if (loading)
    return <div className="p-4 text-center text-gray-600">Loading market data…</div>;

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

  // Render using the reusable Table component with customizable headers
  return (
    <div>
      <Table
        headers={headers ?? defaultHeaders}
        data={data}
        rowKey={(r, idx) => r.id ?? `${r.name}${idx}`}
      />

      {hasMore && (
        <div className="flex items-center justify-center gap-4 py-10 px-5">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className={`border-0 bg-transparent text-base font-semibold uppercase transition-all duration-300 ${
              isLoadingMore
                ? "opacity-50 cursor-not-allowed"
                : "text-orange-600 hover:text-orange-500 cursor-pointer"
            }`}
            style={{
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (!isLoadingMore) {
                (e.target as HTMLButtonElement).style.letterSpacing = "1px";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoadingMore) {
                (e.target as HTMLButtonElement).style.letterSpacing = "0.5px";
              }
            }}
          >
            {isLoadingMore ? "Loading..." : "See More"}
          </button>

          <span className="text-gray-300">|</span>

          <button
            onClick={loadAll}
            disabled={isLoadingMore}
            className={`border-0 bg-transparent text-base font-semibold uppercase transition-all duration-300 ${
              isLoadingMore
                ? "opacity-50 cursor-not-allowed"
                : "text-orange-600 hover:text-orange-500 cursor-pointer"
            }`}
            style={{
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              if (!isLoadingMore) {
                (e.target as HTMLButtonElement).style.letterSpacing = "1px";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoadingMore) {
                (e.target as HTMLButtonElement).style.letterSpacing = "0.5px";
              }
            }}
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
}
