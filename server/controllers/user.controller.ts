import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";

// SIGNUP CONTROLLER
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullname, email, password, contact} = req.body;

        // Check if user already exists
        if (await User.findOne({ email })) {
            res.status(400).json({ success: false, message: "User already exists with this email" });
            return;
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationCode();
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        // Generate token and send verification email
        generateToken(res, newUser);
        await sendVerificationEmail(email, verificationToken);

        // Respond without password
        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: { fullname, email, contact },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// LOGIN CONTROLLER
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ success: false, message: "Incorrect email or password" });
            return;
        }

        generateToken(res, user);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: `Welcome back, ${user.fullname}`,
            user: { fullname: user.fullname, email: user.email , isVerified:user.isVerified, admin:user.admin},
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// VERIFY EMAIL CONTROLLER
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { verificationCode } = req.body;

        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid or expired verification token" });
            return;
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.fullname);

        res.status(200).json({ success: true, message: "Email verified successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// LOGOUT CONTROLLER
export const logout = async (_: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("token").status(200).json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// FORGOT PASSWORD CONTROLLER
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ success: false, message: "User doesn't exist" });
            return;
        }

        const resetToken = crypto.randomBytes(40).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = new Date(Date.now() + 3600000 * 24); // 24 hour
        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// RESET PASSWORD CONTROLLER
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            res.status(400).json({ success: false, message: "Invalid or expired reset token" });
            return;
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// UPDATE PROFILE CONTROLLER
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;

        if (!fullname || !email) {
            res.status(400).json({ success: false, message: "Full name and email are required." });
            return;
        }

        let profileImageURL: string | undefined;
        if (profilePicture) {
            try {
                const cloudResponse = await cloudinary.uploader.upload(profilePicture, { folder: "user_profiles" });
                profileImageURL = cloudResponse.secure_url;
            } catch (error) {
                res.status(500).json({ success: false, message: "Error uploading profile picture." });
                return;
            }
        }

        const updatedData = { fullname, email, address, city, country, profilePicture: profileImageURL };
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        if (!user) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }

        res.status(200).json({ success: true, message: "Profile updated successfully.", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Auth
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.id; // Assuming `id` is set by authentication middleware
        const user = await User.findById(userId).select("-password");

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return; // Just return here, no need to return Response
        }

        // Respond with user data, excluding password
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};