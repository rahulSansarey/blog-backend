import { User } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, fullName, profilePhoto } =
      req.body;
    if (!email || !password || !confirmPassword || !fullName) {
      return res.status(404).json({ message: "Please provide all details" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password didn't match" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      fullName,
      profilePhoto,
    });

    return res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error during account creation:", error); // Log the error
    return res
      .status(400)
      .json({ message: "Account creation failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Please Provide an email" });
    }

    if (!password) {
      return res.status(401).json({ message: "Please Provide a Password" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(200).json({ message: "User doesn't exists" });
    }

    console.log(checkUser);

    const matchPassword = await bcrypt.compare(password, checkUser.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Password didn't matched" });
    }

    const tokendata = {
      userId: checkUser._id,
    };

    const token = await jwt.sign(tokendata, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      })
      .json({
        _id: checkUser._id,
        email: checkUser.email,
        fullName: checkUser.fullName,
        profilePhoto: checkUser.profilePhoto,
      });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error });
    success: true;
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logged Out" });
};
