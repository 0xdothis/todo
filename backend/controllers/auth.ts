import type { Request, Response } from 'express';
import type { SignupBody, ApiResponse, AuthData, LoginBody } from '../@types';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { validationResult } from 'express-validator';

import User from '../models/user';
import { ErrorHandler } from '../middleware/error';

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_APIKEY || '',
  },
});

export const postLogin = async (
  req: Request<never, never, LoginBody>,
  res: Response<ApiResponse<AuthData>>,
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new ErrorHandler({
      success: false,
      message: 'kindly review your inputted values',
      statusCode: 400,
      errors: error.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler({
      success: false,
      message: 'user does not exist, kindly register',
      statusCode: 404,
    });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    throw new ErrorHandler({
      success: false,
      message: 'Password is not valid, try again',
      statusCode: 422,
    });
  }

  if (!process.env.JWT_SECRET) {
    throw new ErrorHandler({
      success: false,
      message: 'jwt secret is not set',
      statusCode: 422,
    });
  }

  const token = jwt.sign({ email, name: user.name, userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

  return res.status(200).json({
    success: true,
    message: 'login successful',
    data: { token, userId: user._id },
  });
};

export const postLogout = async () => {};

export const postSignup = async (
  req: Request<never, never, SignupBody>,
  res: Response<ApiResponse<never>>,
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new ErrorHandler({
      success: false,
      message: 'kindly review your inputted values',
      statusCode: 400,
      errors: error.array(),
    });
  }

  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(422).json({
      success: false,
      message: 'passwords must match',
      statusCode: 422,
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new ErrorHandler({
      success: false,
      message: 'user already exist',
      statusCode: 422,
    });
  }

  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT!));

  const newUser = new User({ email, name, password: hashedPassword });

  const savedUser = await newUser.save();

  if (!savedUser) {
    throw new ErrorHandler({
      success: false,
      message: 'user registration failed',
      statusCode: 422,
    });
  }

  transporter.sendMail({
    from: 'developer.0xdothis@gmail.com',
    to: email,
    subject: 'Todo App Registration',
    html: '<h2>Registration successful, kindly login',
  });

  return res.status(200).json({
    success: true,
    message: 'Signup successful',
  });
};
