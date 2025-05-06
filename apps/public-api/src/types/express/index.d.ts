declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email: string;
      nickname: string;
      role: string;
    };
    ip?: string;
  }
}
