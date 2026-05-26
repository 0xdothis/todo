import express from 'express';
import type { Request, Response } from 'express';

import { router as todoRoute } from './routes/todoRoute';
import { get404 } from './controllers/error';
import { Todo } from './models/todo';
import { User } from './models/user';
import { sequelize } from './utils/database';

const app = express();

app.use(express.json());

app.use((req: Request, _: Response, next) => {
  User.findByPk(1)
    .then((user) => {
      if (!user) return;

      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

/**
app.use((req: Request, res: Response) => {
  res.json("Hello world")
})

*/

app.use(todoRoute);

app.use(get404);

User.hasMany(Todo, { onDelete: 'CASCADE' });
Todo.belongsTo(User, { constraints: true });

sequelize
  .sync()
  .then(() => {
    return User.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'max',
        email: 'max@test.com',
      },
    });
  })
  .then(([user]) => {
    // console.log(user)

    app.listen(4500);
    return user;
  })
  .catch((err) => {
    console.error(err);
  });
