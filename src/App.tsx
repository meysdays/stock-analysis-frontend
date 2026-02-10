import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StockPage from "./pages/StockPage";
import Home from "./pages/Home";
import SP30 from "./pages/indicators/SP30";
import SP10 from "./pages/indicators/SP10";
import FearGreed from "./pages/indicators/FearGreed";
import NoOfStocks from "./pages/NoOfStocks";
import RSI from "./pages/technical/RSI";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:id" element={<StockPage />} />
        <Route path="/indicators/sp30" element={<SP30 />} />
        <Route path="/indicators/sp10" element={<SP10 />} />
        <Route path="/indicators/fear-greed" element={<FearGreed />} />
        <Route path="/indicators/no-of-stocks" element={<NoOfStocks />} />
        <Route path="/indicators/rsi" element={<RSI />} />

      </Routes>

    </Router>
  );
};

export default App;

