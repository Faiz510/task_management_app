import SubTasks from "../model/subTaskModal";
import Tasks from "../model/taskModal";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";

export const createSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.taskId;
  const subTask = await SubTasks.create({ title: req.body.title, taskId: id });

  await Tasks.findByIdAndUpdate(
    id,
    { $push: { subTasks: subTask._id } },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    status: "sucess",
    subTask,
  });
});

export const getTaskSubTasks = catchAsyncHandler(async (req, res, next) => {
  const taskId = req.params.taskId;

  const task = await Tasks.findOne({ _id: taskId });

  if (!task) {
    return next(new AppError(400, "task is not with this id found"));
  }

  res.status(200).json({
    status: "sucess",
    subTask: task.subTasks,
  });
});

export const getSubtaskById = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subtask = await SubTasks.findById(id);

  if (!subtask) {
    return next(new AppError(400, "subtask is not with this id found"));
  }

  res.status(200).json({
    status: "sucess",
    subtask,
  });
});

export const updateSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { title, isActive } = req.body;
  const subtask = await SubTasks.findByIdAndUpdate(
    id,
    { title, isActive },
    { new: true, runValidators: true }
  );

  if (!subtask) {
    return next(new AppError(400, "subtask is not with this id found"));
  }

  res.status(200).json({
    status: "sucess",
    subtask,
  });
});

export const deleteSubTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subtask = await SubTasks.findByIdAndDelete(id);

  if (!subtask) {
    return next(new AppError(400, "subtask is not with this id found"));
  }

  res.status(200).json({
    status: "sucess",
    message: "subtask deleted",
  });
});
