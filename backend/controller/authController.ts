import User from "../model/userModal";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";
import jwt from "jsonwebtoken";

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

export const login = catchAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError(400, "user not found with email"));
  }

  const correctPassword = await user.correctPassword(password, user.password);

  if (!correctPassword) {
    return next(
      new AppError(400, "password not correct.plz enter correct password")
    );
  }

  const secreteKey = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (secreteKey === undefined) {
    return next(new AppError(400, "secret key is undefined"));
  }

  const token = jwt.sign({ id: user?._id }, secreteKey, {
    expiresIn: expiresIn,
  });

  res
    .cookie("task_jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    })
    .status(200)
    .json({
      user,
    });
});
