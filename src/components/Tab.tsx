import { useState } from "react";
import type { TabItem } from "../lib/definitions";

interface TabProps {
  tabProps: TabItem[];
}

const Tab = ({ tabProps }: TabProps) => {
  const [activeTab, setActiveTab] = useState<string>("");

  return (
    <header className="flex justify-between items-center mb-8 border-b-2 border-gray-200 px-4 ">
      {tabProps.map((tab) => (
        <a
          key={tab.label}
          href={tab.href}
          onClick={() => setActiveTab(tab.label)}
          className={`text-gray-600 hover:text-gray-800 text-2xl font-semibold transition-colors transition-all duration-300 ease-in-out ${activeTab === tab.label
            ? "border-b-3 px-4 py-2 border-orange-500"
            : ""
            }`}
        >
          {tab.label}
        </a>
      ))}
    </header>
  );
};

export default Tab;
