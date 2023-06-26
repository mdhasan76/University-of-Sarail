import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import {
  IAcademicSemister,
  IAcademicSemisterFilter,
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

// Get All Semister using filter an search
const getAllSemisters = async (
  filters: IAcademicSemisterFilter,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const academicSearchableFields = ['title', 'code', 'year'];

  const andCondition = [];

  if (searchTerm?.length) {
    andCondition.push({
      $or: academicSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const sortConditoin: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditoin[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicSemister.find(whereCondition)
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

// Get single Semister
const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findOne({ _id: id });
  return result;
};

export const AcademicSemisterService = {
  createSemister,
  getAllSemisters,
  getSingleSemister,
};
