
import type { StockName } from "../api";

interface StockListProps {
    stocks: StockName[];
    onSelect: (name: string) => void;
    selectedStock: string;
}

const StockList = ({ stocks, onSelect, selectedStock }: StockListProps) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-[calc(100vh-120px)] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Stocks</h3>
                <span className="text-xs text-gray-400 font-medium">Sort by Newest</span>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-1 scrollbar-hide">
                {stocks.map((stock, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(stock.stock_name)}
                        className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-200 group ${selectedStock === stock.stock_name
                            ? 'bg-orange-50 ring-1 ring-orange-100'
                            : 'hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${selectedStock === stock.stock_name
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                }`}>
                                {stock.stock_name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <p className={`font-semibold text-sm ${selectedStock === stock.stock_name ? 'text-gray-900' : 'text-gray-700'
                                    }`}>
                                    {stock.stock_name}
                                </p>
                                <p className="text-xs text-gray-400">Stock Ticker</p>
                            </div>
                        </div>
                        {selectedStock === stock.stock_name && (
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockList;
