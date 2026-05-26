import type { Response, Request } from 'express';
import type { ApiResponse, ApiError } from '../@types/index';

export const get404 = async (_: Request, res: Response<ApiResponse<ApiError>>) => {
  return res.status(404).json({
    success: false,
    error: 'Page not found',
  });
};
