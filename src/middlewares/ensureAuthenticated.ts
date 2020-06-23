import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = autHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
