import express, { type Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import todoRoute from './routes/todoRoute';
import authRoute from './routes/auth';
import 'dotenv/config';
import { ErrorHandler } from './middleware/error';
import { ApiResponse } from './@types';

const app = express();

app.use(express.json());

// handle cors related issues
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(todoRoute);
app.use(authRoute);

app.use((error: unknown, _: Request, res: Response<ApiResponse<never>>, next: NextFunction) => {
  if (error instanceof ErrorHandler) {
    const { success, message, errors, statusCode } = error;

    res.status(error.statusCode).json({
      success,
      statusCode,
      message,
      errors,
    });
  }
  next();
});

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(4500);
  })
  .catch((err) => {
    console.error('Something went wrong ', err);
  });
