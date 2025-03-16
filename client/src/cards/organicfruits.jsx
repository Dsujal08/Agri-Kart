import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowLeft, FaArrowRight, FaShoppingBasket } from "react-icons/fa";

const OrganicFruits = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-8 bg-gradient-to-br from-green-300 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl shadow-2xl border border-green-400 dark:border-green-700 
      backdrop-blur-lg transition-all duration-300 ease-in-out hover:shadow-green-400/50 dark:hover:shadow-green-500/30 max-w-2xl mx-auto">
      
      {/* Title Section */}
      <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
        🍏 Organic Fruits
      </h2>

      {/* Introductory Paragraph */}
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Organic fruits are cultivated without synthetic pesticides, fertilizers, or genetically modified organisms (GMOs), 
        promoting sustainable and eco-friendly farming practices.
      </p>

      {/* Key Characteristics Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
          ✅ Key Characteristics:
        </h3>
        <ul className="list-disc pl-6 space-y-3 text-gray-800 dark:text-gray-300">
          <li><strong>No Synthetic Inputs:</strong> Free from harmful pesticides and fertilizers.</li>
          <li><strong>Natural Pest Control:</strong> Uses crop rotation, companion planting, and beneficial insects.</li>
          <li><strong>Soil Health:</strong> Enhances fertility through composting and cover cropping.</li>
          <li><strong>No GMOs:</strong> Grown naturally without genetic modifications.</li>
          <li><strong>Certified Organic:</strong> Verified by agencies like USDA and EcoCert.</li>
          <li><strong>Eco-Friendly:</strong> Reduces pollution, conserves water, and supports biodiversity.</li>
        </ul>
      </div>

      {/* Benefits Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
          🌱 Benefits of Eating Organic:
        </h3>
        <ul className="list-disc pl-6 space-y-3 text-gray-800 dark:text-gray-300">
          <li><strong>Reduced Pesticide Exposure:</strong> Safer for you and your family.</li>
          <li><strong>Higher Nutritional Value:</strong> Studies suggest richer vitamins and minerals.</li>
          <li><strong>Supports Sustainable Farming:</strong> Helps preserve the environment.</li>
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-8 flex justify-center">
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 128, 0, 0.3)" }}
          className="relative px-8 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 text-white text-lg font-semibold rounded-full 
          shadow-md transition-all duration-300 ease-in-out transform flex items-center gap-2">
          <FaShoppingBasket className="text-xl" /> 🍃 Explore Organic Products
        </motion.button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={() => navigate('/')} // Navigate back in history
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          <FaArrowLeft className="text-lg"/> Back
        </motion.button>

        <motion.button
          onClick={() => navigate("/FerDetails")} // Navigate to the next page
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Next <FaArrowRight className="text-lg"/>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OrganicFruits;
