import { LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0">
            <div className="flex items-center gap-2 mb-10 px-2">

                <h1 className="text-xl font-bold text-gray-800">Nigerian Stock Market</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-orange-500 bg-orange-50 rounded-xl font-medium transition-colors">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </a>

            </nav>

        </div>
    );
};

export default Sidebar;
