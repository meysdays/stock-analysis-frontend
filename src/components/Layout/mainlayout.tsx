import NavBar from "../Navigation/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
