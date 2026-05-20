import type { Request } from 'express';

export type TodoItem = {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
};

export type CreateTodoItem = {
  title: string;
  description: string;
  completed: boolean;
};

export type TodoSuccess<T> = {
  status: string;
  statusCode: number;
  data: T;
};

export type TodoError = {
  status: string;
  statusCode: number;
  error: {
    message: string;
  };
};

export type TodoResponse<T> = TodoSuccess<T> | TodoError;

export type GetTodoParams = { todoId: string };

export type CreateTodoItemRequest = Request<
  GetTodoParams, // params
  object, // response
  CreateTodoItem // request body
>;
