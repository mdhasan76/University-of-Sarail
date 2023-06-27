import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created Successfull',
    data: result,
    success: true,
  });
});

export const UserController = { createUser };
