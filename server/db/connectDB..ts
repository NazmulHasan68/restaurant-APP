import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('mongoDB connected.');
    } catch (error) {
        console.log(error);
    }
}