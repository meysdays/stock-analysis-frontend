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
      className={`bg-surface-1 rounded-3xl flex flex-col justify-between px-6 py-5 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="mb-10">
        <div>
          {(title || action) && (
            <div className="flex items-center mb-6">
              {title && (
                <h3 className="text-caption font-semibold text-xs uppercase tracking-wider">{title}</h3>
              )}
              {action && <div>{action}</div>}
            </div>
          )}
        </div>
        <div>
          {value && (
            <div className="text-3xl font-bold text-primary mb-2">{value}</div>
          )}
          {children}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-caption font-medium">Total {title}</p>
        </div>
        <div className="flex items-center bg-positive-bg px-2.5 py-1 rounded-full">
          <span className="text-positive font-bold text-xs">+2.25%</span>
          <TrendingUp className="w-3 h-3 ml-1 text-positive" />
        </div>
      </div>
    </div>
  );
};

export default Card;
