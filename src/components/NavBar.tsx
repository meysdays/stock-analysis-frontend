import { useState } from "react";
import SearchBar from "./SearchBar";
import { dashboardLinks } from "../utils/utils"
import { navLinks } from "../utils/utils";


const NavBar = () => {
    const [dropDown, setDropDown] = useState<string>("");
    return (
        <div className="h-20 w-screen bg-white border-b border-gray-100 flex items-center px-6 relative z-50">
            <div className="flex items-center gap-12 w-full max-w-7xl mx-auto">

                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                    StockPred
                </h1>

                <nav className="flex-1">
                    <ul className="flex gap-8 items-center">
                        {
                            navLinks.map((link) => (
                                <li
                                    className="h-20 flex items-center gap-1 text-gray-600 font-medium hover:text-orange-600 transition-colors cursor-pointer group"
                                    key={link.label}
                                    onMouseEnter={() => setDropDown(link.label)}
                                    onMouseLeave={() => setDropDown("")}
                                >
                                    <span className="relative">
                                        {link.label}
                                        {dropDown === link.label && (
                                            <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-orange-500 animate-fade-in" />
                                        )}
                                    </span>

                                    {
                                        dropDown === link.label && (
                                            <div className="absolute top-full left-0 w-screen bg-white border-t border-gray-100 shadow-xl py-8">
                                                <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-12">
                                                    {
                                                        dashboardLinks[link.label].map((section) => (
                                                            <div key={section.title} className="flex flex-col gap-4">
                                                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                                    {section.title}
                                                                </h3>
                                                                <ul className="space-y-2">
                                                                    {
                                                                        section.links.map((link) => (
                                                                            <li key={link.label}>
                                                                                <a
                                                                                    href={link.href}
                                                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all group/item"
                                                                                >
                                                                                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover/item:scale-105 ${link.iconClass}`}>
                                                                                        <link.icon className="w-5 h-5" />
                                                                                    </span>
                                                                                    <div>
                                                                                        <p className="font-medium text-gray-900 group-hover/item:text-orange-600 transition-colors">
                                                                                            {link.label}
                                                                                        </p>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <nav className="flex items-center gap-4">
                    <a href="#" className="px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors">
                        Watchlist
                    </a>
                    <SearchBar />
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
