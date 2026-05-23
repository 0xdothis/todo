import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('todo_db', 'todo', 'todo', {
  dialect: 'mysql',
  host: 'localhost',
});
