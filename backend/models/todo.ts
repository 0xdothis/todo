import type { TodoItem, CreateTodoBody, UpdateTodoBody } from '../types';

const todos: TodoItem[] = [];

export class Todo {
  readonly id: string;
  title: string;
  description: string;
  completed: boolean;

  constructor(data: CreateTodoBody) {
    this.id = crypto.randomUUID();
    this.title = data.title;
    this.description = data.description;
    this.completed = false;
  }

  async save(todo: TodoItem): Promise<TodoItem> {
    todos.push(todo);

    return todo;
  }

  static async fetchTodos(): Promise<TodoItem[]> {
    return todos;
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

    const deletedTodo = todos[todoIndex]!;

    todos.splice(todoIndex, 1);

    return deletedTodo;
  }

  static async updateTodo(id: string, updateData: UpdateTodoBody): Promise<TodoItem | null> {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    // const safeUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, value]) => value !== undefined)) as Partial<TodoItem>;

    todos[todoIndex] = { ...todos[todoIndex], ...updateData } as TodoItem;

    const updatedTodo = todos[todoIndex];

    return updatedTodo;
  }
}
