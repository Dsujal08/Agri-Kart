import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongobd.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// ✅ Use CORS *before* defining routes
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true // Allow credentials (cookies, auth headers)
}));

app.use(express.json());
app.use(cookieParser());

// ✅ API ENDPOINTS
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.get('/', (req, res) => res.send("API Working "));

app.listen(port, () => console.log(`Server is running on port ${port}`));
