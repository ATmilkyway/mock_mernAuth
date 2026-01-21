import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";


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
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Genrate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      maxAge: 60 * 60 * 1000, // a1hr
    });

    // Send wellcome message
    const mailOptions = {
      from: `"Your App Name" <${process.env.SENDER_EMAIL}>`,
      to: newUser.email,
      subject: "Welcome to Our Platform",
      text: `Welcome to our platform. Your account has been created with email ID ${newUser.email}`,
    };

    await transporter.sendMail(mailOptions);

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
    const userExist = await userModel.findOne({ email });

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
      maxAge: 60 * 60 * 1000, // 1hr
    });

    // Respond with success
    return res.status(200).json({
      success: true,
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

// User logout
export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    });

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while logging out.",
    });
  }
};

// Send Otp
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);

    // Check if user exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already verified?
    if (user.isAccountVerified) {
      res.status(200).json({
        success: false,
        message: "User is already verified",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await userModel.findByIdAndUpdate(userId, {
      verifyOtp: hashedOtp,
      verifyOtpExpiresAt: Date.now() + 10 * 60 * 1000, // 10 min
    });

    // Send Otp email
    const mailOptions = {
      from: `"Your App Name" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "Verification OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Validate input
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    // Find user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already verified?
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified",
      });
    }

    // OTP exists & not expired?
    if (!user.verifyOtp || user.verifyOtpExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired or invalid",
      });
    }

    // Compare OTP (plain vs hashed)
    const isOtpValid = await bcrypt.compare(otp, user.verifyOtp);
    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Verify account + clean OTP
    await userModel.findByIdAndUpdate(userId, {
      isAccountVerified: true,
      verifyOtp: null,
      verifyOtpExpiresAt: null,
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
