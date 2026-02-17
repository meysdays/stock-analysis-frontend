import { Link, useLocation } from "react-router-dom";
import type { TabItem } from "../../lib/definitions";

interface TabNavigatorProps {
    tabs: TabItem[];
}

const TabNavigator = ({ tabs }: TabNavigatorProps) => {
    const location = useLocation();

    // Find the active main tab
    const activeMainTab = tabs.find(tab =>
        location.pathname === tab.href || (tab.href !== "/" && location.pathname.startsWith(tab.href))
    );

    return (
        <div className="w-full">
            {/* Main Tabs */}
            <div className="w-full border-b-[3px] border-[#1a5b81]">
                <div className="flex w-full overflow-x-auto custom-scrollbar-hidden whitespace-nowrap">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.href || (tab.href !== "/" && location.pathname.startsWith(tab.href));

                        return (
                            <Link
                                key={tab.href}
                                to={tab.href}
                                className={`relative px-10 py-3.5 text-sm transition-colors duration-200 ${isActive
                                    ? "bg-[#efefef] text-black font-bold"
                                    : "text-[#0073e6] hover:bg-gray-50 font-semibold"
                                    }`}
                            >
                                <span className="relative z-10">{tab.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Sub Tabs (Only visible if the active main tab has children) */}
            {activeMainTab?.children && (
                <div className="flex w-full mt-4 overflow-x-auto custom-scrollbar-hidden whitespace-nowrap">
                    {activeMainTab.children.map((subTab) => {
                        const isSubActive = location.pathname === subTab.href;

                        return (
                            <Link
                                key={subTab.href}
                                to={subTab.href}
                                className={`px-10 py-3.5 text-sm transition-colors duration-200 ${isSubActive
                                    ? "bg-[#efefef] text-black font-bold"
                                    : "text-[#0073e6] hover:bg-gray-50 font-semibold"
                                    }`}
                            >
                                {subTab.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TabNavigator;