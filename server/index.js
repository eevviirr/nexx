import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import productRoutes from './routes/productRoutes.js'
import { checkAuth } from "./middleware/checkAuth.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/user", checkAuth, userRouter);
app.use('/api/products', productRoutes)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(5000, () => console.log("server started"));
    } catch (error) {
        console.log(error);
    }
};

start();
