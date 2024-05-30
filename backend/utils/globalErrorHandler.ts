import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.message = err.message || "error found";
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.stack = err.stack;

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "development") {
    res.status(err.statusCode).json({
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else if (nodeEnv === "production") {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(err.status).json({
      message: err.message || "something went wrong",
    });
  }
};

export default globalErrorHandler;
