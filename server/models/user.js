import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true, 
            minlength: 3, 
            maxlength: 50 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true, 
            lowercase: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        verifyOtp: { 
            type: String, 
            default: '' 
        },
        verifyOtpExpireAt: { 
            type: Date, 
            default: null 
        },
        isAccountVerified: { 
            type: Boolean, 
            default: false 
        },
        resetOtp: { 
            type: String, 
            default: '' 
        },
        resetOtpExpireAt: { 
            type: Date, 
            default: null 
        }
    }, 
    { timestamps: true } // Adds createdAt & updatedAt
);

// Ensure email indexing for fast lookup
userSchema.index({ email: 1 });

// Hash password before saving (only if modified)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
