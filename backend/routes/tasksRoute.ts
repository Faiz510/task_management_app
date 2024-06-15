import express from 'express';
import { protect } from '../controller/authController';
import {
  createTask,
  deleteTask,
  getBoardTask,
  getTaskById,
  taskByCol,
  updateTask,
} from '../controller/tasksController';

const router = express.Router();

router.use(protect);

router.route('/').post(createTask);

router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);

router.route('/tasks-by-col/:boardId').get(taskByCol);

router.route('/board/:boardId').get(getBoardTask); // get all tasks from board

export default router;
