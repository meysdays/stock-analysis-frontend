import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IncomeStatement } from "../../../lib/definitions";
import { getFinancials } from "../../../lib/data";
import Table from "../../../components/Table";
import { pivotIncomeStatements } from "../../../lib/pivotTransform";
// import type { FinancialItem } from "../../../components/MarketTable/types";

const Financials = () => {
  const { id } = useParams<{ id: string }>();
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatement[]>([]);
  // const [uniqueHeaders, setUniqueHeaders] = useState<string[]>([]);
  // const [stats, setStats] = useState<StockStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pivotedRows, setPivotedRows] = useState<any[]>([]);
  const [headers, setHeaders] = useState<TableHeader<any>[]>([]);

  const fiscalYears = ["FY2021", "FY2022", "FY2023", "FY2024", "FY2025"];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);

        const incomeStatements: IncomeStatement[] = await getFinancials(
          Number(id),
        );

        const pivotedRows = pivotIncomeStatements(incomeStatements);

        // const fiscalYears = incomeStatements.map((_, idx) => `FY${2021 + idx}`);

        // const dynamicHeaders = [
        //   { key: "metric", label: "Fiscal Year", align: "left" },
        //   ...fiscalYears.map((fy) => ({
        //     key: fy,
        //     label: fy,
        //     align: "right",
        //   })),
        // ];

        const headers = [
          { key: "metric", label: "Fiscal Year", align: "left" },
          ...fiscalYears.map((fy) => ({ key: fy, label: fy, align: "right" })),
        ];

        setPivotedRows(pivotedRows);
        setHeaders(headers);

        // const metrickeys = Array.from(
        //   new Set(incomeStatements.flatMap(obj => Object.keys(obj)))
        // ).filter(key => key !== "id");

        // const pivotRows = metrickeys.map(metric => [
        //   metric,
        //   ...incomeStatements.map(obj => obj[metric] ?? null)
        // ]);

        console.log("Financials data received:", incomeStatements);

        // setIncomeStatement(pivotRows ?? []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIncomeStatement([]);
      } finally {
        setIsLoading(false);
        // console.log('good financials: ', incomeStatement);
      }
    };

    fetchData();
  }, [id]);

  // const headers = [
  //   { key: "metric", label: "Fiscal Year", align: "left" },
  //   ...fiscalYears.map((fy) => ({ key: fy, label: fy, align: "right" })),
  // ];

  useEffect(() => {
    console.log("Updated pivotedRows:", pivotedRows);
  }, [pivotedRows]);

  return (
    // <div>here</div>

    <Table
      headers={headers}
      data={pivotedRows}
      rowKey={(r, idx) => r.id ?? `${r.FiscalYear}${idx}`}
      className="border-3 border-gray-200 "
    />
  );
};

export default Financials;
