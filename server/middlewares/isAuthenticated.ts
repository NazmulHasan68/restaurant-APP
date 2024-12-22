import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id?: string; // Optional user ID
        }
    }
}

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies?.token;

        if (!token) {
           res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
            return
        }

        // Ensure SECRET_KEY is defined
        if (!process.env.JWT_SECRET) {
            console.error("SECRET_KEY is not defined");
            throw new Error("Environment variable JWT SECRET is not set");
        }

        // Decode token without verification for debugging
        const decodedWithoutVerify = jwt.decode(token);
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.userId) {
           res.status(401).json({
                success: false,
                message: "Invalid token payload",
            });
            return 
        }

        // Attach user ID to the request object
        req.id = decoded.userId;

        // Proceed to next middleware
        next();
    } catch (error: any) {
        console.error("Authentication error:", error.name, error.message);

        // Handle specific JWT errors if needed
        const message =
            error.name === "JsonWebTokenError" ? "Invalid token signature" :
            error.name === "TokenExpiredError" ? "Token has expired" :
            "Invalid or expired token";

        res.status(401).json({
            success: false,
            message,
        });
        return 
    }
};
