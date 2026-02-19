// components/navigation/NavItem.tsx

import { NavLink } from "react-router-dom";
import { type NavItemType } from "../../lib/definitions";

interface Props {
  item: NavItemType;
  collapsed: boolean;
}

const NavItem = ({ item, collapsed }: Props) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
        ${isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {typeof item.icon === "string" ? (
        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
      ) : (
        <Icon size={20} />
      )}

      {!collapsed && (
        <span className="text-sm font-medium">
          {item.name}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;