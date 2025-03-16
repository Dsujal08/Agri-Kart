import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true; // ✅ Set globally outside the component

export const AppContent = createContext();

export const AppContentProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedin, setIsLoggedin] = useState(null); // ✅ Default to `null` to indicate loading state
    const [userData, setUserData] = useState(null);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`);

            if (data.success) {
                setUserData(data.userData);
                setIsLoggedin(true); // ✅ Set login state based on API response
            } else {
                setIsLoggedin(false);
                setUserData(null);
                toast.error(data.message);
            }
        } catch (error) {
            setIsLoggedin(false);
            setUserData(null);
            toast.error(error.response?.data?.message || "Failed to fetch user data.");
        }
    };

    // ✅ Fetch user data on mount (determines if logged in)
    useEffect(() => {
        getUserData();
    }, []);

    const value = {
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
    };

    return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
