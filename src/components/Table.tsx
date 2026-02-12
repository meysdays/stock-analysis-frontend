import React, { useState } from "react";

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
}

export default function Table<T extends Record<string, any>>({
  headers,
  data,
  rowKey,
}: TableProps<T>) {
  // const [toogleOrder, setToogleOrder] = React.useState<boolean>(false);

  // const ascOrder = (label:string) =>{
  //   const labelLowerCase = label.toLocaleLowerCase

  // }

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedData = [...data].sort((a, b) => {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
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
                className={`px-2 py-2 text-sm font-semibold border-b hover: cursor-pointer ${
                  h.align === "right"
                    ? "text-right"
                    : h.align === "center"
                      ? "text-center"
                      : "text-left"
                }`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={String(rowKey ? rowKey(row, idx) : (row.id ?? idx))}
              className="hover:bg-gray-100"
            >
              {headers.map((h) => (
                <td
                  key={h.key}
                  className={`px-2 py-2 text-sm ${
                    h.align === "right"
                      ? "text-right"
                      : h.align === "center"
                        ? "text-center"
                        : "text-left"
                  }`}
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
