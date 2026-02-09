import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  action?: ReactNode;
}

const Card = ({ children, title, className = "", action }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-gray-900 font-bold text-base">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
