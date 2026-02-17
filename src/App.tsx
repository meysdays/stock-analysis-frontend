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
import StatisticsMain from "./pages/dashboard/stock/StatisticsMain";
import MarketCap from "./pages/dashboard/stock/MarketCap";
import Revenue from "./pages/dashboard/stock/Revenue";
import Dividends from "./pages/dashboard/stock/Dividends";
import Profile from "./pages/dashboard/stock/Profile";
import Home from "./pages/Home";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to market dashboard or stock dashboard depending on preference, 
            for now let's redirect to market overview (which we might need to create a default view for) 
            or just keep Home if it exists, but we are removing NavBar so Home might look weird.
            Let's redirect to market/overview or a default stock for demo.
        */}
        <Route path="/" element={<Navigate to="/home" replace />} />


        {/* Stock Dashboard Routes */}
        <Route path="/stock/:id" element={<StockDashboard />}>
          <Route index element={<Navigate to="summary" replace />} />
          <Route path="summary" element={<Summary />} />
          <Route path="technical" element={<Technical />} />
          <Route path="financials" element={<Financials />} />
          <Route path="statistics" element={<StatisticsMain />} />
          <Route path="statistics/market-cap" element={<MarketCap />} />
          <Route path="statistics/revenue" element={<Revenue />} />
          <Route path="dividends" element={<Dividends />} />
          <Route path="profile" element={<Profile />} />
          <Route path="risk" element={<Risk />} />
          <Route path="sentiments" element={<Sentiments />} />
        </Route>

        {/* Market Dashboard Routes */}
        <Route element={<MarketDashboard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/indicators/sp30" element={<SP30 />} />
          <Route path="/indicators/sp10" element={<SP10 />} />
          <Route path="/indicators/fear-greed" element={<FearGreed />} />
          <Route path="/indicators/no-of-stocks" element={<NoOfStocks />} />
          <Route path="/technical/rsi" element={<RSI />} />
          <Route path="/technical/macd" element={<MACD />} />
          <Route path="/market/overview" element={<Navigate to="/home" replace />} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;

