import Boards from "../model/boardModal";
import { userRequest } from "../types/authTypes";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";

export const createBoards = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const { title, columns, description, tasks } = req.body;

    const body = {
      title,
      columns,
      description,
      tasks,
      userId: req.user?._id,
    };
    const board = await Boards.create(body);

    res.status(201).json({
      status: "sucess",
      board,
    });
  }
);

export const getBoards = catchAsyncHandler(async (req, res, next) => {
  const board = await Boards.find();

  res.status(200).json({
    status: "sucess",
    board,
  });
});

export const getCurUserBoards = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const boards = await Boards.find({ userId: req.user?._id });

    res.status(200).json({
      status: "sucess",
      boards,
    });
  }
);

export const getBoardById = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const board = await Boards.findById(id);

  if (!board) {
    return next(new AppError(400, "board not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    board,
  });
});

export const updateBoard = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const board = await Boards.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!board) {
    return next(new AppError(400, "board not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    message: "baord deleted ",
  });
});

export const deleteBoard = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const board = await Boards.findByIdAndDelete(id);

  if (!board) {
    return next(new AppError(400, "board not found with this Id"));
  }

  res.status(200).json({
    status: "sucess",
    message: "baord deleted ",
  });
});
