import express from 'express';
import mongoose from 'mongoose';

import { router as todoRoute } from './routes/todoRoute';
import { get404 } from './controllers/error';
import User from './models/user';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(async (req, _, next) => {
  const user = await User.findById('6a240ac9f42e3d73565da5d0');

  if (user) {
    req.user = user;
  }

  next();
});

app.use(todoRoute);

app.use(get404);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    const user = new User({ name: 'daniel', email: 'daniel@test.com' });

    user.save();

    app.listen(4500);
  })
  .catch((err) => {
    console.error('Something went wrong ', err);
  });
