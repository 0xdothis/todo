import type { Response, Request } from 'express';
import { Types } from 'mongoose';
import type {
  ApiResponse,
  TodoItem,
  TodoParams,
  CreateTodoBody,
  UpdateTodoBody,
} from '../@types/index';
import Todo from '../models/todo';
import { ErrorHandler } from '../middleware/error';

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

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const todo = await Todo.findOne({ _id: todoId });

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

export const getTodos = async (_: Request, res: Response<ApiResponse<TodoItem[]>>) => {
  const todos = await Todo.find();

  //const isTodo = todos.some((todo) => todo.userId.toString() === userId?.toString());
  /**
  if (todos.length !== 0) {
    return res.status(401).json({
      success: false,
      message: 'login to access your todos',
    });
  }
  */

  return res.status(200).json({
    success: true,
    message: "todo's",
    data: todos,
    /** [
        {
          "id": 1,
          "title": "Cook beans",
          "description": "I cook my own beans"
        },
        {
          "id": 2,
          "title": "Walk the dog",
          "description": "Walk the dog around the neighborhood"
        },
        {
          "id": 3,
          "title": "Clean the house",
          "description": "make sure the mop every 48hours"
        },
        {
          "id": 4,
          "title": "Excersice",
          "description": "Go to the gym by 4pm"
        },
        {
          "id": 5,
          "title": "Webwinar confrence",
          "description": "Attend the webwinar confrence"
        },
      ],
      */
  });
};

export const postTodo = async (
  req: Request<never, never, CreateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todo = new Todo({ ...req.body });

  if (!todo) {
    throw new ErrorHandler({
      success: false,
      message: 'internal server error',
      statusCode: 500,
    });
  }

  const data = await todo.save();

  return res.status(201).json({
    success: true,
    message: 'todo created',
    data,
  });
};

export const deleteTodo = async (
  req: Request<TodoParams>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const todo = await Todo.findOneAndDelete({ _id: todoId });

  if (!todo) {
    throw new ErrorHandler({
      success: false,
      message: 'todo not found',
      statusCode: 404,
    });
  }

  return res.sendStatus(204);
};

export const patchUpdateTodo = async (
  req: Request<TodoParams, never, UpdateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  // const updateData = req.body;
  /**
    if(!["title", "description"].every(key => key in updateData)) {

      return res.status(400).json({
      status: 'Bad Request',
      statusCode: 400,
      error: {
        message: 'title or description cannot be empty'
      }

    })
    }
  */
  const todoId = req.params.todoId;

  if (!Types.ObjectId.isValid(todoId)) {
    throw new ErrorHandler({
      success: false,
      message: 'todoId is not valid',
      statusCode: 400,
    });
  }

  const { modifiedCount } = await Todo.updateOne({ _id: todoId }, { $set: req.body });

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
