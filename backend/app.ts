import express, { Request, Errback, Response, NextFunction } from "express";
import authRoute from "./routes/authRoute";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  //   console.log(err);
  res.status(400).json({
    message: err,
  });
});

export default app;
