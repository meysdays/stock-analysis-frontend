import React, { type ReactNode } from "react";

export interface CardProps {
    children?: ReactNode;
    title?: string;
    value?: string | number;
    className?: string;
    action?: ReactNode;
}

export interface NavLink {
    href: string;
    label: string;
}


export interface DashboardSection {
    title: string;
    icon: string | React.ElementType;
    links: { href: string; label: string; icon: string | React.ElementType; iconClass: string }[];
}
export type NavItem = DashboardSection[]

export type NavOption = {
    [key: string]: NavItem
}

export interface TabItem {
    label: string;
    href: string;
}

export interface StockApiData {
    date: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    stock_name: string;
}

export interface SparklinePoint {
    date: string;
    value: number;
}

export interface MarketTableResponse {
    stocks: MarketItem[];
    total: number;
    page: number;
    limit: number;
}

export interface DashboardStock {
    id: number;
    symbol: string;
    name: string;
    price: number;
    change_1h: number | null;
    change_24h: number | null;
    change_7d: number | null;
    market_cap: number;
    volume_24h: number;
    sparkline_7d: SparklinePoint[];
}

export interface APIStock {
    symbol: string;
    id: number;
    name: string;
    outstanding_shares: number;
    sector: string;
    industry: string;
    description: string;
    website: string;
    market_cap: string;
    currency: string;
    exchange: string;
    last_updated: string;
    pe_ratio: string;
    fifty_two_week_high: string;
    fifty_two_week_low: string;
    adjustment_factor: string | null;
    price: number;
    percent1h: number;
    percent24h: number;
    percent7d: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    sparkline7d?: number[];
}

export interface StockName {
    id: number;
    stock_name: string;
}

export interface SignalApiData {
    symbol: string;
    signal: string;
    score: number;
    reasons: string[];
}

export interface KlineData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}


export interface KlineResponse {
    symbol: string;
    interval: string;
    klines: KlineData[];
}

export interface StockStatsResponse {
    stock_id: number;
    symbol: string;
    market_cap: number | null;
    revenue_ttm: number | null;
    net_income: number | null;
    eps: number | null;
    shares_outstanding: number | null;
    pe_ratio: number | null;
    forward_pe: number | null;
    dividend: number | null;
    ex_dividend_date: string | null;
    volume: number | null;
    avg_volume: number | null;
    open: number | null;
    previous_close: number | null;
    day_range: string | null;
    fifty_two_week_range: string | null;
    beta: number | null;
    rsi: number | null;
    earnings_date: string | null;
    payout_ratio: number | null;
    dividend_growth: number | null;
    payout_frequency: string | null;
    revenue_growth: number | null;
    revenue_per_employee: number | null;
}

export interface StockInfoResponse {
    stock_id: number;
    symbol: string;
    ipo_date: string | null;
    name: string | null;
    fifty_two_week_high: number | null;
    fifty_two_week_low: number | null;
    fifty_day_moving_average: number | null;
    sector: string | null;
    industry: string | null;
    sentiment: string | null;
    sp_score: number | null;
}

export type Stat = {
    label: string;
    value: string;
}

export interface StatisticsCardProps {
    symbol: string;
    description: string;
    stats: Stat[];
    sidebarTitle: string;
    sidebarText: string;
}

export interface RelatedStock {
    stock_id: number;
    symbol: string;
    market_cap: number | null;
    revenue_ttm: number | null;
}


export interface NavItemType {
    name: string;
    path: string;
    icon: React.ElementType | string;
}

export interface CardProps {
    children?: React.ReactNode;
    title?: string;
    value?: string | number;
    className?: string;
    action?: React.ReactNode;
}
export interface StockComparisonBrief {
    id: number;
    symbol: string;
    sector: string | null;
    rank: number | null;
}

export interface PopularComparisonResponse {
    stocks: StockComparisonBrief[];
}

export interface DividendData {
    id: number;
    stock_id: number;
    ex_dividend_date: string | null;
    record_date: string | null;
    pay_date: string | null;
    amount: number | null;
    currency: string | null;
    frequency: string | null;
}

export type DividendResponse = DividendData[];

// ── Search ──────────────────────────────────────────

export interface StockSearchResult {
    id: number;
    symbol: string;
    name: string | null;
    sector: string | null;
}

// ── Market Cap History ──────────────────────────────

export interface MarketCapHistoryItem {
    id: number;
    stock_id: number;
    date: string;
    market_cap: number | null;
    frequency: string | null;
}

export interface MarketCapHistoryResponse {
    stock_id: number;
    symbol: string;
    history: MarketCapHistoryItem[];
}

// ── Profile & Executives ───────────────────────────

export interface StockExecutive {
    id: number;
    name: string;
    title: string | null;
    age: number | null;
    since: string | null;
}

