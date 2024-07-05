import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const APP_SECRET = 'your-secret-key';

export interface AuthRequest extends Request {
  userId?: string;
}

export function getUserId(req: AuthRequest): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return null;
    }
    const verifiedToken = jwt.verify(token, APP_SECRET) as { userId: string };
    return verifiedToken.userId;
  }
  return null;
}

export function isAuthenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const userId = getUserId(req);
  if (userId) {
    req.userId = userId;
    return next();
  }
  res.status(401).send('Unauthorized');
}
