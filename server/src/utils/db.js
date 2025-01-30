import mongoose from "mongoose";
import dotenv from "dotenv";

const uri=process.env.MONGODB_URI;
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(uri);
        console.log("DB connected:", connection.connection.host);
        
    } catch (error) {
        console.log("Error in DB connection", error);
    }
}