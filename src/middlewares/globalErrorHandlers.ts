import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import config from '../config'
import { IGenericErrorMessage } from '../interface/error'
import handleValidationError from '../errors/handleValidationError'
import ApiError from '../errors/ApiError'
import { error } from 'winston'

const globalErrorHandlers = (
  err: mongoose.Error.ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message ? [{ path: '', message: error?.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    stack: config.mode !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandlers
