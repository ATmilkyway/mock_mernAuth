import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModle from "../models/userModel";

// User registration
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
    const newUser = await userModle.create({
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

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing details
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    // Check if user exist
    const userExist = await userModle.findOne({ email });

    if (!userExist)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });

    // Genrate token
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 7 * 24 * 60 ** 60 * 1000, // a week
    });

    // Respond with success
    return res.status(200).json({
      success: false,
      message: "Login succssful",
      user: {
        id: userExist._id,
        email: userExist.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};