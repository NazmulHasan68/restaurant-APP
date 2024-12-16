import mongoose, { Document } from "mongoose";

type DeliveryDetails = {
    email : string,
    name : string,
    address :string,
    city:string
}

type CartItems = {
    menuId : string,
    name : string,
    image : string,
    price:number,
    quantity:number;
}

export interface IOrder extends Document{
    user:mongoose.Schema.Types.ObjectId,
    restaurant:mongoose.Schema.Types.ObjectId,
    deliveryDetails:DeliveryDetails,
    cartItems : CartItems,
    totalAmount:number,
    status : "pending" | "confirmed" | "preparing" | "outfordelivery" |"delivered"
}



const orderSchema = new mongoose.Schema<IOrder>({
    user : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    restaurant : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "Restaurant",
        required : true
    },
    deliveryDetails : {
        email : {type : String, required:true},
        name : {type:String, required:true},
        address : {type:String, required:true},
        city : {type:String, required:true},
    },
    cartItems : [{
        menuId : {Type :String, required:true},
        name : {Type :String, required:true},
        price : {Type :Number, required:true},
        image : {Type :String, required:true},
        quantity : {Type :Number, required:true},
    }],
    totalAmount : Number,
    status : {
        type : String,
        enum : ["pending" , "confirmed" , "preparing" , "outfordelivery" ,"delivered"],
        required : true
    }
},{timestamps:true})

export const Order = mongoose.model("Order", orderSchema)