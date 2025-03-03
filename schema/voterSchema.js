import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    photo: { type: String, required: true },
    voterId: { type: String, required: true, unique: true },
    gharNo: { type: String, required: true },
    address: { type: String, required: true },
    serialNumber: { type: String, required: true },
    yadiSerial: { type: String, required: true },
    amount: { type: String, required: true },
    comment: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Voter", voterSchema);
