import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import entryRoute from "./routes/entry.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5500;
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to mongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1); // Exit the process on error
    }
  };

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => { res.send('Hello from Express!') });

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(helmet());


app.use(cors({
   origin: "http://localhost:3000",
   credentials: true
}))



app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);

app.listen(PORT, () => {
  console.log("Listening on port 5500");
  connect();
});
