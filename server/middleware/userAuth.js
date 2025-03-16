import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message:'Not Authorized Login Again '})
        
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)

        if(tokenDecode.id)
        {
            req.body.userId = tokenDecode.id
        }else
        {
            return res.json({success: false, message:'Not Authorized Login Again '})
        }
        next();
      
    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Session expired! Please log in again."
        });
    }
};

export default userAuth;
