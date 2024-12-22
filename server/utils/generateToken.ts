import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model.js";
import { Response } from "express";

export const generateToken = (res: Response, user: IUserDocument): void => {
  // Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  }

  // Generate token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "defaultSecret",
    { expiresIn: "7d" }
  );

  // Set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 7 * 24 * 3600 * 1000, // 7 days
  });
};
