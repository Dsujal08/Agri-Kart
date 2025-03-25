import React, { useState } from "react";
import ProductCart from "./PlantproductCart";
import { productss } from "./Plantproducts";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(productss.map((product) => product.category))];

  // Filtered Products
  const filteredProducts = productss.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "all" || product.category === category)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-800">
        Featured Products
      </h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm hover:shadow-md"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="hover:scale-105 transition-transform duration-300">
              <ProductCart data={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full animate-fadeIn">
            ⚠️ No products found. Try a different search or category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
