import express from "express";
import { adminLogin, adminSignup } from "../controller/adminController.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

export default router;
