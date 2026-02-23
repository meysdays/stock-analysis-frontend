import { useState, useEffect, useRef } from "react";
import { getPopularComparisons, searchStocks, getBulkComparison, getStockById, getCompareMetrics } from "../../lib/data";
import type { APIStock, KlineData, StockSearchResult, MetricDataPoint } from "../../lib/definitions";
import ComparisonChart from "../../components/Chart/ComparisonChart";

const TAG_COLORS = [
    { border: "border-blue-500", bg: "bg-white", accent: "bg-white" },
    { border: "border-orange-500", bg: "bg-orange-50/50", accent: "bg-orange-500" },
    { border: "border-purple-600", bg: "bg-purple-50/50", accent: "bg-purple-600" },
];

const Switch = ({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between w-full py-1">
        <span className="text-[13px] text-secondary">{label}</span>
        <button
            onClick={onChange}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-link" : "bg-background-2"
                }`}
        >
            <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
                    }`}
            />
        </button>
    </div>
);

const Comparison = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isMetricOpen, setIsMetricOpen] = useState(false);
    const [labelsEnabled, setLabelsEnabled] = useState(true);
    const [datePickerEnabled, setDatePickerEnabled] = useState(false);
    const [rangeSliderEnabled, setRangeSliderEnabled] = useState(false);
    const [popularComparisons, setPopularComparisons] = useState<{ symbol1: string; symbol2: string }[]>([]);
    const [stocksKlines, setStocksKlines] = useState<Record<string, KlineData[]>>({});
    const [metricData, setMetricData] = useState<Record<string, MetricDataPoint[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<{ label: string; value: string }>({
        label: "Total Return (%)",
        value: "price_performance",
    });

    const METRICS = [
        { label: "Total Return (%)", value: "price_performance" },
        { label: "Market Cap", value: "market_cap" },
        { label: "Revenue", value: "revenue" },
        { label: "Net Income", value: "net_income" },
        { label: "EPS", value: "eps" },
        { label: "PE Ratio", value: "pe_ratio" },
    ];

    // Search & Selection State
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<StockSearchResult[]>([]);
    const [selectedStocks, setSelectedStocks] = useState<APIStock[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const metricRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await getPopularComparisons();
                const groupedBySector: Record<string, string[]> = {};
                response.stocks.forEach(stock => {
                    const sector = stock.sector || "Other";
                    if (!groupedBySector[sector]) {
                        groupedBySector[sector] = [];
                    }
                    groupedBySector[sector].push(stock.symbol);
                });

                const pairs: { symbol1: string; symbol2: string }[] = [];
                Object.values(groupedBySector).forEach(symbols => {
                    if (symbols.length >= 2) {
                        pairs.push({ symbol1: symbols[0], symbol2: symbols[1] });
                    }
                });
                setPopularComparisons(pairs);
            } catch (error) {
                console.error("Failed to fetch popular comparisons:", error);
            }
        };

        fetchPopular();

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearching(false);
            }
            if (metricRef.current && !metricRef.current.contains(event.target as Node)) {
                setIsMetricOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCompareStock = async (symbol1: string, symbol2: string) => {
        try {
            setIsLoading(true);
            const searchResults = await searchStocks(symbol1, 1);
            const searchResults2 = await searchStocks(symbol2, 1);

            if (searchResults.length && searchResults2.length) {
                const [s1, s2] = await Promise.all([
                    getStockById(searchResults[0].id),
                    getStockById(searchResults2[0].id)
                ]);
                setSelectedStocks([s1, s2]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Failed to load comparison:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            if (selectedStocks.length === 0) {
                setStocksKlines({});
                setMetricData({});
                return;
            }

            setIsLoading(true);
            try {
                const symbols = selectedStocks.map(s => s.symbol).join(",");

                if (selectedMetric.value === "price_performance") {
                    const response = await getBulkComparison(symbols, "week", 52);
                    const newKlines: Record<string, KlineData[]> = {};
                    response.comparisons.forEach(item => {
                        newKlines[item.symbol] = item.klines;
                    });
                    setStocksKlines(newKlines);
                } else {
                    const response = await getCompareMetrics(selectedMetric.value, symbols);
                    const newMetricData: Record<string, MetricDataPoint[]> = {};
                    response.comparisons.forEach(item => {
                        newMetricData[item.symbol] = item.data;
                    });
                    setMetricData(newMetricData);
                }
            } catch (error) {
                console.error("Failed to fetch comparison data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [selectedStocks, selectedMetric]);

    const getNormalizedData = () => {
        const symbols = selectedStocks.map(s => s.symbol);
        if (symbols.length === 0) return { labels: [], datasets: [] };

        if (selectedMetric.value === "price_performance") {
            const firstSymbol = symbols[0];
            const baseKlines = stocksKlines[firstSymbol] || [];
            if (baseKlines.length === 0) return { labels: [], datasets: [] };

            const labels = baseKlines.map(k => new Date(k.date).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "2-digit" }));

            const datasets = selectedStocks.map((stock, idx) => {
                const klines = stocksKlines[stock.symbol] || [];
                if (klines.length === 0) return { label: stock.symbol, data: [], color: TAG_COLORS[idx % TAG_COLORS.length].accent.replace('bg-', '') };

                const startPrice = klines[0].close;
                const data = klines.map(k => ((k.close - startPrice) / startPrice) * 100);
                const colors = ["#3b82f6", "#f97316", "#9333ea"];

                return {
                    label: stock.symbol,
                    data: data,
                    color: colors[idx % colors.length],
                };
            });
            return { labels, datasets };
        } else {
            const firstSymbol = symbols[0];
            const baseData = metricData[firstSymbol] || [];
            if (baseData.length === 0) return { labels: [], datasets: [] };

            const labels = baseData.map(d => new Date(d.date).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "2-digit" }));

            const datasets = selectedStocks.map((stock, idx) => {
                const dataPoints = metricData[stock.symbol] || [];
                const data = dataPoints.map(d => d.value);
                const colors = ["#3b82f6", "#f97316", "#9333ea"];

                return {
                    label: stock.symbol,
                    data: data,
                    color: colors[idx % colors.length],
                };
            });
            return { labels, datasets };
        }
    };

    const chartData = getNormalizedData();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const filtered = await searchStocks(searchQuery, 6);
                setSuggestions(filtered.filter(s => !selectedStocks.some(sel => sel.symbol === s.symbol)));
            } catch (error) {
                console.error("Search failed:", error);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedStocks]);

    const addStock = async (suggestion: StockSearchResult) => {
        if (selectedStocks.length < 3) {
            try {
                const stock = await getStockById(suggestion.id);
                setSelectedStocks([...selectedStocks, stock]);
                setSearchQuery("");
                setSuggestions([]);
                setIsSearching(false);
            } catch (error) {
                console.error("Failed to add stock:", error);
            }
        }
    };

    const removeStock = (symbol: string) => {
        setSelectedStocks(selectedStocks.filter(s => s.symbol !== symbol));
    };


    return (
        <div className="flex flex-col w-full min-h-screen bg-background-1 text-primary font-sans">
            {/* Header */}
            <div className="px-8 pt-6 pb-2 border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">Compare Stocks</h1>

            </div>

            {/* Controls */}
            <div className="px-8 py-6 flex flex-wrap items-center gap-4">
                {/* Search Bar with Tags */}
                <div className="flex-1 relative min-w-[400px]" ref={searchRef}>
                    <div className={`flex items-center gap-2 p-1.5 bg-surface-1 border border-gray-100 rounded-xl transition-all duration-200  ${isSearching ? "ring-2 ring-link border-transparent" : ""}`}>
                        <div className="flex items-center gap-2 flex-wrap pl-2">
                            {selectedStocks.map((stock, idx) => {
                                const color = TAG_COLORS[idx % TAG_COLORS.length];
                                return (
                                    <div
                                        key={stock.symbol}
                                        className={`flex items-center gap-2 px-3 py-1.5  border-2 border-l-4 ${color.border} rounded-lg group animate-in zoom-in-95 duration-200 bg-background-2/40`}
                                    >
                                        <div className={`w-2.5 h-2.5 rounded-sm`} />
                                        <span className="text-[13px] font-bold text-primary tracking-tight">NGX:{stock.symbol}</span>
                                        <button
                                            onClick={() => removeStock(stock.symbol)}
                                            className="hover:bg-background-2 rounded-full p-0.5 transition-colors flex items-center justify-center"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">close</span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedStocks.length < 3 && (
                            <div className="flex-1 flex items-center min-w-[120px]">
                                <span className="material-symbols-outlined text-[20px] text-caption ml-2">search</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearching(true)}
                                    placeholder={selectedStocks.length === 0 ? "Search for a stock" : "Add stock"}
                                    className="w-full pl-2 pr-4 py-1 bg-transparent focus:outline-none text-[14px] placeholder:text-caption"
                                />
                            </div>
                        )}

                        {selectedStocks.length === 3 && (
                            <div className="flex-1 text-[13px] text-caption font-medium px-4 py-1 italic">
                                Maximum reached (3)
                            </div>
                        )}

                        <div className="pr-2 flex items-center">
                            <span className="material-symbols-outlined text-[22px] text-secondary">search</span>
                        </div>
                    </div>

                    {/* Suggestions Dropdown */}
                    {isSearching && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-1 border border-gray-100 rounded-2xl  z-[60] py-2 animate-in slide-in-from-top-2 duration-200">
                            {suggestions.map((stock) => (
                                <button
                                    key={stock.symbol}
                                    onClick={() => addStock(stock)}
                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-background-2 transition-colors text-left"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-primary">{stock.symbol}</span>
                                        <span className="text-[12px] text-secondary">{stock.name}</span>
                                    </div>
                                    <div className="bg-background-2 px-2 py-0.5 rounded text-[11px] font-bold text-secondary">NGX</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Return Dropdown */}
                <div className="relative" ref={metricRef}>
                    <button
                        onClick={() => setIsMetricOpen(!isMetricOpen)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-surface-1 border border-gray-100 rounded-xl hover:bg-background-2 transition-colors  text-[14px] font-medium text-secondary"
                    >
                        {selectedMetric.label}
                        <span className={`material-symbols-outlined text-[20px] text-caption transition-transform ${isMetricOpen ? "rotate-180" : ""}`}>expand_more</span>
                    </button>

                    {isMetricOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-surface-1 border border-gray-100 rounded-2xl shadow-2xl z-[70] py-2 animate-in fade-in zoom-in-95 duration-200">
                            {METRICS.map((m) => (
                                <button
                                    key={m.value}
                                    onClick={() => {
                                        setSelectedMetric(m);
                                        setIsMetricOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-background-2 transition-colors ${selectedMetric.value === m.value ? "text-link font-bold bg-link/10" : "text-secondary font-medium"}`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Options Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-surface-1 border border-gray-100 rounded-xl hover:bg-background-2 transition-colors  text-[14px] font-medium text-secondary"
                    >
                        Options
                        <span className={`material-symbols-outlined text-[20px] text-caption transition-transform ${isOptionsOpen ? "rotate-180" : ""}`}>expand_more</span>
                    </button>

                    {isOptionsOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-surface-1 border border-gray-100 rounded-2xl shadow-2xl z-50 py-3 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-1 space-y-1">
                                <Switch label="Labels" enabled={labelsEnabled} onChange={() => setLabelsEnabled(!labelsEnabled)} />
                                <Switch label="Date Picker" enabled={datePickerEnabled} onChange={() => setDatePickerEnabled(!datePickerEnabled)} />
                                <Switch label="Range Slider" enabled={rangeSliderEnabled} onChange={() => setRangeSliderEnabled(!rangeSliderEnabled)} />
                            </div>

                            <div className="h-px bg-gray-100 my-2" />

                            <div className="px-2 space-y-0.5">
                                {[
                                    { icon: "print", label: "Print" },
                                    { icon: "fullscreen", label: "View full screen" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-3 py-2 text-[13px] text-secondary hover:bg-background-2 cursor-pointer rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[18px] opacity-70">{item.icon}</span>
                                            {item.label}
                                        </div>

                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-gray-100 my-2" />

                            <div className="px-2 space-y-0.5">
                                {[
                                    { icon: "description", label: "Download to CSV" },
                                    { icon: "image", label: "Download JPEG" },
                                    { icon: "description", label: "Download PDF" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-3 py-2 text-[13px] text-secondary hover:bg-background-2 cursor-pointer rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[18px] opacity-70 text-caption">{item.icon}</span>
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart Area */}
            <div className="px-8 pb-8 flex-1">
                <div className="w-full h-full min-h-[500px] bg-surface-1 border border-gray-100 rounded-lg overflow-hidden relative group p-6">
                    {selectedStocks.length > 0 ? (
                        isLoading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                <div className="w-8 h-8 border-4 border-link border-t-transparent rounded-full animate-spin" />
                                <p className="text-secondary text-sm">Loading {selectedMetric.label} data...</p>
                            </div>
                        ) : (
                            <ComparisonChart
                                labels={chartData.labels}
                                datasets={chartData.datasets}
                            />
                        )
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <h3 className="text-xl font-semibold text-primary">
                                Add a stock symbol to get started
                            </h3>
                            <p className="text-secondary text-sm max-w-xs">
                                Search for your favorite stocks to compare their performance over time.
                            </p>
                            {/* Background grid pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
                                style={{ backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Popular Stock Comparisons Section */}
            <div className="px-8 pb-12 mt-4">
                <div className="flex items-center gap-2 mb-8">
                    <h2 className="text-xl font-bold text-primary">Popular Stock Comparisons</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {popularComparisons.length > 0 ? (
                        popularComparisons.map((pair, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCompareStock(pair.symbol1, pair.symbol2)}
                                className="group flex items-center justify-center gap-3 px-6 py-4 bg-background-2/50 hover:bg-background-2 text-primary rounded-xl transition-all duration-200 border border-gray-100 hover:border-link/30"
                            >
                                <span className="text-[14px] font-bold tracking-tight">{pair.symbol1}</span>
                                <span className="text-[12px] font-medium text-secondary italic">vs.</span>
                                <span className="text-[14px] font-bold tracking-tight">{pair.symbol2}</span>
                            </button>
                        ))
                    ) : (
                        // Skeleton/Fallback if loading
                        [...Array(12)].map((_, i) => (
                            <div key={i} className="h-14 bg-background-2 animate-pulse rounded-lg" />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comparison;