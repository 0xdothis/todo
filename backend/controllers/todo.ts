import type { Response, Request } from 'express';
import type { TodoResponse, TodoStatus } from '../types/index';

export const getTodo = (req: Request, res: Response): Response<TodoResponse> => {
  return res.json({
    status: 'ok',
    statusCode: 200,
    data: {
      todos: [
        {
          id: 1,
          title: 'Cook beans',
          description: 'I cook my own beans',
        },
      ],
    },
  });
};

export const getTodos = (req: Request, res: Response): Response<TodoResponse> => {
  return res.json({
    status: 'ok',
    statusCode: 200,
    data: {
      todos: [
        {
          id: 1,
          title: 'Cook beans',
          description: 'I cook my own beans',
        },
        {
          id: 2,
          title: 'Walk the dog',
          description: 'Walk the dog around the neighborhood',
        },
        {
          id: 3,
          title: 'Clean the house',
          description: 'make sure the mop every 48hours',
        },
        {
          id: 4,
          title: 'Excersice',
          description: 'Go to the gym by 4pm',
        },
        {
          id: 5,
          title: 'Webwinar confrence',
          description: 'Attend the webwinar confrence',
        },
      ],
    },
  });
};

export const postTodo = (req: Request, res: Response): Response<TodoStatus> => {
  return res.json({
    status: 'ok',
    statusCode: 200,
    message: 'Todo created succesfully',
  });
};

export const postDeleteTodo = (req: Request, res: Response): Response<TodoStatus> => {
  return res.json({
    status: 'ok',
    statusCode: 200,
    message: 'Todo deleted succesfully',
  });
};

export const postUpdateTodo = (req: Request, res: Response): Response<TodoStatus> => {
  return res.json({
    status: 'ok',
    statusCode: 200,
    message: 'Todo updated succesfully',
  });
};
