import  jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model.js";
import { Response } from "express";


export const generateToken = (res:Response, user:IUserDocument )=>{
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "defaultSecret", {expiresIn: "7d"});
    res.cookie("token", token, {httpOnly:true, sameSite:'strict', maxAge:24*3600*1000})
    return token
}