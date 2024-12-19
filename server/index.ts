import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.route";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from "./db/connectDB.";

const app = express();
const PORT = process.env.PORT || 3000;

// Default middleware for any MERN project
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true
};
app.use(cors(corsOptions));


// API routes
app.use("/api/v1/user", userRoute);

// Start the server and connect to DB
app.listen(PORT, () => {
    connectDB(); // Ensure the DB is connected before starting the server
  console.log(`Server listening at port ${PORT}`);
});
