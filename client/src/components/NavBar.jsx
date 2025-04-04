import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiUser, FiLogOut, FiCheckCircle, FiShoppingCart, FiEdit } from "react-icons/fi";

export default function Navbar() {
    const { userData, backendUrl, setUserData } = useContext(AppContent);
    const navigate = useNavigate();
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        setShowDropdown(false);
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

    const sendVerificationOtp = async () => {
        setShowDropdown(false);
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
            if (data.success) {
                navigate("/email-verify");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="flex items-center justify-between h-20 w-full px-6 md:px-10 sticky top-0 bg-gradient-to-r from-green-500 to-green-700 shadow-lg z-50 dark:bg-gray-900">
            {/* Logo */}
            <div
                className="text-white font-extrabold text-3xl cursor-pointer"
                onClick={() => navigate("/")}
            >
                AgriꞰart🌿
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
                {[{ name: "Home", path: "/" },
                  { name: "About Us", path: "/about-us" },
                  { name: "Services", path: "/services" },
                  { name: "Contact", path: "/contact" },
                  { name: "Blog", path: "/blog" },
                ].map(({ name, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `hover:text-yellow-300 transition-all text-lg px-4 py-2 rounded-lg ${
                                isActive ? "text-yellow-400 font-bold" : "text-white"
                            }`
                        }
                    >
                        {name}
                    </NavLink>
                ))}
            </div>

            {/* Auth Section */}
            <div className="relative flex items-center gap-4">
                {userData ? (
                    <div ref={dropdownRef} className="relative">
                        <button
                            className="bg-white text-green-600 text-lg font-semibold h-10 w-10 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition-transform"
                            onClick={() => setShowDropdown((prev) => !prev)}
                            aria-label="User menu"
                        >
                            {userData.name ? userData.name[0].toUpperCase() : <FiUser />}
                        </button>
                        {showDropdown && (
                            <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg py-2 w-44 text-black z-10 animate-fade-in dark:bg-gray-800 dark:text-white">
                                <ul className="text-sm">
                                    {!userData?.isAccountVerified && (
                                        <li
                                            onClick={sendVerificationOtp}
                                            className="px-4 py-2 flex items-center gap-2 text-green-600 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                        >
                                            <FiCheckCircle /> Verify Account
                                        </li>
                                    )}
                                    <li onClick={() => navigate("/edit-profile")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <FiEdit /> Edit Profile
                                    </li>
                                    <li onClick={() => navigate("/viewOrder")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <FiShoppingCart /> View Orders
                                    </li>
                                    <li onClick={() => navigate("/app")} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <FiShoppingCart /> Admin
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                    >
                                        <FiLogOut /> Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className="bg-yellow-400 text-green-800 px-5 py-2 rounded-full shadow-md hover:bg-yellow-300 transition-all"
                    >
                        Log In
                    </NavLink>
                )}
            </div>
        </nav>
    );
}
