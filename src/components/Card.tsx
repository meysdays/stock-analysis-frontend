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
      className={`bg-white rounded-3xl flex flex-col justify-between px-6 py-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 ${className}`}
    >
      <div className="mb-10">
        <div>
          {(title || action) && (
            <div className="flex items-center mb-6">
              {title && (
                <h3 className="text-slate-500 font-semibold text-xs uppercase tracking-wider">{title}</h3>
              )}
              {action && <div>{action}</div>}
            </div>
          )}
        </div>
        <div>
          {value && (
            <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
          )}
          {children}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between pt-4 border-t border-slate-50">
        <div>
          <p className="text-xs text-slate-400 font-medium">Total {title}</p>
        </div>
        <div className="flex items-center bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="text-emerald-600 font-bold text-xs">+2.25%</span>
          <TrendingUp className="w-3 h-3 ml-1 text-emerald-600" />
        </div>
      </div>
    </div>
  );
};

export default Card;
