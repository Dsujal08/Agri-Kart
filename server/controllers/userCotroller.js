import userModel from "../models/user.js";

export const getUserData = async (req, res) => {

    try {
        const {userId} =req.body;

        const user = await userModel.findById(userId)
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }
        
        res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerified: user.isAccountVerified
            }
        })

    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
