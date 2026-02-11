export interface ChartDataPoint {
    date: string;
    price: number;
}

// Generate mock data
export const generateMockChartData = (): ChartDataPoint[] => {
    const data: ChartDataPoint[] = [];
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2025-12-31");

    let currentPrice = 100;

    // Generate daily data points
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // Simulate realistic price movements
        const volatility = 0.02;
        const trend = d.getMonth() < 6 ? 0.001 : (d.getMonth() < 10 ? 0.003 : -0.001);
        const randomChange = (Math.random() - 0.5) * volatility * currentPrice;
        const trendChange = trend * currentPrice;

        currentPrice = Math.max(60, Math.min(300, currentPrice + randomChange + trendChange));

        data.push({
            date: d.toISOString().split("T")[0],
            price: Math.round(currentPrice * 100) / 100,
        });
    }

    return data;
};

// Pre-generated mock data for consistent display
export const mockChartData: ChartDataPoint[] = [
    { date: "2024-01-01", price: 100.00 },
    { date: "2024-02-01", price: 108.50 },
    { date: "2024-03-01", price: 115.20 },
    { date: "2024-04-01", price: 112.80 },
    { date: "2024-05-01", price: 125.40 },
    { date: "2024-06-01", price: 130.00 },
    { date: "2024-07-01", price: 145.60 },
    { date: "2024-08-01", price: 160.20 },
    { date: "2024-09-01", price: 175.80 },
    { date: "2024-10-01", price: 195.40 },
    { date: "2024-11-01", price: 220.00 },
    { date: "2024-12-01", price: 240.50 },
    { date: "2025-01-01", price: 263.19 },
    { date: "2025-02-01", price: 245.00 },
    { date: "2025-03-01", price: 230.80 },
    { date: "2025-04-01", price: 215.40 },
    { date: "2025-05-01", price: 200.20 },
    { date: "2025-06-01", price: 185.60 },
    { date: "2025-07-01", price: 170.40 },
    { date: "2025-08-01", price: 155.20 },
    { date: "2025-09-01", price: 145.80 },
    { date: "2025-10-01", price: 138.40 },
    { date: "2025-11-01", price: 130.20 },
    { date: "2025-12-01", price: 134.19 },
];

export const mockIndexTenData: number[] = [67.82, 11.92, 4.21, 4.09, 2.33, 1.32, 0.77, 0.52, 0.46, 0.39, 6.17]
export const mockIndexTenLabels: string[] = [
    "BUA Foods Plc",
    "MTN Nigeria Communications Plc",
    "Dangote Cement Plc",
    "Airtel Africa Plc",
    "BUA Cement Plc",
    "Seplat Energy Plc",
    "Guaranty Trust Holding Company",
    "Zenith Bank Plc",
    "Geregu Power Plc",
    "Others"
];

// Format labels for the chart
export const formatChartLabels = (data: ChartDataPoint[]): string[] => {
    return data.map((point) => {
        const date = new Date(point.date);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    });
};

// Extract prices for the chart
export const extractPrices = (data: ChartDataPoint[]): number[] => {
    return data.map((point) => point.price);
};

// Calculate statistics from chart data
export interface ChartStats {
    currentPrice: number;
    change24h: number;
    changePercent24h: number;
    yearlyHigh: number;
    yearlyHighDate: string;
    yearlyLow: number;
    yearlyLowDate: string;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
}

export const calculateStats = (data: ChartDataPoint[]): ChartStats => {
    if (data.length === 0) {
        return {
            currentPrice: 0,
            change24h: 0,
            changePercent24h: 0,
            yearlyHigh: 0,
            yearlyHighDate: "",
            yearlyLow: 0,
            yearlyLowDate: "",
            yesterday: 0,
            lastWeek: 0,
            lastMonth: 0,
        };
    }

    const current = data[data.length - 1];
    const yesterday = data[data.length - 2] || current;
    const lastWeek = data[Math.max(0, data.length - 8)] || current;
    const lastMonth = data[Math.max(0, data.length - 31)] || current;

    let high = data[0];
    let low = data[0];

    for (const point of data) {
        if (point.price > high.price) high = point;
        if (point.price < low.price) low = point;
    }

    const change = current.price - yesterday.price;
    const changePercent = (change / yesterday.price) * 100;

    return {
        currentPrice: current.price,
        change24h: change,
        changePercent24h: changePercent,
        yearlyHigh: high.price,
        yearlyHighDate: high.date,
        yearlyLow: low.price,
        yearlyLowDate: low.date,
        yesterday: yesterday.price,
        lastWeek: lastWeek.price,
        lastMonth: lastMonth.price,
    };
};
