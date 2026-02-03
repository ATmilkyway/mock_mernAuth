import jwt from "jsonwebtoken";
const userAuth = (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized. Login agin.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;
