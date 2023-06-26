import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import {
  IAcademicSemister,
  IPaginationOptions,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import httpStatus from 'http-status';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalide semister code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

const getAllSemisters = async (
  pagination: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const sortConditoin: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditoin[sortBy] = sortOrder;
  }

  const result = await AcademicSemister.find()
    .sort(sortConditoin)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

export const AcademicSemisterService = { createSemister, getAllSemisters };
