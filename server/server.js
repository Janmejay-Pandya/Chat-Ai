import express from 'express';
import userRoute from "./src/routes/user.route.js";
import { connectDB } from './src/utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware to handle large payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Cookie parser for authentication/session handling
app.use(cookieParser());

// CORS configuration to allow frontend access
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// API routes
app.use("/api/auth", userRoute);

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
