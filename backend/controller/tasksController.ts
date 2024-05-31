import Boards from "../model/boardModal";
import Tasks from "../model/taskModal";
import { userRequest } from "../types/authTypes";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";

export const createTask = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const { title, status, board } = req.body;

    const body = {
      title,
      status,
      board,
      userId: req.user?._id,
    };
    const task = await Tasks.create(body);

    // update in boards task Arr
    await Boards.findByIdAndUpdate(
      board,
      { $push: { tasks: task._id } },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: "sucess",
      task,
    });
  }
);

export const getBoardTask = catchAsyncHandler(async (req, res, next) => {
  const boardId = req.params.boardId;

  const board = await Boards.findOne({ _id: boardId });

  if (!board) {
    return next(new AppError(400, "board not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    tasks: board.tasks,
  });
});

export const getTaskById = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Tasks.findById(id);

  if (!task) {
    return next(new AppError(400, "task not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    task,
  });
});

export const updateTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { title, status, isCompleted } = req.body;
  const body = {
    title,
    status,
    isCompleted,
  };
  const task = await Tasks.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new AppError(400, "task not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    task,
  });
});

export const deleteTask = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Tasks.findByIdAndDelete(id);

  if (!task) {
    return next(new AppError(400, "task not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    message: "deleted task",
  });
});
