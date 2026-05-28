import express from 'express';

import { router as todoRoute } from './routes/todoRoute';
import { get404 } from './controllers/error';
import { mongoConnect } from './utils/database';
import { User } from './models/user';

const app = express();

app.use(express.json());

/**
app.use((req: Request, res: Response) => {
  res.json("Hello world")
})

*/

app.use(async (req, _, next) => {
  const user = await User.findById('6a18176fcb96332a2eab9969');

  if (user) {
    req.user = user;
  }

  next();
});

app.use(todoRoute);

app.use(get404);

mongoConnect(() => {
  app.listen(4500);
});
