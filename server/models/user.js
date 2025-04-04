import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verifyOtp: { type: String, default: '' },
        verifyOtpExpireAt: { type: Number, default: 0 },
        isAccountVerified: { type: Boolean, default: false },
        resetOtp: { type: String, default: '' },
        resetOtpExpireAt: { type: Number, default: 0 },

                 
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Ensure this model is not redefined if it already exists in the models
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
