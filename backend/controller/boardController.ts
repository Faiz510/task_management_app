import mongoose from 'mongoose';
import Boards from '../model/boardModal';
import { userRequest } from '../types/authTypes';
import AppError from '../utils/AppError';
import catchAsyncHandler from '../utils/CatchAsyncHandler';

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
      status: 'sucess',
      board,
    });
  },
);

export const getBoards = catchAsyncHandler(async (req, res, next) => {
  const board = await Boards.find();

  res.status(200).json({
    status: 'sucess',
    board,
  });
});

export const getCurUserBoards = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const boards = await Boards.find({ userId: req.user?._id });

    res.status(200).json({
      status: 'sucess',
      boards,
    });
  },
);

export const getBoardById = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const board = await Boards.findById(id);

  if (!board) {
    return next(new AppError(400, 'board not found with this Id'));
  }

  res.status(200).json({
    status: 'sucess',
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
    return next(new AppError(400, 'board not found with this Id'));
  }

  res.status(200).json({
    status: 'sucess',
    message: 'baord deleted ',
  });
});

export const deleteBoard = catchAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const board = await Boards.findByIdAndDelete(id);

  if (!board) {
    return next(new AppError(400, 'board not found with this Id'));
  }

  res.status(200).json({
    status: 'sucess',
    message: 'baord deleted ',
  });
});

export const getBoardByStatus = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const UserId = req.user?._id;

    if (!UserId) {
      return next(new AppError(400, 'user not found with this id'));
    }

    // const boards = await Boards.aggregate([
    //   // { $match: { userId: UserId.toString() } },
    //   { $group: { _id: '$userId', count: { $sum: 1 } } },
    //   { $sort: { count: -1 } },
    //   { $limit: 2 },
    // ]);

    const boards = await Boards.aggregate([
      // stage 1 : match user id
      { $match: { userId: UserId.toString() } },
      // stage 2 : lookup to tasks
      {
        $lookup: {
          from: 'tasks',
          localField: 'tasks',
          foreignField: '_id',
          as: 'tasksDetails',
        },
      },
      // stage 3 : unwind task on base of columns
      { $unwind: { path: '$tasksDetails', preserveNullAndEmptyArrays: true } },

      // { $unwind: '$columns' },
    ]);

    res.status(200).json({
      status: 'sucess',
      boards,
    });
  },
);
