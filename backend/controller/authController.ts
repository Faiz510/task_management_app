import { NextFunction, Request, Response } from "express";
import User from "../model/userModal";
import AppError from "../utils/AppError";
import catchAsyncHandler from "../utils/CatchAsyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userRequest } from "../types/authTypes";

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

export const protect = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const token = req.cookies.task_jwt;
    if (!token || token === undefined) {
      return next(new AppError(400, "invalid token. plz login"));
    }

    if (process.env.JWT_SECRET_KEY === undefined) {
      return next(new AppError(400, "invalid secrete key "));
    }

    interface decodedType {
      id: string;
      iat: number;
      exp: number;
    }

    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    ) as decodedType;

    const currentUser = await User.findById({ _id: decoded?.id });

    if (!currentUser) {
      return next(new AppError(400, "you are logout"));
    }

    req.user = currentUser;

    next();
  }
);

export const logout = catchAsyncHandler(async (req, res, next) => {
  res.cookie("task_jwt", "").status(200).json({
    message: "you logout",
  });
});

///////////
export const deleteMe = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    // console.log(req.user);
    const id = req.user?._id;

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({
      status: "sucess",
      message: "your account has been deleted",
    });
  }
);

export const updateMe = catchAsyncHandler(
  async (req: userRequest, res, next) => {
    const id = req.user?.id;

    const user = await User.findById(id);
    if (!user) {
      return next(new AppError(400, "user not found "));
    }
    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user?.email;

    await user?.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "sucess",
      message: "your account detials updated",
    });
  }
);
