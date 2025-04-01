import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "AgriKart",
    theme: "light",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Site Name</label>
          <input 
            type="text" 
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Theme</label>
          <select 
            name="theme" 
            value={settings.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <input 
            type="checkbox" 
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Enable Notifications</label>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
