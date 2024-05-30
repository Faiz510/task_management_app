import User from "../model/userModal";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";

export const getUsers = catchAsyncHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(201).json({
    status: "sucess",
    user,
  });
});

export const register = catchAsyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "sucess",
    user,
  });
});
