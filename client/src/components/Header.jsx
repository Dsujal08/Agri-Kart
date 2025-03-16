import React, { useContext, useState, useRef, useEffect } from "react";
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

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
        { name: "Blog", path: "/blog" },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        <header className="flex justify-between items-center px-6 py-4 bg-green-600 shadow-md sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-white text-3xl font-bold hover:text-yellow-300 transition-all">
                AgriKart🌿
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map(({ name, path }) => (
                    <Link key={name} to={path} className="text-white hover:text-yellow-300 text-lg transition-all font-medium">
                        {name}
                    </Link>
                ))}
            </nav>

            {/* Cart & Authentication */}
            <div className="flex items-center gap-6">
                {/* Cart Button */}
                <motion.button whileHover={{ scale: 1.1 }} className="relative w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-md hover:shadow-lg transition" onClick={toggleStatusTab}>
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
                        <motion.button whileHover={{ scale: 1.1 }} className="bg-white text-green-600 text-lg font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition" onClick={() => setShowDropdown((prev) => !prev)}>
                            {userData.name ? userData.name[0].toUpperCase() : <FiUser />}
                        </motion.button>
                        {showDropdown && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute top-12 right-0 bg-white shadow-xl rounded-lg py-3 w-48 text-black z-10">
                                <ul className="text-sm">
                                    {!userData.isAccountVerified && (
                                        <li onClick={() => navigate("/email-verify")} className="px-4 py-2 text-green-600 font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition">
                                            <FiCheckCircle /> Verify Account
                                        </li>
                                    )}
                                    <li onClick={handleLogout} className="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-200 cursor-pointer transition">
                                        <FiLogOut /> Logout
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="bg-yellow-400 text-green-900 px-5 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all font-medium">Log In</Link>
                        <Link to="/signup" className="bg-yellow-500 text-green-900 px-5 py-2 rounded-full shadow-md hover:bg-yellow-400 transition-all font-medium">Sign Up</Link>
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
                    {navLinks.map(({ name, path }) => (
                        <Link key={name} to={path} className="block px-6 py-3 text-lg hover:bg-green-600 transition" onClick={() => setMobileMenuOpen(false)}>
                            {name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </header>
    );
};

export default Header;
