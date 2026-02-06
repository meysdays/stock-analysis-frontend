import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    description: string;
    trend?: 'up' | 'down';
    percentage?: string;
}

const StatsCard = ({ title, value, description, trend, percentage }: StatsCardProps) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-[200px]">
            <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">{value}</span>
                {percentage && (
                    <span className={`flex items-center text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {percentage}
                        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </span>
                )}
            </div>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
};

export default StatsCard;
