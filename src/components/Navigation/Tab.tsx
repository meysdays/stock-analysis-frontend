import { useLocation, Link } from "react-router-dom";
import type { TabItem } from "../../lib/definitions";

interface TabProps {
  tabProps: TabItem[];
}

const Tab = ({ tabProps }: TabProps) => {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center mb-8 border-b-2 border-gray-200 px-4 ">
      {tabProps.map((tab) => {

        const isActive = tab.href.startsWith("#")
          ? false
          : location.pathname === tab.href;

        return (
          <Link
            key={tab.label}
            to={tab.href}
            className={`text-gray-600 hover:text-gray-800 text-2xl font-semibold transition-colors transition-all duration-300 ease-in-out ${isActive
              ? "border-b-3 px-4 py-2 border-orange-500"
              : ""
              }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </header>
  );
};

export default Tab;
