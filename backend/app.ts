import express from "express";
import authRoute from "./routes/authRoute";
import globalErrorHandler from "./utils/globalErrorHandler";
import AppError from "./utils/AppError";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new AppError(400, `can not found ${req.originalUrl}`));
});

app.use(globalErrorHandler);

export default app;
