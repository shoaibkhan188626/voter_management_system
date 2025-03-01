import voterSchema from "../schema/voterSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
  try {
    const voters = await voterSchema.find();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVoterById = async (req, res) => {
  try {
    const voter = await voterSchema.findOne({ voterId: req.params.voterId });
    if (!voter) return res.status(404).json({ message: "Voter not Found" });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getByHouseNo = async (req, res) => {
  try {
    let { gharNo } = req.body;
    if (!gharNo || typeof gharNo !== "string") {
      return res.status(400).json({ message: "gharNo must be a valid string" });
    }
    const voters = await voterSchema.find({ gharNo });
    if (voters.length === 0) {
      return res
        .status(404)
        .json({ message: "No voters are assocaited with this House Number" });
    }
    res.json(voters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const {
      gharNo,
      voterId,
      name,
      fatherName,
      age,
      address,
      gender,
      serialNumber,
      yadiSerial,
      amount,
      comment,
      updatedBy,
      photo,
    } = req.body;
    const newVoter = new voterSchema({
      name,
      fatherName,
      age,
      gender,
      gharNo,
      address,
      photo,
      voterId,
      yadiSerial,
      serialNumber,
      amount,
      updatedBy,
      comment,
    });
    await newVoter.save();
    res
      .status(200)
      .json({ message: "Voter Created Successfully", voter: newVoter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updateVoter = await voterSchema.findOneAndUpdate(
      { voterId: req.params.voterId },
      req.body,
      { new: true }
    );
    if (!updateVoter)
      return res.status(404).json({ message: "Voter not Found" });
    res.json(updateVoter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { voterId } = req.params;
    const deletedVoter = await voterSchema.findOneAndDelete({ voterId });
    if (!deletedVoter)
      return res.status(404).json({ message: "Voter Not Found" });
    res.json({ message: "Voter Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const { phoneNumber, name, voterId, gharNo } = req.body;
    const query = {};
    if (phoneNumber) query.phoneNumber = phoneNumber;
    if (name) query.name = new RegExp(name, "i");
    if (voterId) query.voterId = voterId;
    if (gharNo) query.gharNo = gharNo;
    const voter = await voterSchema.find(query);
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
