import express, { type Router } from 'express';

import {
  getIndex,
  getTodo,
  getTodos,
  deleteTodo,
  postTodo,
  patchUpdateTodo,
} from '../controllers/todo';

export const router: Router = express.Router();

router.get('/', getIndex);

router.get('/todos', getTodos);

router.get('/todos/:todoId', getTodo);

router.post('/todos', postTodo);

router.delete('/todos/:todoId', deleteTodo);

router.patch('/todos/:todoId', patchUpdateTodo);
