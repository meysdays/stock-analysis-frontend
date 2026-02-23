import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import TabNavigator from "../components/Navigation/TabNavigator";

interface MarketDashboardLayoutProps {
    children: ReactNode;
    tabs: { label: string; href: string }[];
}

const MarketDashboardLayout = ({ children, tabs }: MarketDashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-background-1 text-primary flex font-sans selection:bg-blue-400/20">
            {/* Sidebar */}
            {/* Sidebar implementation details... */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 border-b border-gray-100 flex items-center justify-between px-10 shrink-0 bg-surface-1/80 backdrop-blur-xs z-10 sticky top-0">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-semibold tracking-wide text-link">StockPred</Link>
                        <div className="relative hidden md:block flex items-center">
                            <span className="material-symbols-outlined absolute left-3 top-[50%] -translate-y-[50%] text-[18px] opacity-50 text-secondary">search</span>
                            <input
                                placeholder="Search here"
                                className="pl-10 pr-4 py-2 bg-background-2 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-link/30 text-xs w-64 text-primary placeholder:text-caption"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-secondary">
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">light_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] opacity-60 hover:opacity-100 cursor-pointer transition-opacity">notifications</span>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 custom-scrollbar">
                    <div className="mx-auto space-y-8">
                        <div className="mb-6">
                            <TabNavigator tabs={tabs} />
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MarketDashboardLayout;
