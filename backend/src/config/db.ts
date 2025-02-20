import mongoose from "mongoose";
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB as string);
    console.log("Database Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

export default connectDb;
