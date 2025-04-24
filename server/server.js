import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

// connect to MongoDB
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: err.message || 'Something went wrong!',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
  });

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})