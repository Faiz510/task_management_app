import express from "express";
import authRoute from "./routes/authRoute";
import globalErrorHandler from "./utils/globalErrorHandler";
import AppError from "./utils/AppError";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new AppError(400, `can not found ${req.originalUrl}`));
});

app.use(globalErrorHandler);

export default app;
