import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Brands = () => {
  const navigate = useNavigate(); // React Router navigation

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
    { src: "/src/images/indofilLogo.png", alt: "Indofil Logo" }
  ];

  return (
    <motion.div
      className="relative bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-green-900 dark:via-green-800 dark:to-green-700 py-12 px-6 rounded-2xl shadow-2xl max-w-6xl mx-auto text-center overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-5xl font-extrabold text-green-800 dark:text-green-100 mb-8 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Trusted Brands
      </motion.h2>

      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {brands.slice(0, 5).map((brand, index) => (
          <motion.div 
            key={index} 
            className="p-4 bg-white dark:bg-green-800 rounded-xl shadow-lg hover:shadow-2xl border border-green-200 dark:border-green-600"
            whileHover={{ scale: 1.12, rotate: 2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img className="h-20 md:h-24 dark:filter dark:invert drop-shadow-lg" src={brand.src} alt={brand.alt} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button 
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-all transform hover:scale-110"
          onClick={() => navigate('/brands')}  // Redirect to the brands page
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          View More
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Brands;
