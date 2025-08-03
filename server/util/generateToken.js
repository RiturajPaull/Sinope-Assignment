import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = async (id) => {
  const token = await jwt.sign({ _id: id }, process.env.TOKEN);
  return token;
};
