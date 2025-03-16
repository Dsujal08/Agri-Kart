import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar"; // ✅ Import NavBar

const brands = [
  { src: "/src/images/bayerLogo.png", alt: "Bayer Logo" },
  { src: "/src/images/dhanukaLogo.png", alt: "Dhanuka Logo" },
  { src: "/src/images/syngentaLogo.png", alt: "Syngenta Logo" },
  { src: "/src/images/janathaAgroProductsLogo.png", alt: "Janatha Agro Logo" },
  { src: "/src/images/rallisLogo.png", alt: "Rallis Logo" },
  { src: "/src/images/namdhariSeedsLogo.png", alt: "Namdhari Seeds Logo" },
  { src: "/src/images/seminisLogo.png", alt: "Seminis Logo" },
  { src: "/src/images/uplLogo.png", alt: "UPL Logo" },
  { src: "/src/images/geolifeLogo.png", alt: "Geolife Logo" },
  { src: "/src/images/indofilLogo.png", alt: "Indofil Logo" },
];

const BrandsPage = () => {
  return (
    <div className="flex flex-col items-center">
      {/* ✅ NavBar at the top */}
      <NavBar />

      <motion.div
        className="w-full min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-green-900 dark:via-green-800 dark:to-green-700 py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 🔥 Heading with smooth entrance animation */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 dark:text-green-100 mb-12 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Trusted Agricultural Brands
        </motion.h2>

        {/* 🔥 Brand Grid with improved alignment & spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 place-items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="p-5 md:p-6 bg-white dark:bg-green-800 rounded-2xl shadow-md md:shadow-lg hover:shadow-2xl border border-green-200 dark:border-green-600 flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.12, rotate: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                className="h-20 md:h-24 lg:h-28 dark:filter dark:invert drop-shadow-lg"
                src={brand.src}
                alt={brand.alt}
                loading="lazy" // ✅ Improves performance
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BrandsPage;
