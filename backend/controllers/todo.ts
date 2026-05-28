import type { Response, Request } from 'express';
import type {
  ApiResponse,
  TodoItem,
  TodoParams,
  CreateTodoBody,
  UpdateTodoBody,
} from '../@types/index';
import { Todo } from '../models/todo';
import { ObjectId } from 'mongodb';

export const getIndex = (_: Request, res: Response) => {
  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo list API',
  });
};

export const getTodo = async (req: Request<TodoParams>, res: Response<ApiResponse<TodoItem>>) => {
  const todoId = req.params.todoId;

  const todo = await Todo.findById(todoId);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: todo,
  });
};

export const getTodos = async (_: Request, res: Response<ApiResponse<TodoItem[]>>) => {
  const todos = await Todo.fetchTodos();

  if (!todos) {
    return res.status(404).json({
      success: false,
      error: "Todo's array is empty",
    });
  }

  return res.status(200).json({
    success: true,
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
  const userId = new ObjectId(req.user._id);

  const todo = new Todo({ ...req.body, userId });

  if (!todo) {
    return res.status(503).json({
      success: false,
      error: 'Something went wrong',
    });
  }

  const data = await todo.save(todo);

  return res.status(201).json({
    success: true,
    data,
  });
};

export const deleteTodo = async (
  req: Request<TodoParams>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  const todo = await Todo.deleteById(todoId);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  return res.sendStatus(204);
};

export const patchUpdateTodo = async (
  req: Request<TodoParams, never, UpdateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

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

  const updatedTodo = await Todo.updateTodo(todoId, req.body);

  if (!updatedTodo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: updatedTodo,
  });
};
