import express from 'express';

import { router as todoRoute } from './routes/todoRoute';

const app = express();

/**
app.use((req: Request, res: Response) => {
  res.json("Hello world")
})

*/

app.use(todoRoute);

app.listen(4500);
