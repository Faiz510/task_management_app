import { NextFunction, Request, Response } from "express";

type asyncHandlerType = {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
};

const catchAsyncHandler = (handler: asyncHandlerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};

export default catchAsyncHandler;
