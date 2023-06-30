import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...studentData } = req.body;
  const result = await UserService.createStudent(student, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created Successfull',
    data: result,
    success: true,
  });
});

export const UserController = { createStudent };
