import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SP30 from "./pages/indicators/SP30";
import SP10 from "./pages/indicators/SP10";
import FearGreed from "./pages/indicators/FearGreed";

const App = () => {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/indicators/sp30" element={<SP30 />} />
        <Route path="/indicators/sp10" element={<SP10 />} />
        <Route path="/indicators/fear-greed" element={<FearGreed />} />

      </Routes>

    </Router>
  );
};

export default App;

