import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { IAcademicSemister } from './academicSemister.interface';

const createAcademicSemister = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

// Get all Semister
const getAllSemisters = catchAsync(async (req, res) => {
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
});

// Get single semister
const getSingleSemister = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemisterService.getSingleSemister(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Academic semister successfully',
    data: result,
  });
});

// Update semister
const updateSemister = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemisterService.updateSemister(id, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Academic semister successfully',
    data: result,
  });
});

export const AcademicSemisterController = {
  createAcademicSemister,
  getAllSemisters,
  getSingleSemister,
  updateSemister,
};
