import SubTasks from '../model/subTaskModal';
import Tasks from '../model/taskModal';
import { CreateSubTasksRequest, SubTaskType } from '../types/subTaskTypes';
import AppError from '../utils/AppError';
import catchAsyncHandler from '../utils/CatchAsyncHandler';

export const createSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.taskId;

  const { subtasks }: CreateSubTasksRequest = req.body;
  const createdSubtasks = subtasks.subTask.map((subtask) => ({
    taskId: id,
    title: subtask.title,
    isActive: subtask.isActive,
  }));

  const subTask = await SubTasks.insertMany(createdSubtasks);

  const updatedTask = await Tasks.findByIdAndUpdate(
    id,
    { $push: { subTasks: subTask.map((task) => task._id) } },
    { new: true, runValidators: true },
  ).populate('subTasks');

  res.status(201).json({
    status: 'success',
    subTask,
    updatedTask,
  });
});

export const getTaskSubTasks = catchAsyncHandler(async (req, res, next) => {
  const taskId = req.params.taskId;

  const task = await Tasks.findOne({ _id: taskId });

  if (!task) {
    return next(new AppError(400, 'task is not with this id found'));
  }

  res.status(200).json({
    status: 'sucess',
    subTask: task.subTasks,
  });
});

export const getSubtaskById = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subtask = await SubTasks.findById(id);

  if (!subtask) {
    return next(new AppError(400, 'subtask is not with this id found'));
  }

  res.status(200).json({
    status: 'sucess',
    subtask,
  });
});

export const updateSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { title, isActive } = req.body;
  const subtask = await SubTasks.findByIdAndUpdate(
    id,
    { title, isActive },
    { new: true, runValidators: true },
  );

  if (!subtask) {
    return next(new AppError(400, 'subtask is not with this id found'));
  }

  res.status(200).json({
    status: 'sucess',
    subtask,
  });
});

export const updateSubtaskByIds = catchAsyncHandler(async (req, res, next) => {
  const { subtasks } = req.body;

  console.log(subtasks);

  const subtaskArr = subtasks.map((task: SubTaskType) => {
    return SubTasks.findByIdAndUpdate(task._id, task, {
      new: true,
      runValidators: true,
    });
  });

  const updatedSubtask = await Promise.all(subtaskArr);

  res.status(200).json({
    status: 'sucess',
    subtask: updatedSubtask,
  });
});

export const deleteSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subtask = await SubTasks.findByIdAndDelete(id);

  if (!subtask) {
    return next(new AppError(400, 'subtask is not with this id found'));
  }

  res.status(200).json({
    status: 'sucess',
    message: 'subtask deleted',
  });
});
