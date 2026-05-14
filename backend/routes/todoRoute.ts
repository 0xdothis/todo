import express, { type Router } from 'express';

import { getTodo, getTodos, postDeleteTodo, postTodo, postUpdateTodo } from '../controllers/todo';

export const router: Router = express.Router();

router.get('/todos', getTodos);

router.get('/todos/:todoId', getTodo);

router.post('/todos/create-todo', postTodo);

router.post('/todos/:todoId', postDeleteTodo);

router.post('/todos/:todoId', postUpdateTodo);
