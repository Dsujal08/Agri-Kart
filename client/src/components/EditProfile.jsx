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
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center text-green-700 dark:text-white">Edit Profile</h2>
                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
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
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
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
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
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
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
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
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium dark:text-white">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 focus:ring-2 focus:ring-green-500"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    className="mt-3 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
