import React, { useEffect, useState } from "react";
import { getStocks, getStockDetails } from "../api";
import SparklineChart from "./SparklineChart";
import { NavLink } from "react-router-dom";

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
}: Props) {
  // State: holds the array of market items to display
  const [data, setData] = useState<MarketItem[] | null>(initialData ?? null);

  // State: tracks loading state; initialized true if no initialData and a data source is provided
  const [loading, setLoading] = useState<boolean>(
    !initialData && (!!fetchUrl || !!fetcher),
  );

  // State: holds error message if fetch/processing fails
  const [error, setError] = useState<string | null>(null);

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
          const stocks = await getStocks(); // Fetch list of available stocks
          console.debug(
            "MarketTable: getStocks returned",
            Array.isArray(stocks) ? stocks.length : stocks,
            Array.isArray(stocks) ? stocks.slice(0, 5) : stocks,
          );
          const items: MarketItem[] = []; // Accumulate processed items

          // Process first 50 stocks, gracefully skip any that fail
          for (const s of stocks.slice(0, 50)) {
            try {
              // Fetch historical price details for this stock
              const details = await getStockDetails(s.stock_name);
              if (!details || details.length === 0) continue;

              // Sort by date ascending to ensure correct chronological order
              const sorted = details
                .slice()
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
                );

              // Get most recent closing price (last entry)
              const last = sorted[sorted.length - 1];
              const lastClose = Number(last.close);

              // Get previous day's closing price for 24h change calculation
              const prev1 = sorted[sorted.length - 2];

              // Get price from 7 days ago, or first available if < 7 days of data
              const prev7 = sorted[sorted.length - 8] || sorted[0];

              // Calculate 24-hour percentage change: ((current - prev) / prev) * 100
              const pct24 = prev1
                ? ((lastClose - Number(prev1.close)) / Number(prev1.close)) *
                  100
                : 0;

              // Calculate 7-day percentage change
              const pct7 = prev7
                ? ((lastClose - Number(prev7.close)) / Number(prev7.close)) *
                  100
                : 0;

              // Approximate 1-hour change as 1/24 of daily change
              const pct1h = pct24 / 24;

              // Extract volume from most recent entry
              const volume24h = Number(last.volume || 0);

              // Calculate naive market cap (placeholder calculation)
              const marketCap = lastClose * 1000000;

              // Calculate circulating supply based on market cap and price
              const circulatingSupply = marketCap / (lastClose || 1);

              // Extract last 7 closing prices for sparkline visualization
              const sparkline = sorted.slice(-7).map((d) => Number(d.close));

              // Construct MarketItem with all processed data
              items.push({
                name: s.stock_name,
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
            } catch (e: any) {
              // Log and skip stocks that fail to fetch/process
              console.debug(
                "MarketTable: skipped stock due to error",
                s.stock_name,
                e?.message || e,
              );
              continue;
            }
          }
          res = items;
        }

        // Update state only if component is still mounted
        if (mounted) setData(res);
      } catch (err: any) {
        // Log and display error message
        console.error("MarketTable: load error", err);
        if (mounted) setError(err.message || "Failed to load");
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
  }, []);

  // Loading state: show loading message while fetching
  if (loading)
    return <div className="p-4 text-center">Loading market data…</div>;

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

  // Render: Main table with horizontal scroll for small screens
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Table header with column titles */}
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-sm font-semibold border-b">
              Name
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              Price
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              1h %
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              24h %
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              7d %
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              Market Cap
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              Volume(24h)
            </th>
            <th className="px-2 py-2 text-right text-sm font-semibold border-b">
              Circulating Supply
            </th>
            <th className="px-2 py-2 text-center text-sm font-semibold border-b">
              Last 7 Days
            </th>
          </tr>
        </thead>
        {/* Table body: render one row per market item */}
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? row.name + idx}
              className=" hover:bg-gray-100 cursor-pointer"
            >
              {/* Stock name column */}
              <td className="px-2 py-2 text-sm">
                <NavLink to={`/stock/${row.id}`}><a href="" className="hover:text-orange-600 transition-colors cursor-pointer group">{row.name}</a></NavLink>
              </td>

              {/* Current price column */}
              <td className="px-2 py-2 text-right text-sm">
                ${fmt(row.price)}
              </td>

              {/* 1-hour percentage change: green if positive, red if negative */}
              <td
                className={`px-2 py-2 text-right text-sm ${
                  row.percent1h >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.percent1h >= 0 ? "+" : ""}
                {fmt(row.percent1h)}%
              </td>

              {/* 24-hour percentage change: green if positive, red if negative */}
              <td
                className={`px-2 py-2 text-right text-sm ${
                  row.percent24h >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.percent24h >= 0 ? "+" : ""}
                {fmt(row.percent24h)}%
              </td>

              {/* 7-day percentage change: green if positive, red if negative */}
              <td
                className={`px-2 py-2 text-right text-sm ${
                  row.percent7d >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {row.percent7d >= 0 ? "+" : ""}
                {fmt(row.percent7d)}%
              </td>

              {/* Market capitalization in dollars */}
              <td className="px-2 py-2 text-right text-sm">
                ${fmtLarge(row.marketCap)}
              </td>

              {/* 24-hour trading volume in dollars */}
              <td className="px-2 py-2 text-right text-sm">
                ${fmtLarge(row.volume24h)}
              </td>

              {/* Circulating supply amount */}
              <td className="px-2 py-2 text-right text-sm">
                {fmtLarge(row.circulatingSupply)}
              </td>

              {/* Sparkline chart: mini 7-day price trend visualization using Chart.js */}
              <td className="px-2 py-2 text-center">
                <SparklineChart data={row.sparkline7d} label="7-Day Trend" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
