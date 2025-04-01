import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Invalid or expired token" });
            }
            req.user = decoded; // Attach decoded user info to request
            next();
        });
    } catch (error) {
        console.error("Token Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
