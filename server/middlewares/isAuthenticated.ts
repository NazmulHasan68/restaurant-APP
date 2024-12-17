import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string; // The user ID will be attached here
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
            return; // Return without sending a Response object explicitly
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

        req.id = decoded.userId; // Attach user ID to the request

        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
        return;
    }
};
