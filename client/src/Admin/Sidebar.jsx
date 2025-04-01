import { useState } from "react";
import { Home, Package, Users, Settings, Menu } from "lucide-react";

const Sidebar = ({ setActive }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${isOpen ? "w-64 p-5" : "w-20 p-2"}`}>
      {/* Toggle Button */}
      <button className="mb-6 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="text-white w-6 h-6" />
      </button>

      {/* Sidebar Content */}
      <h1 className={`text-xl font-bold mb-6 transition-all duration-300 ${!isOpen && "hidden"}`}>
        AgriKart Admin
      </h1>
      
      <nav>
        <ul>
          <SidebarItem isOpen={isOpen} icon={Home} label="Dashboard" onClick={() => setActive("dashboard")} />
          <SidebarItem isOpen={isOpen} icon={Package} label="Orders" onClick={() => setActive("orders")} />
          <SidebarItem isOpen={isOpen} icon={Users} label="Users" onClick={() => setActive("users")} />
          <SidebarItem isOpen={isOpen} icon={Settings} label="Settings" onClick={() => setActive("settings")} />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, onClick, isOpen }) => {
  return (
    <li
      className="mb-4 flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded transition-all"
      onClick={onClick}
    >
      <Icon className="inline w-6 h-6" />
      {isOpen && <span className="ml-3">{label}</span>}
    </li>
  );
};

export default Sidebar;
