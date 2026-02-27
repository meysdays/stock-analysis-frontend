import type { DashboardItem } from "../components/MarketTable/types";
import api from "./api";
import type {
  APIStock,
  KlineResponse,
  StockStatsResponse,
  StockInfoResponse,
  RelatedStock,
  PopularComparisonResponse,
  DividendResponse,
  StockSearchResult,
  MarketCapHistoryResponse,
  StockProfile,
  StockExecutive,
  BulkComparisonResponse,
  StockComparisonItem,
  MetricComparisonResponse,
  MarketTableResponse,
  IncomeStatement,
  AIChatResponse,
} from "./definitions";
import type { MarketItem } from "../components/MarketTable/types";

export const getStockById = async (id: number): Promise<APIStock> => {
  const { data } = await api.get<APIStock>(`/stocks/${id}`);
  return data;
};

export const getKlines = async (
  id: number,
  interval: string = "week",
  limit: number = 100,
): Promise<KlineResponse> => {
  const { data } = await api.get<KlineResponse>(`/stocks/${id}/klines`, {
    params: { interval, limit },
  });
  return data;
};

export const getStockStats = async (
  id: number,
): Promise<StockStatsResponse> => {
  const { data } = await api.get<StockStatsResponse>(`/stocks/${id}/stats`);
  return data;
};

export const getStockInfo = async (id: number): Promise<StockInfoResponse> => {
  const { data } = await api.get<StockInfoResponse>(`/stocks/${id}/info`);
  return data;
};

export const getRelatedStocks = async (
  id: number,
  limit: number = 10,
): Promise<RelatedStock[]> => {
  const { data } = await api.get<RelatedStock[]>(`/stocks/${id}/related`, {
    params: { limit },
  });
  return data;
};

export const getFinancials = async (id: number): Promise<IncomeStatement[]> => {
  const { data } = await api.get<IncomeStatement[]>(
    `stocks/${id}/financials/income-statement`,
  );
  return data;
};

export const getPaginatedMarketData = async (
  page: number,
  limit: number,
): Promise<DashboardItem[]> => {
  const { data } = await api.get<DashboardItem[]>(
    `/stocks?page=${page}&limit=${limit}`,
    {
      params: { page, limit },
    },
  );
  return data;
};

export const getDashboardStocks = async (
  page: number,
  limit: number,
): Promise<MarketItem[]> => {
  const { data } = await api.get<MarketTableResponse>(`/stocks/dashboard`, {
    params: { page, limit },
  });

  return data.stocks;
};

export const getPopularComparisons =
  async (): Promise<PopularComparisonResponse> => {
    const { data } =
      await api.get<PopularComparisonResponse>(`/popular_comparisons`);
    return data;
  };

export const getDividends = async (id: number): Promise<DividendResponse> => {
  const { data } = await api.get<DividendResponse>(`/stocks/${id}/dividends`);
  return data;
};

// ── New API functions ──────────────────────────────

export const searchStocks = async (
  query: string,
  limit: number = 10,
): Promise<StockSearchResult[]> => {
  const { data } = await api.get<StockSearchResult[]>(`/stocks/search`, {
    params: { q: query, limit },
  });
  return data;
};

export const getMarketCapHistory = async (
  id: number,
  limit: number = 500,
): Promise<MarketCapHistoryResponse> => {
  const { data } = await api.get<MarketCapHistoryResponse>(
    `/stocks/${id}/market-cap`,
    {
      params: { limit },
    },
  );
  return data;
};

export const getStockProfile = async (id: number): Promise<StockProfile> => {
  const { data } = await api.get<StockProfile>(`/stocks/${id}/profile`);
  return data;
};

export const getStockExecutives = async (
  id: number,
): Promise<StockExecutive[]> => {
  const { data } = await api.get<StockExecutive[]>(`/stocks/${id}/executives`);
  return data;
};

export const getBulkComparison = async (
  symbols: string,
  interval: string = "week",
  limit: number = 52,
): Promise<BulkComparisonResponse> => {
  const { data } = await api.get<BulkComparisonResponse>(`/stocks/compare`, {
    params: { symbols, interval, limit },
  });
  return data;
};

export const getStockComparison = async (
  id: number,
): Promise<StockComparisonItem> => {
  const { data } = await api.get<StockComparisonItem>(
    `/stocks/${id}/comparison`,
  );
  return data;
};

export const getCompareMetrics = async (
  metric: string,
  symbols: string,
): Promise<MetricComparisonResponse> => {
  const { data } = await api.get<MetricComparisonResponse>(
    `/stocks/compare-metrics`,
    {
      params: { metric, symbols },
    },
  );
  return data;
};

export const sendAIQuestion = async (
  question: string,
): Promise<AIChatResponse> => {
  const {data} = await api.post<AIChatResponse>(`/stocks/chat`,{
    question
  });

  return data;
};
