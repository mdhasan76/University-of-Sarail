import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { RequestHandler } from 'express';
import { IUser } from './user.interface';

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

const createFaculy: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdmin(admin, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

export const UserController = { createStudent, createAdmin, createFaculy };
