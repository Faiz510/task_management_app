import { Request, Response } from "express";
import User from "../model/userModal";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();

    res.status(201).json({
      status: "sucess",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "their is error in create user",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "sucess",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "their is error in create user",
    });
  }
};
