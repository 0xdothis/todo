import type { TodoStatus, TodoType } from '../types';

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

  save(): TodoStatus {
    todos.push(this);

    console.log(this);

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

    console.log(todo);

    return todo;
  }
}
