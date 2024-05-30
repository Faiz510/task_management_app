import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else if (process.env.NODE_ENV === "production") {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    res.status(err.status).json({
      message: "something went wrong",
    });
  }
};

export default globalErrorHandler;
