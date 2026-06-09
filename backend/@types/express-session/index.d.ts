import 'express-session';
import { UserData } from '..';

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean;
    user: UserData;
  }
}
