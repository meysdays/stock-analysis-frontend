import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type TableHeader<T> = {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (item: T) => React.ReactNode;
};

interface TableProps<T> {
  headers: TableHeader<T>[];
  data: T[];
  rowKey?: (item: T, idx: number) => string | number;
  disableSorting?: boolean;
  className?: string;
}

export default function Table<T extends Record<string, any>>({
  headers,
  data,
  rowKey,
  disableSorting = false,
  className,
}: TableProps<T>) {
  // const [toogleOrder, setToogleOrder] = React.useState<boolean>(false);

  // const ascOrder = (label:string) =>{
  //   const labelLowerCase = label.toLocaleLowerCase

  // }

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = disableSorting
    ? data
    : [...data].sort((a, b) => {
      if (!sortKey) return 0;

      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });

  useEffect(() => {
    console.log(sortedData);
  }, [sortedData]);

  return (
    <div className="overflow-x-auto">
      <table className={twMerge("w-full border-collapse", className)}>
        <thead>
          <tr>
            {headers.map((h) => {
              const isSorted = sortKey === h.key;
              return (
                <th
                  key={h.key}
                  onClick={() => {
                    if (sortKey === h.key) {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortKey(h.key);
                      setSortOrder("asc");
                    }
                  }}
                  className={twMerge(`px-2 py-2 text-sm font-semibold hover:cursor-pointer text-caption ${h.align === "right"
                    ? "text-right"
                    : h.align === "center"
                      ? "text-center"
                      : "text-left"
                    }`)}
                >
                  <span className="flex items-center gap-1">
                    {h.label}
                    {isSorted && (
                      sortOrder === "asc" ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3L10 9H2L6 3Z" fill="currentColor"/></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 3H10L6 9Z" fill="currentColor"/></svg>
                      )
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={String(rowKey ? rowKey(row, idx) : (row.id ?? idx))}
              className="rounded-3xl hover:bg-background-2 transition"
            >
              {headers.map((h) => (
                <td
                  key={h.key}
                  className={twMerge(
                    `px-2 text-sm ${h.align === "right"
                      ? "text-right"
                      : h.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`, className
                  )}
                >
                  {h.render ? h.render(row) : (row[h.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
