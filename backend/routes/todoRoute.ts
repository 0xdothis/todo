import express, { type Router } from 'express';

import {
  getIndex,
  getTodo,
  getTodos,
  deleteTodo,
  postTodo,
  patchUpdateTodo,
} from '../controllers/todo';

import isAuth from '../middleware/is-auth';

const router: Router = express.Router();

router.get('/', getIndex);

router.get('/todos', isAuth, getTodos);

router.get('/todo/:todoId', isAuth, getTodo);

router.post('/todo', isAuth, postTodo);

router.delete('/todo/:todoId', isAuth, deleteTodo);

router.patch('/todo/:todoId', isAuth, patchUpdateTodo);

export default router;
