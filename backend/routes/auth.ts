import express, { type Router } from 'express';
import { body } from 'express-validator';
import { postSignup, postLogin, postLogout } from '../controllers/auth';
import User from '../models/user';
import isAuth from '../middleware/is-auth';

const router: Router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('e-mail format is wrong').notEmpty().trim(),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password must contain numbers and letters')
      .isAlphanumeric(),
  ],
  postLogin,
);

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .notEmpty()
      .trim()
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('E-mail already in use');
        }
      }),
    body('password')
      .trim()
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('password must contain numbers and letters')
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      return value === req.body.password;
    }),
    body('name')
      .trim()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('name should be letters or more'),
  ],
  postSignup,
);

router.post('/logout', isAuth, postLogout);

export default router;
