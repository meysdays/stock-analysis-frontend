import React from "react";

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
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h.key}
                className={`px-2 py-2 text-sm font-semibold border-b ${
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
          {data.map((row, idx) => (
            <tr
              key={String(rowKey ? rowKey(row, idx) : row.id ?? idx)}
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
