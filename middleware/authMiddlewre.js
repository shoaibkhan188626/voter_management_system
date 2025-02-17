import jwt from "jsonwebtoken";
export const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No Token Provided" });
  }
  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
