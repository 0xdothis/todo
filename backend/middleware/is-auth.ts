import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse, ApiError } from '../@types';

export default (req: Request, res: Response<ApiResponse<ApiError>>, next: NextFunction) => {
  const isLoggedIn = req.session.isLoggedIn;

  if (!isLoggedIn) {
    return res.status(401).json({
      success: false,
      error: 'Authorization failed, Kindly login',
    });
  }

  return next();
};
