import { Outlet } from "react-router-dom";
import MarketDashboardLayout from "../../layouts/MarketDashboardLayout";

const MarketDashboard = () => {
    const tabs = [
        { label: "Market Overview", href: "/home" },
        { label: "SP30 Index", href: "/indicators/sp30" },
        { label: "SP10 Index", href: "/indicators/sp10" },
        { label: "Fear & Greed", href: "/indicators/fear-greed" },
        { label: "No. of Stocks", href: "/indicators/no-of-stocks" },
        { label: "RSI", href: "/technical/rsi" },
        { label: "MACD", href: "/technical/macd" },
    ];

    return (
        <MarketDashboardLayout tabs={tabs}>
            <Outlet />
        </MarketDashboardLayout>
    );
};

export default MarketDashboard;
