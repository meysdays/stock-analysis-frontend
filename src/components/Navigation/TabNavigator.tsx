import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface TabItem {
  label: string;
  id?: string;
  href: string;
  children?: TabItem[];
}

interface TabNavigatorProps {
  tabs: TabItem[];
  className?: string;
}

const TabNavigator = ({ tabs, className }: TabNavigatorProps) => {
    const [sec, setSec] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sectionId = e.target.value;
    setSec(sectionId);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
    console.log('here is the id: ',sectionId);
    
  };
//   const location = useLocation();

  // Find the active main tab to check for children
//   const activeMainTab = tabs.find(
//     (tab) =>
//       location.pathname === tab.href ||
//       (tab.href !== "/" && location.pathname.startsWith(tab.href)),
//   );

  return (
    <div className={`w-full ${className || ""}`}>
      {/* Main Tabs */}
      <div className="w-full border-b-[3px] border-[#1a5b81]">
        <div className="flex w-full overflow-x-auto custom-scrollbar-hidden whitespace-nowrap">
          {tabs.map((tab) => {
            const isActive =
                sec === tab.id;
            //   location.pathname === tab.href ||
            //   (tab.href !== "/" && location.pathname.startsWith(tab.href));

            return (
              <a
                key={tab.id}
                onClick={() => handleChange({ target: { value: tab.id || "" } } as React.ChangeEvent<HTMLSelectElement>)}
                // to={tab.href}
                className={`relative px-10 py-3.5 text-sm transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#efefef] text-black font-semibold"
                    : "text-[#0073e6] hover:bg-gray-50 font-regular"
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Sub Tabs (Only visible if the active main tab has children) */}
      {/* {activeMainTab?.children && (
                <div className="flex w-full mt-4 overflow-x-auto custom-scrollbar-hidden whitespace-nowrap">
                    {activeMainTab.children.map((subTab) => {
                        const isSubActive = location.pathname === subTab.href;

                        return (
                            <Link
                                key={subTab.href}
                                to={subTab.href}
                                className={`px-10 py-3.5 text-sm transition-colors duration-200 ${isSubActive
                                    ? "bg-[#efefef] text-black font-semibold"
                                    : "text-[#0073e6] hover:bg-gray-50 font-regular"
                                    }`}
                            >
                                {subTab.label}
                            </Link>
                        );
                    })}
                </div>
            )} */}
    </div>
  );
};

export default TabNavigator;
