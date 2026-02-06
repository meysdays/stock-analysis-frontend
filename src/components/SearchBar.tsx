import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    return (

        <div className="flex items-center">
            <span className="px-4 -mr-12"><Search size={20} color="gray" /></span>
            <input type="text" placeholder="Search" className="w-full px-6 pl-10 py-2 bg-gray-200/50 rounded-lg focus:outline-none" />
        </div>
    );
};

export default SearchBar;