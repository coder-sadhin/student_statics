/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const GlobalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const massage = error.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: false,
    massage,
    error,
  });
};

export default GlobalErrorHandler;
