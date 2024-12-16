import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connectDB.";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB()
    console.log(`Server listening at port ${PORT}`);
});
