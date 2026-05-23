import type { Response, Request } from 'express';
import type {
  ApiResponse,
  TodoItem,
  TodoParams,
  CreateTodoBody,
  UpdateTodoBody,
} from '../types/index';
import { Todo } from '../models/todo';

const TODO_ATTRIBUTES: string[] = ['id', 'title', 'description', 'completed'];

export const getIndex = (_: Request, res: Response) => {
  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo list API',
  });
};

export const getTodo = async (req: Request<TodoParams>, res: Response<ApiResponse<TodoItem>>) => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).json({
      success: false,
      error: 'Todo id id required',
    });
  }

  const todo = await Todo.findByPk(todoId, { attributes: TODO_ATTRIBUTES });

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: todo.toJSON<TodoItem>(),
  });
};

export const getTodos = async (_: Request, res: Response<ApiResponse<TodoItem[]>>) => {
  const todos = await Todo.findAll({ attributes: TODO_ATTRIBUTES });

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
  const { title, description }: CreateTodoBody = req.body;

  const todo = (
    await Todo.create({
      title,
      description,
    })
  ).toJSON<Todo>();

  if (!todo) {
    return res.status(400).json({
      success: false,
      error: 'Something went wrong',
    });
  }

  return res.status(201).json({
    success: true,
    data: todo,
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

  const deleted = await Todo.destroy({ where: { id: todoId } });

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

  const [affectedRow] = await Todo.update(req.body, { where: { id: todoId } });

  if (affectedRow < 1) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found',
    });
  }

  const todo = await Todo.findByPk(todoId, { attributes: TODO_ATTRIBUTES });

  if (!todo) {
    return res.status(400).json({
      success: false,
      error: 'Something went wrong',
    });
  }

  return res.status(200).json({
    success: true,
    data: todo.toJSON<TodoItem>(),
  });
};
