import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import icon
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Settings from "./Settings";

const AdminPanel = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  // Define available pages
  const pages = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    users: <Users />,
    settings: <Settings />,
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Sidebar */}
      <Sidebar setActive={setActive} activePage={active} />

      {/* Main Content */}
      <main className="flex-1 p-6 transition-opacity duration-300 ease-in-out relative">
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Render Active Page */}
        <div className="mt-12">{pages[active] || <Dashboard />}</div>
      </main>
    </div>
  );
};

export default AdminPanel;
