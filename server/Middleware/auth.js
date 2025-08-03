import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, resp, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return resp.status(400).json({
        message: "Token is not present",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.TOKEN);

    if (!decode) {
      return resp.status(400).json({
        message: "Unauthorized user",
        success: false,
      });
    }

    console.log("DECODE", decode);
    req.userId = decode._id;
    next();
  } catch (error) {
    return resp.status(500).json({
      message: "Error decoding token",
      success: false,
    });
  }
};
