import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StockDashboard from "./pages/dashboard/StockDashboard";
import MarketDashboard from "./pages/dashboard/MarketDashboard";
import Summary from "./pages/dashboard/stock/Summary";
import Technical from "./pages/dashboard/stock/Technical";
import Financials from "./pages/dashboard/stock/Financials";
import Risk from "./pages/dashboard/stock/Risk";
import Sentiments from "./pages/dashboard/stock/Sentiments";

// Import existing indicator pages
import SP30 from "./pages/indicators/SP30";
import SP10 from "./pages/indicators/SP10";
import FearGreed from "./pages/indicators/FearGreed";
import NoOfStocks from "./pages/NoOfStocks";
import RSI from "./pages/technical/RSI";
import MACD from "./pages/technical/MACD";
import FinancialsDashboard from "./pages/dashboard/FinancialsDashboard";
// import IncomeStatement from "./pages/dashboard/financials/incomestatement";
// import NavBar from "./components/Navigation/NavBar";
import MainLayout from "./components/Layout/mainlayout";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <NavBar/> */}
        {/* Redirect root to market dashboard or stock dashboard depending on preference, 
            for now let's redirect to market overview (which we might need to create a default view for) 
            or just keep Home if it exists, but we are removing NavBar so Home might look weird.
            Let's redirect to market/overview or a default stock for demo.
        */}
        <Route element={<MainLayout/>}>

        <Route path="/" element={<Home/>} />

        {/* Stock Dashboard Routes */}
        <Route path="/stock/:id" element={<StockDashboard />}>
          <Route index element={<Navigate to="summary" replace />} />
          <Route path="summary" element={<Summary />} />
          <Route path="financials" element={<Financials />} />
          {/* <Route path="income-statement" element={<IncomeStatement />} /> */}
          <Route path="technical" element={<Technical />} />
          <Route path="/stock/:id/financials" element={<FinancialsDashboard />} />
          <Route path="risk" element={<Risk />} />
          <Route path="sentiments" element={<Sentiments />} />
        </Route>

        {/* Market Dashboard Routes */}
        <Route element={<MarketDashboard />}>
          <Route path="/indicators/sp30" element={<SP30 />} />
          <Route path="/indicators/sp10" element={<SP10 />} />
          <Route path="/indicators/fear-greed" element={<FearGreed />} />
          <Route path="/indicators/no-of-stocks" element={<NoOfStocks />} />
          <Route path="/technical/rsi" element={<RSI />} />
          <Route path="/technical/macd" element={<MACD />} />
          <Route path="/market/overview" element={<div className="p-8 text-slate-400">Market Overview Coming Soon</div>} />
        </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default App;

