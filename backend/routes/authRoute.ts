import express from "express";
import {
  register,
  getUsers,
  login,
  protect,
  logout,
  deleteMe,
  updateMe,
} from "../controller/authController";

const router = express.Router();

router.route("/").get(protect, getUsers);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/deleteMe").delete(protect, deleteMe);
router.route("/updateMe").patch(protect, updateMe);

export default router;
