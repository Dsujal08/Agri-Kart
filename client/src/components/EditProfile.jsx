import React, { useState, useContext, useEffect } from "react";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const { userData, backendUrl, setUserData } = useContext(AppContent);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dob: "", // Date of Birth
        gender: "", // Gender
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                address: userData.address || "",
                dob: userData.dob || "", // Default date of birth
                gender: userData.gender || "", // Default gender
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/update-profile`,
                formData,
                { withCredentials: true }
            );
            if (data.success) {
                setUserData(data.user);
                toast.success("Profile updated successfully");
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <form
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-center text-green-700 dark:text-white mb-6">Edit Profile</h2>
                
                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        required
                        disabled
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        pattern="\d*" // Only numbers allowed
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 p-3 w-full border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 shadow-md"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mt-6 flex justify-between gap-4">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-500 shadow-md"
                    >
                        Save Changes
                    </button>
                </div>

                <div className="mt-3">
                    <button
                        type="button"
                        className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-400 transition-colors focus:ring-2 focus:ring-gray-400 shadow-md"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
