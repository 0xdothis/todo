import type { Request, Response } from 'express';
import type { UserType, SignupBody, ApiResponse, AuthSuccess } from '../@types';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import User from '../models/user';

export const postLogin = async (
  req: Request<never, never, UserType>,
  res: Response<ApiResponse<AuthSuccess>>,
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      error: 'user does not exist, kindly register',
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(400).json({
      success: false,
      error: 'Password is not valid, try again',
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = { _id: user._id.toString(), email: user.email };

  return req.session.save((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Something went wrong',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'login successfull',
    });
  });
};

export const postLogout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        secret: false,
        error: 'something went wrong',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'logout successfull',
    });
  });
};

export const postSignup = async (
  req: Request<never, never, SignupBody>,
  res: Response<ApiResponse<AuthSuccess>>,
) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      error: 'passwords must match',
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    switch (user.email) {
      case email: {
        return res.status(400).json({
          success: false,
          error: 'user already exist',
        });
      }
    }
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT!));

  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();

  return res.status(200).json({
    success: true,
    message: 'Signup successfull',
  });
};
