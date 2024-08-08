import express from 'express';
import { protect } from '../controller/authController';
import {
  createSubTask,
  deleteSubTask,
  getSubtaskById,
  getTaskSubTasks,
  updateSubTask,
  updateSubtaskByIds,
} from '../controller/subTasksController';

const router = express.Router();

router.use(protect);

router.route('/task/:taskId').post(createSubTask).get(getTaskSubTasks);

router.route('/task/updatetaskByIds').patch(updateSubtaskByIds);

router
  .route('/:id')
  .get(getSubtaskById)
  .delete(deleteSubTask)
  .patch(updateSubTask);

export default router;
