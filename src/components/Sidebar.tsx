// import { LayoutDashboard } from "lucide-react";
import { type StockApiData } from "../api";
import SideBarCard from "./Card";

interface SidebarProps extends Omit<StockApiData, "date"> {
  signal: string;
  score: number;
}

const Sidebar = ({
  stock_name,
  volume,
  close,
  high,
  low,
  open,
  signal,
  score
}:SidebarProps ) => {
  const cleaned = stock_name.split("\\").pop();
  return (
    <div className="w-[20%] h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <h1 className="text-xl font-bold text-gray-800">
          Nigerian Stock Market
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {/* <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-orange-500 bg-orange-50 rounded-xl font-medium transition-colors"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a> */}

        <div>
          <p className=" text-[18px] font-bold">{cleaned}</p>
          <p>
            Daily Volume:{" "}
            <span className=" text-[18px] font-bold">{volume}</span>
          </p>
        </div>
        <SideBarCard title="Close" value={close} />
        <div className="flex gap-2">
          <SideBarCard title="High" value={high} />
          <SideBarCard title="Low" value={low} />
        </div>
        <SideBarCard title="Open" value={open} />
        <div className="flex gap-2">
          <SideBarCard title="Signal" value={signal} />
          <SideBarCard title="Score" value={score} />
        </div>
        <div className="flex gap-2">
          <SideBarCard title="Volume" value={volume} />
          <SideBarCard title="Volume" value={volume} />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
