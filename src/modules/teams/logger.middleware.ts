import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `URL:${req.protocol}://${req.hostname}:${3000}${req.originalUrl} METHOD:${
      req.method
    }`,
  );

  next();
}
