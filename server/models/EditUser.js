import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Check if the model already exists to prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true }, // New field for address
        dob: { type: Date, required: true }, // New field for date of birth
        gender: { type: String, required: true }, // New field for gender
    },
    { timestamps: true }
));

// Hash the password before saving it
User.schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Add comparePassword method to the User schema
User.schema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default User;