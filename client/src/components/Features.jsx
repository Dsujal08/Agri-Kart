import { motion } from "framer-motion";
import Navbar from "./NavBar";

const features = [
  {
    id: 1,
    title: "Secure Transactions",
    description: "End-to-end encrypted payments for a safe and secure experience.",
    icon: "🛡️",
  },
  {
    id: 2,
    title: "24/7 Support",
    description: "Our team is available 24/7 to assist you with any queries.",
    icon: "📞",
  },
  {
    id: 3,
    title: "Easy Navigation",
    description: "User-friendly design for seamless browsing.",
    icon: "🚀",
  },
];

export default function Features() {
  return (
      <>
      <Navbar />
    <div className="min-h-screen py-16 px-8 bg-gradient-to-b from-green-200 to-green-500 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        🚀 Key Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-2xl"
            >
            <span className="text-6xl">{feature.icon}</span>
            <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-3">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
        </>
  );
}
