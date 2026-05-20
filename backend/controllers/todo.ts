import type { Response, Request } from 'express';
import type { TodoResponse, CreateTodoItemRequest, TodoItem } from '../types/index';
import { Todo } from '../models/todo';

export const getIndex = (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'OK',
    statusCode: 200,
    message: 'Todo list API',
  });
};

export const getTodo = async (
  req: CreateTodoItemRequest,
  res: Response<TodoResponse<TodoItem>>,
): Promise<Response<TodoResponse<TodoItem>>> => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      throw new Error();
    }

    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      data: todo,
    });
  } catch {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      error: {
        message: 'Todo not found',
      },
    });
  }
};

export const getTodos = async (
  req: Request,
  res: Response<TodoResponse<TodoItem[]>>,
): Promise<Response<TodoResponse<TodoItem[]>>> => {
  try {
    const todos = await Todo.fetchTodos();

    if (!todos) {
      throw new Error();
    }

    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
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
  } catch {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      error: {
        message: "Todo's array is empty",
      },
    });
  }
};

export const postTodo = async (
  req: CreateTodoItemRequest,
  res: Response<TodoResponse<TodoItem>>,
): Promise<Response<TodoResponse<TodoItem>>> => {
  try {
    const todo = new Todo(req.body);

    todo.save();

    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      data: todo,
    });
  } catch {
    return res.status(503).json({
      status: 'Internal Server Error',
      statusCode: 503,
      error: {
        message: 'Something went wrong',
      },
    });
  }
};

export const deleteTodo = async (
  req: CreateTodoItemRequest,
  res: Response<TodoResponse<TodoItem>>,
): Promise<Response<TodoResponse<TodoItem>>> => {
  try {
    const todoId = req.params.todoId;

    if (!todoId) {
      throw new Error();
    }

    const todo = await Todo.deleteById(todoId);

    if (!todo) {
      throw new Error();
    }

    return res.status(204).json({
      status: 'No Content',
      statusCode: 204,
      data: todo,
    });
  } catch {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      error: {
        message: 'Todo not found',
      },
    });
  }
};

export const patchUpdateTodo = async (
  req: CreateTodoItemRequest,
  res: Response<TodoResponse<TodoItem>>,
): Promise<Response<TodoResponse<TodoItem>>> => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      throw new Error();
    }
    console.log(typeof todoId);

    if (todoId !== todo.id) {
      console.log('where is the error');
      throw new Error();
    }

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
    const updatedTodo = await Todo.updateTodo(todoId, { ...req.body });

    return res.status(204).json({
      status: 'No Content',
      statusCode: 204,
      data: updatedTodo!,
    });
  } catch {
    return res.status(404).json({
      status: 'Not Found',
      statusCode: 404,
      error: {
        message: 'Todo not found',
      },
    });
  }
};
