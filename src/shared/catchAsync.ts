import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('catch async a hit korse');
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
