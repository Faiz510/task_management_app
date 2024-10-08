import express from 'express';
import authRoute from './routes/authRoute';
import boardRoute from './routes/boardRoute';
import taskRoute from './routes/tasksRoute';
import subTaskRoute from './routes/subTaskRoute';
import globalErrorHandler from './utils/globalErrorHandler';
import AppError from './utils/AppError';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/board', boardRoute);
app.use('/api/v1/task', taskRoute);
app.use('/api/v1/sub-task', subTaskRoute);

app.all('*', (req, res, next) => {
  next(new AppError(400, `can not found ${req.originalUrl}`));
});

app.use(globalErrorHandler);

export default app;
