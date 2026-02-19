// import { type StockApiData } from "../../lib/definitions";
// import SideCard from "../MarketTable/SideCard";

import { navItems } from "../../utils/utils";
import NavItem from "./NavItem";
import { useState } from "react";

interface SidebarProps {
  stock_name?: string;
  volume?: string;
  close?: string;
  high?: string;
  low?: string;
  open?: string;
  signal?: string;
  score?: number;
  className?: string;
}

// const Sidebar = ({
//     stock_name,
//     volume,
//     close,
//     high,
//     low,
//     open,
//     signal,
//     score
// }: SidebarProps) => {
//     return (
//         <div className="w-[16%] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-white border-r border-gray-100 flex flex-col p-6">

//             <nav className="flex-1 space-y-2">
//                 {/* <a
//           href="#"
//           className="flex items-center gap-3 px-4 py-3 text-orange-500 bg-orange-50 rounded-xl font-medium transition-colors"
//         >
//           <LayoutDashboard size={20} />
//           <span>Dashboard</span>
//         </a> */}

//                 <div>
//                     <p className=" text-[18px] font-bold">{stock_name}</p>
//                     <p>
//                         Daily Volume:{" "}
//                         <span className=" text-[18px] font-bold">{volume}</span>
//                     </p>
//                 </div>
//                 <SideCard title="Close" value={close} />
//                 <div className="flex gap-2">
//                     <SideCard title="High" value={high} />
//                     <SideCard title="Low" value={low} />
//                 </div>
//                 <SideCard title="Open" value={open} />
//                 <div className="flex gap-2">
//                     <SideCard title="Signal" value={signal} />
//                     <SideCard title="Score" value={score} />
//                 </div>
//                 <div className="flex gap-2">
//                     <SideCard title="Volume" value={volume} />
//                     <SideCard title="Volume" value={volume} />
//                 </div>
//             </nav>
//         </div>
//     );
// };

const Sidebar = ({ stock_name, volume, className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen border-r-2 fixed border-[#dde5f0] p-4 transition-all duration-300 bg-white
        ${collapsed ? "w-20" : "w-64"} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h2 className="text-xl font-bold text-black truncate">{stock_name || "StockPred"}</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-400  ${collapsed && "mx-auto"} hover:text-slate-600 cursor-pointer`}
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {!collapsed && stock_name && (
        <div className="mt-auto pt-8 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Stock</p>
            <p className="text-sm font-bold text-slate-900 truncate">{stock_name}</p>
            <div className="mt-2 text-xs text-slate-600">
              Vol: <span className="font-bold">{volume}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
