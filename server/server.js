import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/mongobd.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// ✅ API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", paymentRoutes);



import orderRoutes from "./routes/orderRoutes.js";
app.use("/api/orders", orderRoutes);

// ✅ Root Route
app.get("/", (req, res) => res.send("🚀 AgriKart API is running..."));

// ✅ 404 Handler
app.use((req, res) => res.status(404).json({ error: "Route Not Found" }));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start the server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
