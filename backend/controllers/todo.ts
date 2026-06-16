import type { Response, Request } from 'express';
import { Types } from 'mongoose';
import type {
  ApiResponse,
  TodoItem,
  TodoParams,
  CreateTodoBody,
  UpdateTodoBody,
  TodoQuery,
} from '../@types/index';
import Todo from '../models/todo';
import User from '../models/user';
import { ErrorHandler } from '../middleware/error';
import 'dotenv/config';

export const getIndex = (_: Request, res: Response) => {
  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo list API',
  });
};

export const getTodo = async (
  req: Request<TodoParams>,
  res: Response<ApiResponse<TodoItem | null>>,
) => {
  const todoId = req.params.todoId;

  if (!req.user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 401,
      message: 'kindly login to access your todo',
    });
  }

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const todo = await Todo.findOne({ _id: todoId, userId: req.user.userId });

  if (!todo) {
    throw new ErrorHandler({
      success: false,
      message: 'todo not found',
      statusCode: 404,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'todo',
    data: todo,
  });
};

export const getTodos = async (
  req: Request<never, never, never, TodoQuery>,
  res: Response<ApiResponse<TodoItem[]>>,
) => {
  if (!req.user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 401,
      message: 'kindly login to access your todo',
    });
  }

  const totalTodos = await Todo.find({ userId: req.user.userId }).countDocuments();
  const page = +req.query.page || 1;
  const perPage = Number(process.env.TODO_PER_PAGE);

  const todos = await Todo.find({ userId: req.user.userId })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return res.status(200).json({
    success: true,
    message: 'todos',
    data: todos,
    totalTodos,
  });
};

export const postTodo = async (
  req: Request<never, never, CreateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  if (!req.user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 401,
      message: 'kindly login to create todo',
    });
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 422,
      message: 'user not authenticated, kindly login',
    });
  }

  const todo = new Todo({ ...req.body, userId: user._id });

  if (!todo) {
    throw new ErrorHandler({
      success: false,
      message: 'internal server error',
      statusCode: 500,
    });
  }

  const data = await todo.save();

  user.todos.push(data._id);

  await user.save();

  return res.status(201).json({
    success: true,
    message: 'todo created successfully',
    data,
  });
};

export const deleteTodo = async (
  req: Request<TodoParams>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

  if (!req.user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 401,
      message: 'kindly login to access your todo',
    });
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 422,
      message: 'user not authenticated, kindly login',
    });
  }

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const todo = await Todo.findOneAndDelete({ _id: todoId, userId: req.user.userId });

  if (!todo) {
    throw new ErrorHandler({
      success: false,
      message: 'todo not found',
      statusCode: 404,
    });
  }

  await User.findByIdAndUpdate(req.user.userId, { $pull: { todos: todoId } });

  return res.sendStatus(204);
};

export const patchUpdateTodo = async (
  req: Request<TodoParams, never, UpdateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

  if (!req.user) {
    throw new ErrorHandler({
      success: false,
      statusCode: 401,
      message: 'kindly login to access your todo',
    });
  }

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const { modifiedCount } = await Todo.updateOne(
    { _id: todoId, userId: req.user.userId },
    { $set: req.body },
  );

  if (modifiedCount < 1) {
    throw new ErrorHandler({
      success: false,
      message: 'todo not found',
      statusCode: 404,
    });
  }

  const updatedTodo = await Todo.findById(todoId);

  return res.status(200).json({
    success: true,
    message: 'todo updated successfully',
    data: updatedTodo!,
  });
};
