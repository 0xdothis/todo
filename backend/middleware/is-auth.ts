import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse, ApiError } from '../@types';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error';
import 'dotenv/config';
import { JwtPayload } from 'jsonwebtoken';

export default async (req: Request, _: Response<ApiResponse<ApiError>>, next: NextFunction) => {
  const token = req.get('Authorization');
  const secret = process.env.JWT_SECRET;

  if (!token) {
    throw new ErrorHandler({
      success: false,
      message: 'not authenticated, kindly login in',
      statusCode: 401,
    });
  }

  const authToken = token.split(' ')[1];

  if (!authToken) {
    throw new ErrorHandler({
      success: false,
      message: 'invalid token format',
      statusCode: 422,
    });
  }

  if (!secret) {
    throw new ErrorHandler({
      success: false,
      message: 'secret is not defined',
      statusCode: 422,
    });
  }

  jwt.verify(authToken, secret, (err, decoded) => {
    if (err) {
      throw new ErrorHandler({
        success: false,
        message: err.message,
        statusCode: 400,
      });
    }

    if (!decoded) {
      throw new ErrorHandler({
        success: false,
        message: 'user is not authenticated',
        statusCode: 401,
      });
    }

    req.user = decoded as JwtPayload;
  });

  next();
};
