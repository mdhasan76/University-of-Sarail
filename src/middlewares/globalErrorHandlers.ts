import { ErrorRequestHandler } from 'express';
import config from '../config';
import { IGenericErrorMessage } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import ApiError from '../errors/ApiError';
import { errorLogger } from '../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  config.mode === 'development'
    ? console.log(' 🐱‍🏍 Global Error Handler ~', error)
    : errorLogger.error(' 🐱‍🏍 Global Error Handler ~', error);

  console.log('SOmething else', error);

  let statusCode = 500;
  let message = 'something went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.message
      ? [
          {
            path: '',
            message: simplifiedError?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    stack: config.mode !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandlers;
