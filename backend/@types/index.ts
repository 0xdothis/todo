import { ObjectId } from 'mongodb';

export type TodoItem = {
  readonly _id?: ObjectId;
  title: string;
  description: string;
  completed: boolean;
};

export type UserType = {
  readonly _id?: ObjectId;
  name: string;
  email: string;
};

export type CreateTodoBody = {
  title: string;
  description: string;
  userId: ObjectId;
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
