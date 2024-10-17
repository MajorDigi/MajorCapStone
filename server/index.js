import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import entryRoute from "./routes/entry.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Log Mongo URI only if not in production
if (process.env.NODE_ENV !== 'production') {
  console.log("MONGO_URI:", process.env.MONGO_URI);
}

const PORT = process.env.PORT || 5500;

// MongoDB connection logic with retries
const connect = async () => {
  let retries = 5;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to mongoDB.");
      break; // Exit loop on success
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
    }
  }

  // Exit the process if connection fails after retries
  if (retries === 0) {
    process.exit(1);
  }
};

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// Root route for basic health check
app.get('/', (req, res) => { 
  res.send('Hello from Express!'); 
});

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Enhanced security using helmet with some additional options
app.use(helmet({
  contentSecurityPolicy: false, // Example to allow inline scripts (adjust for your needs)
  frameguard: { action: 'deny' } // Disable iframes for the entire app
}));

// Enable CORS and handle credentials
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Adjust for production URL
  credentials: true
}));

// Log HTTP requests using morgan
app.use(morgan("common"));

// API Routes
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connect(); // Initiate MongoDB connection
});
