import { UserModel } from "../Model/userModel.js";
import { generateToken } from "../util/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, resp) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return resp.status(400).json({
        message: "All the fields are required for registration.",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return resp.status(400).json({
        message: "User Already Registered",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const registeredUser = await UserModel.create(userData);

    return resp.status(201).json({
      message: "User Registered Successfully!!",
      success: true,
      user: registeredUser,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).json({
        message: "All the fields are requied for Login.",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return resp.status(400).json({
        message: "No such user found!!. Please Register.",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return resp.status(400).json({
        message: "Incorrect Password !!",
        success: false,
      });
    }
    const token = await generateToken(user._id);

    return resp.status(200).json({
      message: "Login Successfull!!",
      success: true,
      token,
      user,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const logout = async (req, resp) => {
  try {
    return resp.status(200).json({
      message: "Logout Successfull",
      success: true,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};

export const userDetails = async (req, resp) => {
  try {
    const { userId } = req;

    if (!userId) {
      return resp.status(400).json({
        message: "Please login to view user details",
        success: false,
      });
    }

    const user = await UserModel.find({ _id: userId });
    if (!user) {
      return resp.status(400).json({
        message: "No Such user",
        success: false,
      });
    }
    return resp.status(200).json({
      message: "User Details",
      success: true,
      user,
    });
  } catch (error) {
    return resp.status(500).json({
      message: error.message || error,
      success: false,
    });
  }
};
