import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SP20 from "./pages/indicators/SP20";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/indicators/sp20" element={<SP20 />} />

      </Routes>
    </Router>
  );
};

export default App;

