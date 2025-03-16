import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import transporter from '../config/nodemailer.js';

// 🛠 Register API
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User Already Exists" });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set JWT in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Send welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to AgriꞰart🌿!',
            html: `
             <h1>Welcome to AgriꞰart, ${name}!</h1>
<p>We are delighted to have you as a valued member of <strong>AgriꞰart</strong>. Your account has been successfully created.</p>
<p><strong>Email:</strong> ${email}</p>
<p>We look forward to supporting your journey with us. If you have any questions, feel free to reach out.</p>
<p>Happy exploring! 🚀</p>  
<p>Best regards, <br> <strong>The AgriꞰart Team</strong></p>

            `
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "User Registered Successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// 🛠 Login API
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are Required' });
    }

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid Email' });
        }

        // Check password match
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set JWT in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({ success: true, message: "Login Successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// 🛠 Logout API
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: 'Logged Out Successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

//  🛠 Send OTP API for Email Verification
export const sendVerifyOtp = async (req, res) => {
    const { userId } = req.body;

    // Validation
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is Required' });
    }

    try {
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        // Check if account is already verified
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account Already Verified" });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.verifyOtp = hashedOtp;
        user.verifyOtpExpireAt = Date.now() + 4 * 60 * 60 * 1000; // OTP expires after 4 hours

        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP!',
            html: `<h1>Welcome to AgriꞰart🌿</h1>
<p>Thank you for joining <strong>AgriꞰart</strong>. To complete your account verification, please use the OTP below:</p>
<h2 style="color: #2d89ef;">Your OTP: <strong>${otp}</strong></h2>
<p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
<p>If you did not request this, please ignore this email.</p>
<p>Best regards, <br> <strong>The AgriꞰart Team</strong></p>
`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Verification OTP Sent on Email' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//  🛠 Verify OTP API
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    // Validation
    if (!userId || !otp) {
        return res.status(400).json({ success: false, message: 'Missing Details' });
    }

    try {
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }

        // Compare OTP
        const isOtpMatch = await bcrypt.compare(otp, user.verifyOtp);
        if (!isOtpMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Check if OTP has expired
        if (new Date(user.verifyOtpExpireAt) < new Date()) {
            return res.status(400).json({ success: false, message: 'OTP Expired' });
        }

        // Update user verification status
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: 'Email Verified Successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//  🛠 Check if User is Authenticated
export const isAuthenticated = async (req, res) => {
    try {
     return res.json({success:true})
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message});
    }
};

//  🛠 Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    // Validation
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is Required' });
    }

    try {
        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User Not Found' });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetOtp = hashedOtp;
        user.resetOtpExpireAt = Date.now() + 2 * 60 * 1000; // OTP expires after 15 minutes

        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP!',
            html: `<h1>Welcome to AgriꞰart🌿.</h1>
<p>You have requested to reset your password. Please use the OTP below to proceed with resetting your password:</p>
<h2 style="color: #2d89ef;">Your OTP: <strong>${otp}</strong></h2>
<p>This OTP is valid for a limited time. Please do not share it with anyone.</p>
<p>If you did not request a password reset, please ignore this email or contact our support team.</p>
<p>Best regards, <br> <strong>The AgriꞰart Team</strong></p>
`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'OTP sent to your Email' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//  🛠 Reset User Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and New Password are required.' });
    }

    try {
        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check OTP validity
        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
        if (!isOtpValid) {
            return res.status(400).json({ success: false, message: 'Invalid OTP provided.' });
        }

        // Check if OTP has expired
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ success: true, message: 'Your password has been reset successfully!' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
};