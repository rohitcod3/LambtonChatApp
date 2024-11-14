import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectToMongoDB = async () => {
try{
console.log("MONGO_URI:", process.env.MONGO_URI);
await mongoose.connect(process.env.MONGO_URI)
console.log("Connected to MongoDB")
}catch(error){
    console.log("Error connecting to MongoDB", error.message)
}

}

