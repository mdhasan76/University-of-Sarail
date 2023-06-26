import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { IAcademicSemister } from './academicSemister.interface';

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemister } = req.body;
    const result = await AcademicSemisterService.createSemister(
      academicSemister
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Academic Semister created Successfull',
      data: result,
      success: true,
    });

    next();
  }
);

// Get all Semister
const getAllSemisters = catchAsync(async (req, res, next) => {
  const paginationOption = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year']);

  const result = await AcademicSemisterService.getAllSemisters(
    filters,
    paginationOption
  );

  sendResponse<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Semister Retrived Successfull',
    meta: result.meta,
    data: result.data,
    success: true,
  });

  next();
});

const getSingleSemister = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await AcademicSemisterService.getSingleSemister(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Academic semister successfully',
    data: result,
  });

  next();
});

export const AcademicSemisterController = {
  createAcademicSemister,
  getAllSemisters,
  getSingleSemister,
};
