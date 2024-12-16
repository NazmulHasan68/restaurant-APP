import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const signup = async(req:Request, res:Response) =>{
    try {
        const {fullname , email, password, contact} = req.body()
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success : false,
                message: "User already exist with this email"
            })
        }
        const hashedPassword = await bcrypt.hash('password', 10);
        const verificationToken = "sdf"
        user = await User.create({
            fullname ,
            email,
            password:hashedPassword,
            contact : Number(contact),
            verificationToken,
            verificationTokenExpireAt:Date.now()+24*60*60*1000,
        })
        // generateToken (res, user)
        // await sendVerificationEmail(email, verification)
        const userwithoutPassword = await User.findOne({email}).select("-password")
        return res.status(201).json({
            success : true,
            message : "Account created successfully!",
            user: userwithoutPassword
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error , signup"})
    }
}

export const login = async(req:Request, res:Response)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Incorrect email or password!"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : "Incorrect email or password!"
            })
        }
        // generateToken(res,user)
        user.lastLogin = new Date();
        await user.save()

        //send user without password
        const userwithoutPassword = await User.findOne({email}).select("-password")
        return res.status(200).json({
            success : true,
            message : `Welcome back ${user.fullname}`,
            user : userwithoutPassword
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error , login"})
    }
}