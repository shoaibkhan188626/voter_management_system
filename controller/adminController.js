import Admin from "../schema/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "SECRET_KEY";

export const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, userName, password } = req.body;

    //checking if admin already exists
    const [existingAdmin, existingPhone] = await Promise.all([
      Admin.findOne({ userName }),
      Admin.findOne({ phoneNumber }),
    ]);

    if (existingAdmin)
      return res.status(400).json({ message: "Admin Already exists" });

    if (existingPhone)
      return res
        .status(400)
        .json({ message: "This phone number Already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      phoneNumber,
      userName,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(200).json({ message: "new Admin created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { identifier, password } = req.body; // Identifier can be username or phone number

    if (!identifier || !password) {
      return res.status(400).json({ message: "Both identifier and password are required" });
    }

    identifier = String(identifier).trim(); // Ensure it's a string

    console.log("Login attempt with identifier:", identifier);

    const admin = await Admin.findOne({
      $or: [{ userName: identifier }, { phoneNumber: identifier }]
    });

    console.log("Admin found:", admin); // Debugging step

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
