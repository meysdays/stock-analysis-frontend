export interface StockApiData {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    stock_name: string;
}


export interface StockName {
    stock_name: string;
}

const BASE_URL = 'http://127.0.0.1:8000';

// Helper to Title Case the stock name (backend requires 'Stock\Name' but list returns 'STOCK\NAME')
const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

export interface SignalApiData {
    symbol: string;
    signal: string;
    score: number;
    reasons: string[];
}

export const getStocks = async (): Promise<StockName[]> => {
    const response = await fetch(`${BASE_URL}/stocks/stocks_name`);
    if (!response.ok) {
        throw new Error('Failed to fetch stocks');
    }
    return response.json();
};

export const getStockDetails = async (name: string): Promise<StockApiData[]> => {
    // Convert API returned UPPERCASE name to Title Case for the details endpoint
    const formattedName = toTitleCase(name);
    const response = await fetch(`${BASE_URL}/stocks/name/${encodeURIComponent(formattedName)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch stock details');
    }
    return response.json();
};

export const getSignal = async (name: string): Promise<SignalApiData> => {
    // Convert API returned UPPERCASE name to Title Case for the signal endpoint
    const formattedName = toTitleCase(name);
    const response = await fetch(`${BASE_URL}/stocks/signal?stock_name=${encodeURIComponent(formattedName)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch signal');
    }
    return response.json();
};
