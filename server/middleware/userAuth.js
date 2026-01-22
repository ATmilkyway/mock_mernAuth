import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.userId = decoded.id;
    // Continue to next middleware / controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;

// Send Otp
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.body;
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
