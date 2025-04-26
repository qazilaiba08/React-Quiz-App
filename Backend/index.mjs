import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json());
connectDB();

app.use("/api", quizRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend is Running 🚀");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
