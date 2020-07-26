import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';


interface TokenPayload {
 sub: string,
 iat:number;
 exp:number;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autHeader = request.headers.authorization;

  if (!autHeader) {
    throw new Error('JWT token is missing.');
  }

  const [, token] = autHeader.split(' ');


  try {
    const decoded = verify(token, authConfig.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Invalid token.');
  }
}
