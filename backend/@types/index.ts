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
  name: string;
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
  name: string;
  password: string;
  confirmPassword: string;
};

export type LoginBody = Omit<UserType, 'name' | '_id'>;

export interface AuthData {
  token?: string;
  userId?: ObjectId;
}

export type AuthUser = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export interface ApiSuccess<T> {
  success: true;
  message: string;
  totalTodos?: number;
  data?: T;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: object[];
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type TodoParams = { todoId: string };

export type TodoQuery = { page: string };
