import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiMessageCircle } from "react-icons/fi";
import Navbar from "../components/NavBar";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center text-green-700 dark:text-green-400 mb-6"
        >
          Get in Touch 📩
        </motion.h2>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-lg w-full border border-gray-200 dark:border-gray-700">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="relative">
              <FiMessageCircle className="absolute left-3 top-4 text-gray-400" />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={`w-full pl-10 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 ${errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-transform focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              {loading ? <span className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></span> : "Send Message 🚀"}
            </motion.button>
          </form>
          {submitted && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-green-600 text-center mt-4 font-medium">✅ Your message has been sent successfully!</motion.p>}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
