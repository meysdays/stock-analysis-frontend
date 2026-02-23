// import { useParams } from "react-router-dom";
import TabNavigator from "../components/Navigation/TabNavigator";
import type { ReactNode } from "react";

interface FinancialsDashboardLayoutProps {
  children: ReactNode;
  // sidebarData: StockApiData & { signal: string; score: number };
  tabs: { label: string; href: string }[];
}

const FinancialsDashboardLayout = ({ children, tabs }: FinancialsDashboardLayoutProps) => {
  //   const { id } = useParams();

  //   const tabs = [
  //     { label: "Income Statement", href: `/stock/${id}/summary` },
  //     { label: "Balance Sheet", href: `/stock/${id}/financials` },
  //     { label: "Cash Flow", href: `/stock/${id}/forecast` },
  //     { label: "Ratios", href: `/stock/${id}/statistics` },
  //     { label: "KPIs", href: `/stock/${id}/metrics` },
  //   ];

  return (
    <div className="text-secondary">
      <div className="mb-6 ">
        <TabNavigator className="border-0" tabs={tabs} />
      </div>
      {/* Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-8 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-8">
          Financials & Fundamentals View (Coming Soon)
          {children}
        </div>
      </main>
    </div>
  );
};

export default FinancialsDashboardLayout;
