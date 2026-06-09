import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongoDB from 'connect-mongodb-session';

import todoRoute from './routes/todoRoute';
import authRoute from './routes/auth';
import { get404 } from './controllers/error';
import User from './models/user';
import 'dotenv/config';

const app = express();

const MongoDBStore = connectMongoDB(session);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || '',
  collection: 'sessions',
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

app.use(async (req, _, next) => {
  const userResponse = req.session.user;

  if (!userResponse) {
    return next();
  }

  const user = await User.findById(userResponse._id).select('-password');

  if (user) {
    req.user = user;
  }

  next();
});

app.use(todoRoute);
app.use(authRoute);

app.use(get404);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(4500);
  })
  .catch((err) => {
    console.error('Something went wrong ', err);
  });
