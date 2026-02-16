import { type StockApiData } from "../../lib/definitions";
import SideCard from "../MarketTable/SideCard";

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
}: SidebarProps) => {
    return (
        <div className="w-[18%] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-slate-950 border-r border-slate-800 flex flex-col p-6">

            <nav className="flex-1 space-y-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Finqube</h2>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-slate-400 font-medium">Stock</p>
                    <p className="text-xl font-bold tracking-tight">{stock_name}</p>
                </div>

                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
                        <p className="text-xs text-slate-500 mb-1">Daily Volume</p>
                        <p className="text-xl font-mono font-semibold text-slate-200">{volume}</p>
                    </div>

                    <SideCard title="Close" value={close} />
                    <div className="grid grid-cols-2 gap-3">
                        <SideCard title="High" value={high} />
                        <SideCard title="Low" value={low} />
                    </div>
                    <SideCard title="Open" value={open} />
                    <div className="grid grid-cols-2 gap-3">
                        <SideCard title="Signal" value={signal} />
                        <SideCard title="Score" value={score} />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
