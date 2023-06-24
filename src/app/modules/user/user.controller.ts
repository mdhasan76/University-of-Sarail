import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created Successfull',
    data: result,
    success: true,
  });

  next();
});

export const UserController = { createUser };
