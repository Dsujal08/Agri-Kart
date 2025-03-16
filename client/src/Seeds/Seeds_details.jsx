import React from "react";
import { useNavigate } from "react-router-dom"; 

export const SeedsDetails = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 to-green-100 p-5 relative">
      {/* Back Button (Top Left) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        ⬅ Back
      </button>

      <div className="bg-white bg-opacity-80 shadow-2xl rounded-2xl p-8 max-w-3xl w-full backdrop-blur-md border border-green-300">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4 text-center drop-shadow-lg">
          🌱 What is a Seed?
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          A seed is a basic part of any plant. The ovules after fertilization develop into seeds. A seed is made up of 
          a seed coat and an embryo. The embryo consists of a radicle, an embryonal axis, and one (wheat, maize) or two 
          cotyledons (gram, pea). A seed is found inside a fruit and grows into a new plant when planted.
        </p>

        <h2 className="text-3xl font-semibold text-green-700 mt-6 border-b-4 border-green-500 inline-block">
          🌾 Types of Seeds
        </h2>
        <p className="text-gray-700 text-lg mt-3">Seeds are primarily classified into two types:</p>
        <ul className="list-none space-y-3 mt-3">
          <li className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md">1</span>
            <span className="ml-3 text-lg text-gray-800 font-medium">Monocotyledonous Seed</span>
          </li>
          <li className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md">2</span>
            <span className="ml-3 text-lg text-gray-800 font-medium">Dicotyledonous Seed</span>
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-green-700 mt-6 border-b-4 border-green-500 inline-block">
          🌿 Structure of a Monocotyledonous Seed
        </h2>
        <p className="text-gray-700 text-lg mt-3">
          A monocotyledonous seed has only one cotyledon with a single outer layer of seed coat. It consists of:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li><strong>Seed Coat:</strong> Membranous and fused with the fruit wall (hull).</li>
          <li><strong>Endosperm:</strong> Stores food; usually present in monocot seeds.</li>
          <li><strong>Aleuron Layer:</strong> Protein-rich layer separating endosperm from the embryo.</li>
          <li><strong>Embryo:</strong> Small, positioned in a groove at one end.</li>
          <li><strong>Scutellum:</strong> Large, shield-shaped cotyledon.</li>
          <li><strong>Embryonal Axis:</strong> Contains plumule and radicle.</li>
          <li><strong>Coleoptile & Coleorhiza:</strong> Protective sheaths for plumule and radicle.</li>
        </ul>

        <h2 className="text-3xl font-semibold text-green-700 mt-6 border-b-4 border-green-500 inline-block">
          🌾 Structure of a Dicotyledonous Seed
        </h2>
        <p className="text-gray-700 text-lg mt-3">
          Unlike monocots, dicotyledonous seeds have two cotyledons and consist of:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li><strong>Seed Coat:</strong> Has two layers – outer testa and inner tegmen.</li>
          <li><strong>Hilum:</strong> Scar where the seed was attached to the fruit.</li>
          <li><strong>Micropyle:</strong> Small pore above the hilum.</li>
          <li><strong>Embryo:</strong> Contains embryonal axis and two cotyledons.</li>
          <li><strong>Endosperm:</strong> Food storage tissue (in some seeds like castor).</li>
        </ul>

        <h2 className="text-3xl font-semibold text-green-700 mt-6 border-b-4 border-green-500 inline-block">
          🌍 Types of Mature Seeds
        </h2>
        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
          <li><strong>Non-Albuminous:</strong> No residual endosperm (e.g., pea, groundnut).</li>
          <li><strong>Albuminous:</strong> Contains endosperm for food storage (e.g., wheat, maize).</li>
        </ul>

        <div className="mt-8 p-5 bg-green-200 bg-opacity-70 rounded-xl shadow-lg border-l-4 border-green-500">
          <h3 className="text-2xl font-semibold text-green-900">💡 Did You Know?</h3>
          <p className="text-gray-800 mt-2 text-lg">
            In plants like beans, grams, and peas, the endosperm is absent in the mature seed, making them non-endospermous.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/')} // Navigate back in history
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            ⬅ Back
          </button>

          <button
            onClick={() => navigate("/FerDetails")} // Update this to the actual next page
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};
