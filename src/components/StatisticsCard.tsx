import type { StatisticsCardProps, Stat } from "../lib/definitions";

const StatItem: React.FC<Stat> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-black">{value}</p>
    </div>
);

const StatisticsCard: React.FC<StatisticsCardProps> = ({
    symbol,
    description,
    stats,
    sidebarTitle,
    sidebarText,
}) => {
    return (
        <div className="py-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-black mb-4">
                {symbol}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Info box */}
                    <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-300">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                        </div>
                        <p className="text-gray-700 text-sm">{description}</p>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <StatItem key={stat.label} {...stat} />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="bg-white p-6 rounded-lg border space-y-4 border-gray-300 ">
                    <h2 className="text-lg font-semibold text-black">
                        {sidebarTitle}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {sidebarText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;