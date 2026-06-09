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

router.get('/todos/:todoId', isAuth, getTodo);

router.post('/todos', isAuth, postTodo);

router.delete('/todos/:todoId', isAuth, deleteTodo);

router.patch('/todos/:todoId', isAuth, patchUpdateTodo);

export default router;
