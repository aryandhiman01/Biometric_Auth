import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sequelize from "./config/sequelize.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Sync tables
await sequelize.sync();

app.use("/api/auth", authRoutes);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("PostgreSQL BioAuth Backend Running 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);