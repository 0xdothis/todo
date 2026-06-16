import { AuthUser } from '..';

declare global {
  namespace Express {
    interface Request {
      user: AuthUser | null;
    }
  }
}
