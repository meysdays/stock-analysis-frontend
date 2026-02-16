import { dashboardLinks } from "../../utils/utils";
import { useLocation, Link } from "react-router-dom";

const SidePanel = ({ name }: { name: string }) => {
    const location = useLocation();
    const activePath = location.pathname + location.hash;
    const sections = dashboardLinks[name] || [];

    return (
        <aside className="w-56 h-full bg-white border-r border-gray-100 flex flex-col py-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sticky top-0">
            <div className="px-4 space-y-10">
                {sections.map((section) => (
                    <div key={section.title} className="group/section">
                        <div className="flex items-center gap-3 text-gray-400 mb-4 px-1 hover:text-gray-600 transition-colors cursor-default">
                            <section.icon className="w-5 h-5" />
                            <h3 className="font-bold text-xs uppercase tracking-wider">{section.title}</h3>
                        </div>

                        <div className="relative ml-2 pl-4 border-l-2 border-gray-50 space-y-2 group-hover/section:border-gray-100 transition-colors">
                            {section.links.map((link) => {
                                const isActive = activePath === link.href;
                                return (
                                    <Link
                                        key={link.label}
                                        to={link.href}
                                        className={`block px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all ${isActive
                                            ? "bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-100"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidePanel;