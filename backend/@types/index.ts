import { InferAttributes } from 'sequelize';
import { Todo } from '../models/todo';
import { User } from '../models/user';

export type TodoItem = Omit<InferAttributes<Todo>, 'created_at' | 'updated_at'>;

export type UserType = Omit<InferAttributes<User>, 'created_at' | 'updated_at'>;

export type CreateTodoBody = {
  title: string;
  description: string;
};

export type UpdateTodoBody = Partial<CreateTodoBody> & {
  completed?: boolean;
};

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type TodoParams = { todoId: string };
