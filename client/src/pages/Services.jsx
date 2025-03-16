import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";

const servicesData = [
  {
    icon: (
      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Quality Seeds & Fertilizers",
    description: "We provide top-quality seeds and fertilizers to boost your yield and ensure healthy crops.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 15 16 15 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Fast & Reliable Delivery",
    description: "Get your agricultural products delivered quickly and efficiently, straight to your farm.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    title: "E-Commerce Marketplace",
    description: "A trusted platform where farmers can buy and sell agricultural tools, machinery, and more.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="8" />
      </svg>
    ),
    title: "24/7 Farmer Support",
    description: "We offer round-the-clock assistance to help you with any agricultural queries or concerns.",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Community & Knowledge Sharing",
    description: "Join our farming community to share knowledge, insights, and best practices.",
  },
];

const Services = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-500 to-green-700 px-6 py-14 text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center mb-4"
        >
          Our Services
        </motion.h2>

        <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
          Empowering farmers with the best agricultural solutions
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white text-gray-900 p-6 rounded-2xl shadow-md border border-transparent hover:border-green-500 hover:shadow-lg transition transform hover:scale-105 dark:bg-gray-800 dark:text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};


export default Services;
