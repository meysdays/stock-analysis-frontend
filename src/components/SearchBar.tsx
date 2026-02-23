import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchStocks } from "../lib/data";
import type { StockSearchResult } from "../lib/definitions";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<StockSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const searchResults = await searchStocks(query);
                    setResults(searchResults);
                    setIsOpen(true);
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (stockId: number) => {
        navigate(`/stock/${stockId}`);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="flex items-center">
                <span className="px-4 -mr-12 flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-[20px] text-gray-500">
                        {isLoading ? "sync" : "search"}
                    </span>
                </span>
                <input
                    type="text"
                    placeholder="Search stocks..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                    className="w-full px-6 pl-12 py-2 bg-background-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-link/20 transition-all text-primary"
                />
            </div>

            {isOpen && (results.length > 0 || isLoading) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface-1 rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-caption">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((stock) => (
                            <button
                                key={stock.id}
                                onClick={() => handleSelect(stock.id)}
                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-background-2 transition-colors text-left"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-primary">{stock.symbol}</span>
                                    <span className="text-xs text-secondary truncate max-w-[200px]">{stock.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-caption bg-background-2 px-1.5 py-0.5 rounded uppercase">
                                        {stock.sector || "Other"}
                                    </span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-3 text-sm text-caption">No stocks found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
