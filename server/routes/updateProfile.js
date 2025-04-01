import express from "express";
import User from "../models/user.js"; // Import User model
import { verifyToken } from "../middleware/auth.js"; // Ensure user authentication

const router = express.Router();

// ✅ Update Profile Route
router.post("/update-profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token
        const { name, phone, address, dob, gender } = req.body;

        // Log the incoming data to ensure it's correct
        console.log("Received data for profile update:", req.body);

        // Validate input (ensure all required fields are provided)
        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Name, phone, address, date of birth, and gender are required",
            });
        }

        // Validate phone number format (assuming it's numeric and 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number.",
            });
        }

        // Validate date of birth format (assuming it should be in the past)
        const dobDate = new Date(dob);
        if (dobDate >= new Date()) {
            return res.status(400).json({
                success: false,
                message: "Date of birth must be a past date.",
            });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, dob, gender },
            { new: true, select: "-password" } // Exclude password field from the response
        );

        // Log the updated user
        console.log("Updated User:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send the updated user details back to the client
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
