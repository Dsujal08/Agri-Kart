import React, { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";

const FertilizerChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soilType, setSoilType] = useState("");
  const [crop, setCrop] = useState("");
  const [yieldTarget, setYieldTarget] = useState("");
  const [result, setResult] = useState(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const calculateFertilizer = () => {
    if (!soilType || !crop || !yieldTarget) {
      setResult("⚠️ Please fill in all fields.");
      return;
    }

    // Sample fertilizer recommendations based on crop type
    const fertilizerData = {
      "Wheat": { nitrogen: 2.5, phosphorus: 1.8, potassium: 1.2 },
      "Rice": { nitrogen: 3, phosphorus: 2, potassium: 1.5 },
      "Maize": { nitrogen: 2.8, phosphorus: 2.2, potassium: 1.7 },
      "Soybean": { nitrogen: 2, phosphorus: 1.6, potassium: 1.3 },
      "Cotton": { nitrogen: 3.2, phosphorus: 2.5, potassium: 1.9 },
    };

    const fertilizer = fertilizerData[crop] || { nitrogen: 2, phosphorus: 1.5, potassium: 1.2 };

    const nitrogen = (yieldTarget * fertilizer.nitrogen).toFixed(2);
    const phosphorus = (yieldTarget * fertilizer.phosphorus).toFixed(2);
    const potassium = (yieldTarget * fertilizer.potassium).toFixed(2);

    setResult(
      `🌱 Recommended Fertilizer for ${crop}:
      ✅ Nitrogen: ${nitrogen} kg/ha
      ✅ Phosphorus: ${phosphorus} kg/ha
      ✅ Potassium: ${potassium} kg/ha`
    );
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-500 transition-all duration-300"
        onClick={toggleChat}
      >
        <FiMessageSquare size={26} />
      </button>

      {/* Chatbot Pop-up */}
      <div
        className={`fixed bottom-20 right-6 w-80 bg-white p-5 rounded-xl shadow-2xl border border-gray-200 transform transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Fertilizer Assistant 🌿</h2>
          <button onClick={toggleChat} className="text-gray-500 hover:text-red-500 transition">
            <FiX size={22} />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="🌍 Enter Soil Type"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">🌾 Select Crop Type</option>
            <option value="Wheat">🌿 Wheat</option>
            <option value="Rice">🌱 Rice</option>
            <option value="Maize">🌽 Maize</option>
            <option value="Soybean">🌰 Soybean</option>
            <option value="Cotton">🌿 Cotton</option>
          </select>

          <input
            type="number"
            placeholder="📊 Enter Yield Target (kg/ha)"
            value={yieldTarget}
            onChange={(e) => setYieldTarget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Calculate Button */}
          <button
            className="bg-green-600 text-white p-2 w-full rounded-lg font-medium hover:bg-green-500 transition-all duration-300"
            onClick={calculateFertilizer}
          >
            Calculate Fertilizer 🚜
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-3 p-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-800">
            {result.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerChatbot;
