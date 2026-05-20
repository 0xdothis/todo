import type { TodoItem, CreateTodoItem } from '../types';

const todos: TodoItem[] = [];

export class Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;

  constructor({ title, description }: CreateTodoItem) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  async save(): Promise<string> {
    todos.push(this);

    return 'todo created successfully';
  }

  static async fetchTodos(): Promise<TodoItem[] | null> {
    return todos || null;
  }

  static async findById(id: string): Promise<TodoItem | null> {
    const todo = todos.find((t) => t.id === id);

    return todo || null;
  }

  static async deleteById(id: string): Promise<TodoItem | null> {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    todos.splice(todoIndex, 1);

    const deletedTodo = todos[todoIndex]!;

    return deletedTodo;
  }

  static async updateTodo(
    id: string,
    { title, description, completed }: CreateTodoItem,
  ): Promise<TodoItem | null> {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    todos[todoIndex] = { id, title, description, completed };

    const updatedTodo = todos[todoIndex];

    return updatedTodo;
  }
}
