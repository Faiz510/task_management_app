import express from 'express';
import { protect } from '../controller/authController';
import {
  createBoards,
  deleteBoard,
  getBoardById,
  getBoardByStatus,
  getBoards,
  getCurUserBoards,
  updateBoard,
} from '../controller/boardController';

const router = express.Router();

router.use(protect);

router.route('/').post(createBoards).get(getBoards);

router.route('/:id').delete(deleteBoard).get(getBoardById).patch(updateBoard);

router.route('/user/cur-user').get(getCurUserBoards);

router.route('/user/board-by-status').get(getBoardByStatus);

export default router;
