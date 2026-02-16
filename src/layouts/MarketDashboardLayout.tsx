import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Sun, Moon } from "lucide-react";
import TabNavigator from "../components/Navigation/TabNavigator";

interface MarketDashboardLayoutProps {
    children: ReactNode;
    tabs: { label: string; href: string }[];
}

const MarketDashboardLayout = ({ children, tabs }: MarketDashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-[#fdfdfd] text-slate-900 flex font-sans selection:bg-indigo-100">
            {/* Sidebar */}
            {/* Sidebar implementation details... */}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-20 border-b border-gray-200 flex items-center justify-between px-10 shrink-0 bg-white/80 backdrop-blur-xs z-10 sticky top-0">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-semibold tracking-wide text-indigo-600">StockPred</Link>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-3 w-4 h-4 opacity-50 text-slate-400" />
                            <input
                                placeholder="Search here"
                                className="pl-10 pr-4 py-2 bg-gray-100 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs w-64 text-slate-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Sun className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600" />
                        <Moon className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600" />
                        <Bell className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity text-slate-600" />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 custom-scrollbar">
                    <div className="max-w-[1600px] mx-auto space-y-8">
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
