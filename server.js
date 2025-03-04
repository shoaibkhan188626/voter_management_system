import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser'
import voterRoutes from "./routes/voterRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" })); // Adjust size if needed
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
const URI = "mongodb://localhost:27017/";
const PORT = 5000;
const mongoURI = "mongodb+srv://shoaibullakhan15:s2CB11qKkNzldYY4@votermanagementsystem.fluwo.mongodb.net/";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/voters", voterRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
