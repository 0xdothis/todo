import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../utils/database';

export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare completed: CreationOptional<boolean>;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: 'todos' },
);

/** import { ResultSetHeader } from 'mysql2';
import type { TodoItem, CreateTodoBody, UpdateTodoBody } from '../types';
import { pool as db } from '../utils/database';

export class Todo {
  title: string;
  description: string;

  constructor(data: CreateTodoBody) {
    this.title = data.title;
    this.description = data.description;
  }

  async save(todo: CreateTodoBody): Promise<TodoItem> {
    const [result] = await db.execute<ResultSetHeader>(
      'INSERT INTO todo (title, description) VALUES (?, ?)',
      [todo.title, todo.description],
    );

    const [rows] = await db.execute<TodoItem[]>(
      'SELECT id, title, description, completed FROM todo_db.todo WHERE id = ?',
      [result.insertId],
    );

    if (!rows[0]) {
      throw new Error('Todo not inserted');
    }

    const data: TodoItem = rows[0];

    return data;
  }

  static async fetchTodos(): Promise<TodoItem[]> {
    const [todos] = await db.execute<TodoItem[]>(
      'SELECT id, title, description, completed FROM todo_db.todo',
    );

    return todos;
  }

  static async findById(id: string): Promise<TodoItem | null> {
    const [rows] = await db.execute<TodoItem[]>(
      'SELECT id, title, description, completed FROM todo_db.todo WHERE id = ?',
      [id],
    );

    if (!rows[0]) {
      return null;
    }

    const todo: TodoItem = rows[0];

    return todo;
  }

  static async deleteById(id: string): Promise<boolean> {
    const [result] = await db.execute<ResultSetHeader>('DELETE FROM todo_db.todo WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return false;
    }

    return result.affectedRows > 0;
  }

  static async updateTodo(id: string, updateData: UpdateTodoBody): Promise<TodoItem | null> {
    const [result] = await db.execute<ResultSetHeader>({
      sql: 'UPDATE todo SET title = ?, description = ?, completed = ? WHERE id = ?',
      values: [updateData.title, updateData.description, updateData.completed, id],
    });

    const [rows] = await db.execute<TodoItem[]>(
      'SELECT id, title, description, completed FROM todo_db.todo WHERE id = ?',
      [id],
    );

    console.log('result', result, 2);
    console.log('rows', rows[0], 2);

    if (!rows[0]) {
      throw new Error('Todo not found');
    }

    const updatedTodo: TodoItem = rows[0];

    return updatedTodo;
  }
}

*/
