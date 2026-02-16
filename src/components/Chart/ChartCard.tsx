import type { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    className?: string;
    actions?: ReactNode;
    children: ReactNode;
}

const ChartCard = ({
    title,
    children,
    className = "",
    actions,
}: ChartCardProps) => {
    return (
        <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-900 font-bold text-lg">{title}</h3>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;