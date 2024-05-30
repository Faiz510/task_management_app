import express from "express";
import { register, getUsers, login } from "../controller/authController";

const router = express.Router();

router.route("/").get(getUsers);

router.route("/register").post(register);

router.route("/login").post(login);

export default router;
