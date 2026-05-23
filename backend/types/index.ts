import { RowDataPacket } from 'mysql2';

export interface TodoItem extends RowDataPacket {
  readonly id: string;
  title: string;
  description: string;
  completed: boolean;
}

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
