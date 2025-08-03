import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("DB is Connected!!");
  try {
  } catch (error) {
    console.log("DB Error", error.message);
  }
};