export interface StockProfile {
    id: number;
    symbol: string;
    name: string | null;
    description: string | null;
    sector: string | null;
    industry: string | null;
    exchange: string | null;
    currency: string | null;
    country: string | null;
    founded: string | null;
    headquarters: string | null;
    website: string | null;
    employees: number | null;
    ceo: string | null;
    executives: StockExecutive[];
}

// ── Bulk Comparison ────────────────────────────────

export interface BulkComparisonItem {
    stock_id: number;
    symbol: string;
    klines: KlineData[];
    stats: StockStatsResponse | null;
}

export interface BulkComparisonResponse {
    comparisons: BulkComparisonItem[];
}

// ── Market Table ───────────────────────────────────

export interface MarketItem {
    id: number;
    symbol: string;
    name: string;
    price: number;
    change_1h: number | null;
    change_24h: number | null;
    change_7d: number | null;
    market_cap: number;
    volume_24h: number;
    circulatingSupply?: number;
    sparkline_7d: SparklinePoint[] | number[];
}

// ── Full Comparison (80+ fields) ──────────────────

export interface StockComparisonItem {
    stock_id: number;
    symbol: string;
    name: string | null;
    sector: string | null;
    industry: string | null;
    exchange: string | null;
    website: string | null;
    country: string | null;
    employees: number | null;
    founded: string | null;
    ipo_date: string | null;

    // Price
    stock_price: number | null;
    price_change_1d: number | null;
    price_change_percent_1d: number | null;
    open_price: number | null;
    previous_close: number | null;
    low_price: number | null;
    high_price: number | null;
    volume: number | null;
    dollar_volume: number | null;
    stock_price_date: string | null;

    // 52-week
    fifty_two_week_low: number | null;
    fifty_two_week_high: number | null;

    // Valuation
    market_cap: number | null;
    enterprise_value: number | null;
    pe_ratio: number | null;
    forward_pe: number | null;
    ps_ratio: number | null;
    pb_ratio: number | null;
    peg_ratio: number | null;
    ev_sales: number | null;
    ev_ebitda: number | null;
    ev_ebit: number | null;
    ev_fcf: number | null;
    earnings_yield: number | null;
    fcf_yield: number | null;

    // Financials
    revenue: number | null;
    gross_profit: number | null;
    operating_income: number | null;
    net_income: number | null;
    ebitda: number | null;
    ebit: number | null;
    eps: number | null;
    revenue_growth: number | null;
    net_income_growth: number | null;
    eps_growth: number | null;

    // Margins
    gross_margin: number | null;
    operating_margin: number | null;
    profit_margin: number | null;
    fcf_margin: number | null;

    // Cash flow
    operating_cash_flow: number | null;
    investing_cash_flow: number | null;
    financing_cash_flow: number | null;
    net_cash_flow: number | null;
    capital_expenditures: number | null;
    free_cash_flow: number | null;

    // Balance sheet
    total_cash: number | null;
    total_debt: number | null;
    net_cash_debt: number | null;
    total_assets: number | null;
    total_liabilities: number | null;
    shareholders_equity: number | null;
    working_capital: number | null;
    book_value_per_share: number | null;
    shares_outstanding: number | null;

    // Ratios
    roe: number | null;
    roa: number | null;
    roic: number | null;
    roce: number | null;
    current_ratio: number | null;
    quick_ratio: number | null;
    debt_equity: number | null;
    debt_ebitda: number | null;
    interest_coverage: number | null;
    altman_z_score: number | null;
    piotroski_f_score: number | null;

    // Technicals
    rsi: number | null;
    beta: number | null;
    ma_20: number | null;
    ma_50: number | null;
    ma_200: number | null;

    // Dividends
    dividend_yield: number | null;
    dividend_per_share: number | null;
    ex_div_date: string | null;
    payout_ratio: number | null;
    dividend_growth: number | null;
    payout_frequency: string | null;
}
// ── Metric Comparison ──────────────────────────────

export interface MetricDataPoint {
    date: string;
    value: number;
}

export interface MetricComparison {
    stock_id: number;
    symbol: string;
    metric: string;
    data: MetricDataPoint[];
}

export interface MetricComparisonResponse {
    metric: string;
    comparisons: MetricComparison[];
}

export interface IncomeStatement {
    [key: string]: number | string | null | undefined;
}

export interface Stock {
    id: number;
    symbol: string;
    name: string;
    sector: string;
    industry: string;
    exchange: string;
    currency: string;
    country: string;
    website: string;
    ceo: string;
    employees: number;
    fiscal_year_end: string;

    income_statement: IncomeStatement;
}

export type TableHeader<T> = {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
    render?: (item: T) => React.ReactNode;
};
