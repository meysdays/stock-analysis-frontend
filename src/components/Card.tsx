// import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

import type { CardProps } from "../lib/definitions";

const Card = ({
  children,
  title,
  value,
  className = "",
  action
}: CardProps) => {
  return (
    <div
      className={`bg-white rounded-4xl flex flex-col justify-between px-6 py-4 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="mb-14">
        <div>
          {(title || action) && (
            <div className="flex items-center">
              {title && (
                <h3 className="text-gray-900 font-medium text-sm">{title}</h3>
              )}
              {action && <div>{action}</div>}
            </div>
          )}
        </div>
        <div>
          {value && (
            <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
          )}
          {children}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div>
          <p>Total {title}</p>
        </div>
        <div className="flex items-center bg-green-200 px-2 py-1 rounded-2xl">
          <span className="text-green-600 font-medium">+2.25%</span>
          <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
        </div>
      </div>
    </div>
  );
};

export default Card;
