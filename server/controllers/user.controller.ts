import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto'


export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body();
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }
    const hashedPassword = await bcrypt.hash("password", 10);
    const verificationToken = "sdf";
    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    // generateToken (res, user)
    // await sendVerificationEmail(email, verification)
    const userwithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      user: userwithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error , signup" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password!",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password!",
      });
    }
    // generateToken(res,user)
    user.lastLogin = new Date();
    await user.save();

    //send user without password
    const userwithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userwithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error , login" });
  }
};

//email
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpireAt: { $gt: Date.now() },
    }).select("-password")

    if(!user){
        return res.status(400).json({
            success : false,
            message : "Invalid or expired verification token"
        })
    }

    user.isVerified =  true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    //send welcome email
    // await sendWelcomeEmail(user.email, user.fullname)

    return res.status(200).json({
        success:true,
        message : "Email verified successfully!"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error , verify" });
  }
};


export const logout = async(req:Request, res:Response) =>{
    try {
        return res.clearCookie("token").status(200).json({
            success : true,
            message : "Logged out successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error , Logout" });
    }
}


export const forgotPassword = async(req:Request, res:Response) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist!"
            })
        }

        const resetToken = crypto.randomBytes(40).toString('hex')
        const resetTokenExpiresAt = new Date(Date.now()+1*3600*1000) //1hr

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt
        await user.save()

        //send eamil
        // await sendPasswordResetEamil(user.email, `${process.env.FRONTEND_URL}/resetpassword/${token}`)

        return res.status(200).json({
            success:true,
            message : "Password reset like sent to your email!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error , forgot password" });
    }
}


export const resetPassword = async(req:Request, res:Response) =>{
    try {
        const {token} = req.params
        const {newPassword} = req.body
        const user = await User.findOne({resetPasswordToken:token, resetPasswordTokenExpiresAt:{$get:Date.now()}})

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid or expired reset token!"
            })
        }
        // update password 
        const hadhedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hadhedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save()
        
        //send success reset email
        // await sendRestSuccessEmail(user.email)

        return res.status(200).json({
            success:true,
            message:"Password reset successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error , reset password" });
    }
}


export const checkAuth = async(req:Request, res:Response)=>{
    try {
        // const userId = 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error , check Auth" });
    }
}



// 1. signup
// 2. signin
// 3. logut
// 4. email verification
// 5. forget password
// 6. resetPassword
// 7. checkAuth