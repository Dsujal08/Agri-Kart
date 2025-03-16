import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password

    // Handle OTP Input
    const handleInput = (e, index) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Auto-submit if OTP is complete
        if (index === 5 && newOtp.every((digit) => digit !== "")) {
            handleOtpSubmit();
        }
    };

    // Handle OTP Paste
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
    };

    // Handle Email Submission
    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your registered email.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-reset-otp`, { email });

            if (data.success) {
                toast.success("OTP sent! Check your email.");
                setStep(2); // Move to OTP step
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset password email.");
        }
        setLoading(false);
    };

    // Handle OTP Submission
    const handleOtpSubmit = async (e) => {
        if (e) e.preventDefault();
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            toast.error("Please enter a 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-reset-otp`, { email, otp: otpCode });

            if (data.success) {
                toast.success("OTP Verified! Enter your new password.");
                setStep(3); // Move to New Password step
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
        }
        setLoading(false);
    };

    // Handle New Password Submission
    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword.trim() || !confirmPassword.trim()) {
            toast.error("Please enter and confirm your new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, { email, newPassword });

            if (data.success) {
                toast.success("Password reset successful! Redirecting...");
                navigate("/login"); // Redirect to login page
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
            <h1 onClick={() => navigate("/login")} className="absolute top-4 left-4 text-blue-500 cursor-pointer">
                Back to Login
            </h1>

            {/* Email Submission Form */}
            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset Password</h1>
                    <p className="text-center mb-6 text-indigo-300">Enter your registered email address.</p>

                    <div className="mb-4">
                        <input
                            className="w-full px-4 py-2 bg-[#333A5C] text-white rounded-md"
                            type="email"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-md">
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            )}

            {/* OTP Verification Form */}
            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">Verify OTP</h1>
                    <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email.</p>

                    <div className="flex justify-between mb-8" onPaste={handlePaste}>
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleInput(e, index)}
                                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                            />
                        ))}
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-md">
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            )}

            {/* New Password Form */}
            {step === 3 && (
                <form onSubmit={handleNewPasswordSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                    <h1 className="text-white text-2xl font-semibold text-center mb-4">Set New Password</h1>
                    <input type="password" placeholder="New Password" className="w-full p-2 bg-[#333A5C] text-white rounded-md mb-4" />
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-md">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default ResetPassword;
