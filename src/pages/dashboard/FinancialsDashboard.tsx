import { Outlet, useParams } from "react-router-dom";
import FinancialsDashboardLayout from "../../layouts/FinancialsDashboardLayout";

const FinancialsDashboard = () => {
  const { id } = useParams();

  const tabs = [
    { label: "Income Statement", href: `/financials/${id}/income-statement` },
    { label: "Balance Sheet", href: `/stock/${id}/balance-sheet` },
    { label: "Cash Flow", href: `/stock/${id}/cash-flow` },
    { label: "Ratios", href: `/stock/${id}/ratios` },
    { label: "KPIs", href: `/stock/${id}/kpis` },
  ];

  return (
    <FinancialsDashboardLayout tabs={tabs}>
      <Outlet/>
    </FinancialsDashboardLayout>
  );
};

export default FinancialsDashboard;
