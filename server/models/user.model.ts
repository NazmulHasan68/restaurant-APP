import { IUser, IUserDocument } from './user.model';
import mongoose from "mongoose";

export interface IUser {
    fullname :string,
    email : string,
    password: string,
    contact:Number,
    address:string,
    city:string,
    country: string,
    profilePicture:string,
    admin:boolean,
    lastLogin?: Date,
    isVerified?: boolean ,
    resetPasswordToken ?:string ,
    resetPasswordTokenExpiresAt?:Date,
    verificationToekn?:string,
    verificationTokenExpireAt?:Date,
}

export interface IUserDocument extends IUser , Document{
    createdAt:Date;
    updateAt :Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    fullname : {
        type :String,
        required : true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type :String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        default : "Update your address"
    },
    city : {
        type : String,
        default : "Update your city"
    },
    country : {
        type : String,
        default : "Update your country"
    },
    profilePicture : {
        type : String,
        default : ""
    },
    admin : {type : Boolean, default : false},

    //advance authentication
    lastLogin : {
        type : Date,
        default : Date.now
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt :Date,
    verificationToekn: String,
    verificationTokenExpireAt:String,
},{timestamps:true})


export const User = mongoose.model("User", userSchema)