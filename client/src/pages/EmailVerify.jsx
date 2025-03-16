import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";

export default function EmailVerify() {
    const { backendUrl, isLoggedin, userData, getUserData, setUserData, setIsLoggedin } = useContext(AppContent);
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    // Redirect if already verified
    useEffect(() => {
        if (isLoggedin && userData?.isAccountVerified) {
            toast.info("Your account is already verified!");
            navigate("/");
        }
    }, [isLoggedin, userData, navigate]);

    useEffect(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
    }, []);

    const handleInput = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return; // ✅ Allow only numbers (0-9)

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus forward if input is filled and not the last one
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = ""; // Clear current field
            } else if (index > 0) {
                newOtp[index - 1] = ""; // Move focus back
                inputRefs.current[index - 1].focus();
            }

            setOtp(newOtp);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = ["", "", "", "", "", ""];

        pasteData.forEach((char, index) => {
            if (/^\d$/.test(char) && inputRefs.current[index]) {
                newOtp[index] = char;
            }
        });

        setOtp(newOtp);

        // Move focus to last filled input
        const lastIndex = newOtp.findIndex((val) => val === "");
        if (lastIndex !== -1) {
            inputRefs.current[lastIndex].focus();
        } else {
            inputRefs.current[5].focus();
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            toast.error("Please enter a 6-digit OTP.");
            return;
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp: otpCode });

            if (data.success) {
                toast.success("Email verified successfully!");

                // ✅ Properly fetch the updated user data before setting the state
                await getUserData();
                setUserData((prev) => ({ ...prev, isAccountVerified: true }));
                setIsLoggedin(true);

                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify email.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            {/* Back Button */}
            <h1 onClick={() => navigate("/")} className="absolute top-4 left-4 text-blue-500 cursor-pointer">
                Back
            </h1>

            {/* OTP Verification Form */}
            <form onSubmit={onSubmitHandler} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                <h1 className="text-white text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
                <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email.</p>

                {/* OTP Inputs */}
                <div className="flex justify-between mb-8" onPaste={handlePaste}>
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleInput(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white">
                    Verify Email
                </button>
            </form>
        </div>
    );
}
