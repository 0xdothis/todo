import type { Response, Request } from 'express';
import type {
  ApiResponse,
  TodoItem,
  TodoParams,
  CreateTodoBody,
  UpdateTodoBody,
} from '../types/index';
import { Todo } from '../models/todo';

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
  });
};

export const postTodo = async (
  req: Request<never, never, CreateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todo = new Todo(req.body);

  if (!todo) {
    return res.status(400).json({
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

export const deleteTodo = async (req: Request<TodoParams>, res: Response<ApiResponse<null>>) => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      error: 'Todo id is required',
    });
  }

  const deleted = await Todo.deleteById(todoId);

  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }

  return res.status(204).send();
};

export const patchUpdateTodo = async (
  req: Request<TodoParams, never, UpdateTodoBody>,
  res: Response<ApiResponse<TodoItem>>,
) => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      error: 'Todo id is required',
    });
  }

  const updatedTodo = await Todo.updateTodo(todoId, req.body);

  console.log(updatedTodo);

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
