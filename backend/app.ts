import express from 'express';

import { router as todoRoute } from './routes/todoRoute';
import { get404 } from './controllers/error';

const app = express();

app.use(express.json());

/**
app.use((req: Request, res: Response) => {
  res.json("Hello world")
})

*/

app.use(todoRoute);

app.use(get404);

app.listen(4500);
