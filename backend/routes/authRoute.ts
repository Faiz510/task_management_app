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

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.use(protect); // applied to all routes below

router.route("/").get(getUsers);

router.route("/deleteMe").delete(deleteMe);
router.route("/updateMe").patch(updateMe);

export default router;
