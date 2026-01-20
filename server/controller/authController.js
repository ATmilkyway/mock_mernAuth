import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModle from "../models/userModel";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check for missing details
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await userModle.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = userModle.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // Genrate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 7 * 24 * 60 ** 60 * 1000, // a week
    });

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
