import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongobd.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true // Allow cookies and authentication headers
}));

// ✅ Debugging: Log Incoming Requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ✅ API Endpoints
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// ✅ Default Route
app.get('/', (req, res) => res.send("API is Running 🚀"));

// ✅ Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: "Route Not Found" });
});

// ✅ Start Server
app.listen(port, () => console.log(`🔥 Server is running on port ${port}`));
