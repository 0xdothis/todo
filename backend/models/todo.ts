import { ObjectId, InsertOneResult } from 'mongodb';
import type { TodoItem, CreateTodoBody, UpdateTodoBody } from '../@types';
import { getDb } from '../utils/database';

export class Todo {
  title: string;
  description: string;
  userId: ObjectId;
  completed: boolean;

  constructor(data: CreateTodoBody) {
    this.title = data.title;
    this.description = data.description;
    this.userId = data.userId;
    this.completed = false;
  }

  async save(todo: TodoItem): Promise<TodoItem> {
    const db = getDb();

    const result: InsertOneResult<TodoItem> = await db.collection('todos').insertOne(todo);

    const todoItem = { _id: result.insertedId, ...todo };

    console.log(todoItem);

    return todoItem;
  }

  static async fetchTodos(): Promise<TodoItem[]> {
    const db = getDb();

    const todos: TodoItem[] = await db.collection<TodoItem>('todos').find({}).toArray();
    console.log(todos);

    return todos;
  }

  static async findById(id: string): Promise<TodoItem | null> {
    const db = getDb();

    const todo = await db.collection<TodoItem>('todos').findOne({ _id: new ObjectId(id) });

    if (!todo) return null;

    return todo;
  }

  static async deleteById(id: string): Promise<boolean | null> {
    const db = getDb();

    const { deletedCount } = await db
      .collection<TodoItem>('todos')
      .deleteOne({ _id: new ObjectId(id) });

    if (deletedCount < 1) return null;

    return true;
  }

  static async updateTodo(id: string, updateData: UpdateTodoBody): Promise<TodoItem | null> {
    const db = getDb();

    const { matchedCount } = await db
      .collection<TodoItem>('todos')
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...updateData } });

    if (matchedCount < 1) return null;

    const updatedTodo = await db.collection<TodoItem>('todos').findOne({ _id: new ObjectId(id) });

    return updatedTodo;
  }
}
