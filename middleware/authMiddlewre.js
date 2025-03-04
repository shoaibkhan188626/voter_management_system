import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied! No Token Provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract actual token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY"); 
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
