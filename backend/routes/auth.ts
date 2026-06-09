import express, { type Router } from 'express';
import { postSignup, postLogin, postLogout } from '../controllers/auth';

const router: Router = express.Router();

router.post('/login', postLogin);

router.post('/signup', postSignup);

router.post('/logout', postLogout);

export default router;
