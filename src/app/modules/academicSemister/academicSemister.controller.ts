import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

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

export const AcademicSemisterController = { createAcademicSemister };
