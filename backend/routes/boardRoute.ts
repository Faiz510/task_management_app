import express from "express";
import { protect } from "../controller/authController";
import {
  createBoards,
  deleteBoard,
  getBoardById,
  getBoards,
  getCurUserBoards,
  updateBoard,
} from "../controller/boardController";

const router = express.Router();

router.use(protect);

router.route("/").post(createBoards).get(getBoards);

router.route("/:id").delete(deleteBoard).get(getBoardById).patch(updateBoard);

router.route("/user/cur-user").get(getCurUserBoards);

export default router;
