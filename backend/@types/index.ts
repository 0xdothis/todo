import { ObjectId } from 'mongodb';

export type TodoItem = {
  readonly _id?: ObjectId;
  title: string;
  description: string;
  completed: boolean;
};

export type UserType = {
  readonly _id?: ObjectId;
  email: string;
  password: string;
};

export type CreateTodoBody = {
  title: string;
  description: string;
  userId: ObjectId;
};

export type UserData = {
  readonly _id?: string;
  email: string;
};

export type UpdateTodoBody = Partial<CreateTodoBody> & {
  completed?: boolean;
};

export type SignupBody = {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
}

export interface AuthSuccess {
  success: true;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError | AuthSuccess;

export type TodoParams = { todoId: string };
