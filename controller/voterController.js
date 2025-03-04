import voterSchema from "../schema/voterSchema.js";

//for getting all the voters in the database
export const getAll = async (req, res) => {
  try {
    const voters = await voterSchema.find();
    res.status(200).json({ success: true, count: voters.length, voters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//for getting a particular voter by it's voter ID.
export const getVoterById = async (req, res) => {
  try {
    const voter = await voterSchema.findOne({ voterId: req.params.voterId });
    if (!voter)
      return res
        .status(404)
        .json({ success: false, message: "Voter not Found" });
    res.status(200).json({ success: true, voter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getByHouseNo = async (req, res) => {
  try {
    let { gharNo } = req.body;

    if (!gharNo || typeof gharNo !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "gharNo must be a valid string" });
    }

    const voters = await voterSchema.find({ gharNo });

    if (voters.length === 0) {
      return res
        .status(404)
        .json({ message: "No voters are assocaited with this House Number" });
    }

    res.status(200).json({ success: true, count: voters.length, voters });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const requiredFields = [
      "gharNo",
      "voterId",
      "name",
      "fatherName",
      "age",
      "address",
      "gender",
      "serialNumber",
      "yadiSerial",
      "amount",
      "comment",
      "updatedBy",
      "photo",
    ];

    // Check if any required field is missing
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // Proceed with voter creation
    const newVoter = new voterSchema(req.body);
    await newVoter.save();

    return res.status(201).json({
      success: true,
      message: "Voter created successfully",
      voter: newVoter,
    });
  } catch (error) {
    console.error("Error creating voter:", error);
    return res.status(500).json({ success: false, error: error.message });
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
      return res
        .status(404)
        .json({ success: false, message: "Voter not Found" });

    res.status(200).json({
      success: true,
      message: "voter Updated successfully",
      voter: updateVoter,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { voterId } = req.params;

    const deletedVoter = await voterSchema.findOneAndDelete({ voterId });
    if (!deletedVoter)
      return res
        .status(404)
        .json({ success: false, message: "Voter Not Found" });

    res
      .status(200)
      .json({ success: true, message: "Voter Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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

    if (!voter.length)
      return res
        .status(404)
        .json({ success: false, message: "no voters found" });
    res.status(200).json({ success: true, count: voter.length, voter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
