import type { IncomeStatement } from "../lib/definitions";

// const fiscalYears = ["FY2021", "FY2022", "FY2023", "FY2024", "FY2025"];

/**
 * Pivot an array of IncomeStatement objects into rows for the table.
 * Each metric becomes a row; each FY becomes a column.
 */

export function pivotIncomeStatements(incomeStatements: IncomeStatement[]) {
  const EXCLUDED_KEYS = ["id", "stock_id", "period_type"];

  function formatLabel(key: string) {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function normalizeValue(value: unknown): string | number {
  // Null or undefined
  if (value === null || value === undefined) return "N/A";

  // Empty string
  if (typeof value === "string" && value.trim() === "") return "N/A";

  // Empty object
  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value as object).length === 0
  ) {
    return "N/A";
  }

  return value as string | number;
}

function extractYear(periodEnding: string | null | undefined): string {
  if (!periodEnding) return "Unknown";

  const date = new Date(periodEnding);
  return `FY${date.getFullYear()}`;
}


  if (!incomeStatements.length) return [];

  const allKeys = Object.keys(incomeStatements[0]);

  const metricKeys = allKeys.filter(
    (key) => !EXCLUDED_KEYS.includes(key)
  );

  const pivotedRows = metricKeys.map((metric) => {
    const row: Record<string, string | number | null> = {
      metric: formatLabel(metric),
    };

     incomeStatements.forEach((statement) => {
      const fy = extractYear(statement.period_ending as string);
      row[fy] = normalizeValue(statement[metric]);
    });

    return row;

  // Step 2: Add period_ending as first metric
//   const allMetrics = ["period_ending", ...metricKeys];

  // Step 3: Build rows dynamically
//   const pivotedRows = allMetrics.map((metric) => {
//     const row: Record<string, string | number | null> = {
//       metric: metric === "period_ending" ? "Period Ending" : metric,
//     };

//     incomeStatements.forEach((statement, idx) => {
//       const fy = fiscalYears[idx]; // assumes order matches
//       row[fy] = statement[metric] ?? null;
//     });

    // return row;
  });

  return pivotedRows;
}
