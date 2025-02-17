import Admin from "../schema/adminSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, userName, password } = req.body;

    const existingAdmin = await Admin.findOne({ userName });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const existingPhone = await Admin.findOne({ phoneNumber });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone Number is already in use" });
    }

    const newAdmin = new Admin({
      firstName,
      lastName,
      phoneNumber,
      userName,
      password,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin account created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: admin._id }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
