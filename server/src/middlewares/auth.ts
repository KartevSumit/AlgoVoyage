import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { MyJwtPayload } from '../config/JwtPayload.js';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.headers['authorization'] &&
        req.headers['authorization'].replace('Bearer ', ''));

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Token missing',
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    const payload: MyJwtPayload = typeof decoded === 'string'
      ? { id: decoded } as MyJwtPayload
      : (decoded as MyJwtPayload);

    req.user = payload;
    next();
  } catch (err: unknown) {
    const error = err as Error;
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(String(err));
    }
    next(error);
    return res.status(500).json({
      success: false,
      message: 'Error in Authorization',
      error: error.message,
    });
  }
};
