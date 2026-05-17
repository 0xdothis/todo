import type { Response, Request } from 'express';
import type { TodoStatus } from '../types/index';

export const get404 = (req: Request, res: Response): Response<TodoStatus> => {
  return res.status(404).json({
    status: 'Not Found',
    statusCode: 404,
    message: 'Page not found',
  });
};
