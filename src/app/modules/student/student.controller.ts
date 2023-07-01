import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';
import { studentFilterableField } from './student.constant';

// Get all Student
const getAllStudents = catchAsync(async (req, res) => {
  const paginationOption = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const filters = pick(req.query, studentFilterableField);

  const result = await StudentService.getAllStudents(filters, paginationOption);

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Student Retrived Successfull',
    meta: result.meta,
    data: result.data,
    success: true,
  });
});

// Get single semister
const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Student successfully',
    data: result,
  });
});

// // Update semister
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Student successfully',
    data: result,
  });
});

// Delete Student
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delete student successfull',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
