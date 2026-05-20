import type { Response, Request } from 'express';
import type { TodoError, TodoResponse } from '../types/index';

export const get404 = async (
  req: Request,
  res: Response<TodoResponse<TodoError>>,
): Promise<Response<TodoResponse<TodoError>>> => {
  return res.status(404).json({
    status: 'Not Found',
    statusCode: 404,
    error: { message: 'Page not found' },
  });
};
