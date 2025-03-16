import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../content/AppContent";
import { useCart } from "../Seeds/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUser, FiLogOut, FiMenu, FiX, FiCheckCircle } from "react-icons/fi";
import iconCart from "../images/iconCart.png";
import { motion } from "framer-motion";

const Header = () => {
    const { userData, backendUrl, setUserData } = useContext(AppContent);
    const { totalQuantity, toggleStatusTab } = useCart();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
            setUserData(null);
            toast.success("Logged out successfully");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to log out. Try again!");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-500 to-green-700 shadow-lg sticky top-0 z-50">
            {/* Logo / Home Link */}
            <Link to="/" className="text-white text-3xl font-bold hover:text-yellow-300 transition-colors">
                AgriꞰart🌿
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
                {["Home", "About", "Services", "Contact", "Blog"].map((item) => (
                    <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`} className="text-white hover:text-yellow-300 text-lg px-4 py-2 rounded-lg transition-all">
                        {item}
                    </Link>
                ))}
            </nav>

            {/* Right Side: Cart & Auth */}
            <div className="flex items-center gap-4">
                {/* Cart Button */}
                <motion.button whileHover={{ scale: 1.1 }} className="relative w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-md transition-all" onClick={toggleStatusTab}>
                    <img src={iconCart} alt="Cart" className="w-7" />
                    {totalQuantity > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold w-5 h-5 rounded-full flex justify-center items-center">
                            {totalQuantity}
                        </span>
                    )}
                </motion.button>

                {/* Auth Section */}
                {userData ? (
                    <div ref={dropdownRef} className="relative">
                        <motion.button whileHover={{ scale: 1.1 }} className="bg-white text-green-600 text-lg font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-lg transition-transform" onClick={() => setShowDropdown((prev) => !prev)}>
                            {userData.name ? userData.name[0].toUpperCase() : <FiUser />}
                        </motion.button>
                        {showDropdown && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute top-12 right-0 bg-white shadow-xl rounded-lg py-2 w-44 text-black z-10">
                                <ul className="text-sm">
                                    {!userData.isAccountVerified && (
                                        <li onClick={() => navigate("/email-verify")} className="px-4 py-2 text-green-600 font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-200">
                                            <FiCheckCircle /> Verify Account
                                        </li>
                                    )}
                                    <li onClick={handleLogout} className="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-200 cursor-pointer">
                                        <FiLogOut /> Logout
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="bg-yellow-400 text-green-800 px-4 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all">Log In</Link>
                        <Link to="/signup" className="bg-yellow-500 text-green-800 px-4 py-2 rounded-full shadow-md hover:bg-yellow-400 transition-all">Sign Up</Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white text-3xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute top-16 left-0 w-full bg-green-700 text-white py-4 shadow-md md:hidden">
                    {["Home", "About", "Services", "Contact", "Blog"].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`} className="block px-6 py-3 text-lg hover:bg-green-600 transition" onClick={() => setMobileMenuOpen(false)}>
                            {item}
                        </Link>
                    ))}
                </motion.div>
            )}
        </header>
    );
};

export default Header;
