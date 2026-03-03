import type { Request, Response, NextFunction } from 'express';

export namespace Middleware {
  // Normal middleware
  export type Handler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>;

  // Error-handling middleware
  export type ErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
