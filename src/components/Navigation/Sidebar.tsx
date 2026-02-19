// import { type StockApiData } from "../../lib/definitions";
// import SideCard from "../MarketTable/SideCard";

import { navItems } from "../../utils/utils";
import NavItem from "./NavItem";
import { useState } from "react";
import { Menu } from "lucide-react";

// interface SidebarProps extends Omit<StockApiData, "date"> {
//     signal: string;
//     score: number;
// }

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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen border-r-2 fixed border-[#dde5f0] p-4 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h1 className="text-xl font-bold text-black">StockPred</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-400  ${collapsed && "mx-auto"} hover:text-white cursor-pointer`}
        >
          <Menu size={22} />
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
    </aside>
  );
};

export default Sidebar;
