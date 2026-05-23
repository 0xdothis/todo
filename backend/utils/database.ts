import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'todo',
  database: 'todo_db',
  password: 'todo',
});
