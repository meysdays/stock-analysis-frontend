import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStockComparison } from "../../../lib/data";
import type { StockComparisonItem } from "../../../lib/definitions";
import { formatValue } from "../../../utils/utils";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
            {children}
        </div>
    </div>
);

const StatRow = ({ label, value, subtext }: { label: string; value: string | number | null | undefined; subtext?: string }) => (
    <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">{formatValue(value)}</span>
            {subtext && <span className="text-xs text-gray-400">{subtext}</span>}
        </div>
    </div>
);

const Statistics = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<StockComparisonItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setIsLoading(true);
                const result = await getStockComparison(Number(id));
                setData(result);
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="p-8 text-center text-gray-500">
                No detailed statistics available for this stock.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
                <p className="text-gray-500 mt-2">Comprehensive financial and technical metrics for {data.name} ({data.symbol}).</p>
            </div>

            <Section title="Valuation">
                <StatRow label="Market Cap" value={data.market_cap} />
                <StatRow label="Enterprise Value" value={data.enterprise_value} />
                <StatRow label="PE Ratio" value={data.pe_ratio} />
                <StatRow label="Forward PE" value={data.forward_pe} />
                <StatRow label="PS Ratio" value={data.ps_ratio} />
                <StatRow label="PB Ratio" value={data.pb_ratio} />
                <StatRow label="PEG Ratio" value={data.peg_ratio} />
                <StatRow label="EV/Sales" value={data.ev_sales} />
                <StatRow label="EV/EBITDA" value={data.ev_ebitda} />
                <StatRow label="EV/FCF" value={data.ev_fcf} />
                <StatRow label="Earnings Yield" value={data.earnings_yield} subtext="%" />
                <StatRow label="FCF Yield" value={data.fcf_yield} subtext="%" />
            </Section>

            <Section title="Financial Highlights">
                <StatRow label="Revenue" value={data.revenue} />
                <StatRow label="Revenue Growth" value={data.revenue_growth} subtext="%" />
                <StatRow label="Gross Profit" value={data.gross_profit} />
                <StatRow label="Operating Income" value={data.operating_income} />
                <StatRow label="EBITDA" value={data.ebitda} />
                <StatRow label="Net Income" value={data.net_income} />
                <StatRow label="Net Income Growth" value={data.net_income_growth} subtext="%" />
                <StatRow label="EPS (Basic)" value={data.eps} />
                <StatRow label="EPS Growth" value={data.eps_growth} subtext="%" />
            </Section>

            <Section title="Profitability & Margins">
                <StatRow label="Gross Margin" value={data.gross_margin} subtext="%" />
                <StatRow label="Operating Margin" value={data.operating_margin} subtext="%" />
                <StatRow label="Profit Margin" value={data.profit_margin} subtext="%" />
                <StatRow label="FCF Margin" value={data.fcf_margin} subtext="%" />
                <StatRow label="ROE" value={data.roe} subtext="%" />
                <StatRow label="ROA" value={data.roa} subtext="%" />
                <StatRow label="ROIC" value={data.roic} subtext="%" />
                <StatRow label="ROCE" value={data.roce} subtext="%" />
            </Section>

            <Section title="Balance Sheet">
                <StatRow label="Total Cash" value={data.total_cash} />
                <StatRow label="Total Debt" value={data.total_debt} />
                <StatRow label="Net Cash / Debt" value={data.net_cash_debt} />
                <StatRow label="Total Assets" value={data.total_assets} />
                <StatRow label="Total Liabilities" value={data.total_liabilities} />
                <StatRow label="Shareholders' Equity" value={data.shareholders_equity} />
                <StatRow label="Current Ratio" value={data.current_ratio} />
                <StatRow label="Quick Ratio" value={data.quick_ratio} />
                <StatRow label="Debt / Equity" value={data.debt_equity} />
                <StatRow label="Debt / EBITDA" value={data.debt_ebitda} />
            </Section>

            <Section title="Cash Flow">
                <StatRow label="Operating Cash Flow" value={data.operating_cash_flow} />
                <StatRow label="Investing Cash Flow" value={data.investing_cash_flow} />
                <StatRow label="Financing Cash Flow" value={data.financing_cash_flow} />
                <StatRow label="Free Cash Flow" value={data.free_cash_flow} />
                <StatRow label="Capital Expenditures" value={data.capital_expenditures} />
            </Section>

            <Section title="Dividends">
                <StatRow label="Dividend Yield" value={data.dividend_yield} subtext="%" />
                <StatRow label="Dividend Per Share" value={data.dividend_per_share} />
                <StatRow label="Payout Ratio" value={data.payout_ratio} subtext="%" />
                <StatRow label="Dividend Growth" value={data.dividend_growth} subtext="%" />
                <StatRow label="Payout Frequency" value={data.payout_frequency} />
            </Section>

            <Section title="Technicals">
                <StatRow label="Beta" value={data.beta} />
                <StatRow label="RSI (14)" value={data.rsi} />
                <StatRow label="50-Day Moving Avg" value={data.ma_50} />
                <StatRow label="200-Day Moving Avg" value={data.ma_200} />
                <StatRow label="52-Week High" value={data.fifty_two_week_high} />
                <StatRow label="52-Week Low" value={data.fifty_two_week_low} />
            </Section>
        </div>
    );
};

export default Statistics;
