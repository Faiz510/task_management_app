import express from "express";
import { register, getUsers } from "../controller/authController";

const router = express.Router();

router.route("/").post(register).get(getUsers);

export default router;
