import type { Response, Request } from 'express';
import type { TodoResponse, TodoStatus } from '../types/index';
import { Todo } from '../models/todo';

export const getIndex = (req: Request, res: Response): Response<TodoStatus> => {
  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo list API',
  });
};

export const getTodo = (req: Request, res: Response): Response<TodoResponse | TodoStatus> => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 400,
      message: 'todo id not found',
    });
  }

  const todo = Todo.findById(Number(todoId));

  if (!todo) {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      message: 'todo id not found',
    });
  }

  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    data: {
      todos: [todo],
    },
  });
};

export const getTodos = (req: Request, res: Response): Response<TodoResponse> => {
  const todos = Todo.fetchTodos();

  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    data: {
      todos,
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
    },
  });
};

export const postTodo = (req: Request, res: Response): Response<TodoStatus> => {
  console.log(req.body);
  const todo = new Todo(req.body);

  todo.save();

  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo created succesfully',
    data: todo,
  });
};

export const postDeleteTodo = (req: Request, res: Response): Response<TodoStatus> => {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 400,
      message: 'todo id not found',
    });
  }

  const todos = Todo.deleteById(Number(todoId));

  if (!todos) {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      message: 'todo id not found',
    });
  }

  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo deleted succesfully',
  });
};

export const postUpdateTodo = (req: Request, res: Response): Response<TodoStatus> => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;

  if (Number(todoId) !== updatedTodo.id) {
    return res.status(400).json({
      status: 'Bad Request',
      statusCode: 400,
      message: "Todo Id can't be modified or changed",
    });
  }

  const todo = Todo.updateTodo({ ...updatedTodo });

  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo updated succesfully',
    data: todo,
  });
};
