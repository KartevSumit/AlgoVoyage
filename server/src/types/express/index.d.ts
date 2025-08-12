import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id?: string; email?: string }; 
      cookies?: { [key: string]: string } | undefined;
    }
  }
}

export {};
