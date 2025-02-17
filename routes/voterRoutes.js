import express from "express";
import {
  getAll,
  getByHouseNo,
  getVoterById,
  create,
  update,
  remove,
  search,
} from "../controller/voterController.js";
import { verifyAdmin } from "../middleware/authMiddlewre.js";
const router = express.Router();


router.get("/getAll", verifyAdmin, getAll);
router.get("/getByVoterId/:voterId", verifyAdmin, getVoterById);
router.get("/getByHouseNo", verifyAdmin, getByHouseNo);
router.post("/create", verifyAdmin, create);
router.put("/update/:voterId", verifyAdmin, update);
router.delete("/delete/:voterId", verifyAdmin, remove);
router.post("/search", verifyAdmin, search);
export default router;