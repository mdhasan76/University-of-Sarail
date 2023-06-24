import ApiError from '../../../errors/ApiError';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademicSemister } from './academicSemister.interface';
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

export const AcademicSemisterService = { createSemister };
