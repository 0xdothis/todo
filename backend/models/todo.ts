import type { TodoType } from '../types';

const todos: TodoType[] = [];

export class Todo {
  id: number;
  title: string;
  description: string;

  constructor({ id, title, description }: TodoType) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  save() {
    todos.push(this);

    return {
      status: 'OK',
      statusCode: 200,
      message: 'Todo Created Succefully',
    };
  }

  static fetchTodos() {
    return todos;
  }

  static findById(id: number) {
    const todo = todos.find((t) => t.id === id);

    return todo;
  }

  static deleteById(id: number) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    todos.splice(todoIndex, 1);

    return todos;
  }

  static updateTodo({ id, title, description }: TodoType) {
    if (!id)
      return {
        status: 'Not Found',
        statusCode: 404,
        message: 'Todo id not found',
      };

    if (title.trim() === '' || description.trim() === '') {
      return {
        status: 'Bad Request',
        statusCode: 400,
        message: 'title or description can not be empty',
      };
    }

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    todos[todoIndex] = { id, title, description };

    return {
      status: 'OK',
      statusCode: 200,
      message: 'Todo Created Succefully',
      data: [todos[todoIndex]],
    };
  }
}
