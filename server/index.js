import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path, { dirname } from 'path'
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import productRoutes from './routes/productRoutes.js'
import { checkAuth } from "./middleware/checkAuth.js";
import upload from "./middleware/uploadFile.js";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json({extended: true}));
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/user", checkAuth, userRouter);
app.use('/api/products', productRoutes)

app.post('/upload', upload.array('productImage', 6), (req, res) => {
    const fileUrls = req.files.map(file => `http://localhost:5000/images/${file.filename}`);
    res.json({ message: fileUrls });
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        app.listen(5000, () => console.log("server started"));
    } catch (error) {
        console.log(error);
    }
};

start();
