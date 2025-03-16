import express from 'express';
import { 
    isAuthenticated,
    login, 
    logout,
    register,
    resetPassword,
    sendResetOtp,
    sendVerifyOtp,
    verifyEmail,
     } from '../controllers/authcotroller.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

// Public Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

// // Protected Routes (Require Authentication)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);

// // Password Reset Routes (No Authentication Required)
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);





export default authRouter;
