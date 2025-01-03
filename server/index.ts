import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from "./db/connectDB.";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from 'path'


const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve()

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
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// for deploy
app.use(express.static(path.join(DIRNAME, "client/dist")));  // Use build instead of dist
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));  // Same here
});

// Start the server and connect to DB
app.listen(PORT, () => {
    connectDB(); // Ensure the DB is connected before starting the server
  console.log(`Server listening at port ${PORT}`);
});
