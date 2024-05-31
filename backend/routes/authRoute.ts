import express from "express";
import {
  register,
  getUsers,
  login,
  protect,
  logout,
} from "../controller/authController";

const router = express.Router();

router.route("/").get(protect, getUsers);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

export default router;
