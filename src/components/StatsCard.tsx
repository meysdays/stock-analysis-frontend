interface StatsCardProps {
    title: string;
    value: string;
    description: string;
    trend?: 'up' | 'down';
    percentage?: string;
}

const StatsCard = ({ title, value, description, trend, percentage }: StatsCardProps) => {
    return (
        <div className="bg-surface-1 p-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-[200px]">
            <h3 className="text-primary font-bold text-lg mb-2">{title}</h3>
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">{value}</span>
                {percentage && (
                    <span className={`flex items-center text-sm font-semibold ${trend === 'up' ? 'text-positive' : 'text-negative'}`}>
                        {percentage}
                        <span className="material-symbols-outlined text-[16px]">
                            {trend === 'up' ? 'north_east' : 'south_east'}
                        </span>
                    </span>
                )}
            </div>
            <p className="text-caption text-sm">{description}</p>
        </div>
    );
};

export default StatsCard;
