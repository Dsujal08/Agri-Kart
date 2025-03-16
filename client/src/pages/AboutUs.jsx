import React from "react";
import Navbar from "../components/NavBar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-green-700 mb-4">About AgriKart 🌱</h1>
        <p className="text-lg text-gray-700 text-center max-w-3xl">
          AgriKart is a revolutionary e-commerce platform designed to <strong>empower farmers</strong> by
          providing easy access to <strong>agricultural products, second-hand machinery, and the latest farming schemes</strong>.
        </p>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {features.map(({ title, description, icon }) => (
            <div key={title} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
              <span className="text-green-600 text-5xl" aria-label={title}>{icon}</span>
              <h3 className="text-xl font-semibold text-green-800 mt-2">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>🌾 AgriKart – Bringing Innovation to Agriculture 🚜</p>
        </div>
      </div>
    </>
  );
};

const features = [
  { title: "Farmer-Friendly Marketplace", description: "Buy and sell farming essentials effortlessly.", icon: "🛒" },
  { title: "Second-Hand Machinery", description: "Sell & purchase used tractors and equipment.", icon: "🚜" },
  { title: "Fertilizer Converter", description: "Calculate the right amount of fertilizer for your farm.", icon: "🌱" },
  { title: "Government Schemes", description: "Stay updated on the latest agricultural policies.", icon: "📜" },
  { title: "24/7 Support", description: "Get instant assistance anytime, anywhere.", icon: "💬" },
  { title: "Mobile Verification", description: "Secure & quick registration using mobile OTP.", icon: "📲" },
];

export default AboutUs;
