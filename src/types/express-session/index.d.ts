import Session from 'express-session';

export = Session;

declare module 'express-session' {
  interface SessionData {
    refreshToken: string;
  }
}
