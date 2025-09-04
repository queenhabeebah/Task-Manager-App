import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

// dotenv.config();

// connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins (deployed frontend + localhost/127.*)
const allowedOrigins = [
  process.env.CLIENT_URL || "https://task-manager-frontend-ten-theta.vercel.app"
];

app.use((req, res, next) => {
  console.log("🔍 Request Origin:", req.headers.origin);
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/curl

    if (
      allowedOrigins.includes(origin) || 
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(null, false); // blocked, but no server crash
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || "Something went wrong!",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
