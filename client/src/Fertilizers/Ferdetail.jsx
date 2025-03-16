import React from "react";
import { useNavigate } from "react-router-dom";

const Ferdetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-6 relative">
      {/* Back Button (Top Left) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        ⬅ Back
      </button>

      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg shadow-lg rounded-lg p-8">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-green-800 text-center mb-6">
          Fertilizers Overview 🌱
        </h2>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed text-lg text-center">
          Fertilizers enhance soil quality and promote plant growth by providing essential nutrients. They come in various types, including organic and inorganic, each with specific applications and benefits.
        </p>

        {/* Section: What are Fertilizers? */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-green-700 mb-3">What are Fertilizers?</h3>
          <p className="text-gray-700">
            Fertilizers are substances added to the soil to improve its fertility and promote plant growth. They supply essential nutrients for healthy development and increased yields. Fertilizers can be broadly categorized as <span className="font-semibold text-green-800">organic</span> and <span className="font-semibold text-green-800">inorganic</span>.
          </p>
        </div>

        {/* Types of Fertilizers */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-green-700 mb-3">Types of Fertilizers</h3>

          {/* Organic Fertilizers */}
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-600 rounded-md">
            <h4 className="text-xl font-semibold text-green-700">🌿 Organic Fertilizers</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Made from natural materials like compost, manure, and plant residues.</li>
              <li>Improve soil structure and water-holding capacity.</li>
              <li>Release nutrients slowly for long-term soil health.</li>
              <li>Examples: Compost, bone meal, seaweed, and manure.</li>
            </ul>
          </div>

          {/* Inorganic Fertilizers */}
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-md">
            <h4 className="text-xl font-semibold text-blue-700">🧪 Inorganic Fertilizers</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Synthetically produced and contain concentrated nutrients.</li>
              <li>Provide readily available nutrients for faster plant growth.</li>
              <li>Examples: Nitrogen (N), Phosphorus (P), and Potassium (K) fertilizers.</li>
            </ul>
          </div>

          {/* Other Types */}
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-600 rounded-md">
            <h4 className="text-xl font-semibold text-yellow-700">🌎 Other Types</h4>
            <ul className="list-disc list-inside text-gray-700">
              <li>Potassic Fertilizers: Supply potassium for plant growth.</li>
              <li>Amide Fertilizers: Provide nitrogen for crops.</li>
              <li>Foliar Fertilizers: Applied directly to leaves for quick absorption.</li>
              <li>Fertigation: Delivered through irrigation systems.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">"Sustainable fertilization ensures a greener future!" 🌿🌍</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/seedsDetails')} // Navigate back in history
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            ⬅ Back
          </button>

          <button
            onClick={() => navigate("/next-page")} // Update this to the actual next page
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ferdetail;
