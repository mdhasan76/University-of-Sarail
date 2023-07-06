/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { IPaginationOptions } from '../academicSemister/academicSemister.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// Get All Student using filter an search
const getAllStudents = async (
  filters: IStudentFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm?.length) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereCondition)
    .populate('academicSemester') // try self to optimize the 3 populate code
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditoin)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments(whereCondition);

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};

// Get single Student
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ _id: id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// Update Student
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  // Check that the student exist in the collection
  const doesExist = await Student.findOne({ id });
  if (!doesExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  }

  // distructure payload data
  const { name, guardian, localGuardian, ...studentData } = payload;
  const updateStudentData: Partial<IStudent> = { ...studentData };

  // handle student name object data dynamically
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // expected output: 'name.firstName' or 'name.middleName' or 'name.lastName'
      (updateStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // Guardian
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`; // expected output: 'guardian.firstName' or 'guardian.middleName' or 'guardian.lastName'
      (updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  // Local guardian
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`; // expected output: 'localGuardian.firstName' or 'localGuardian.middleName' or 'localGuardian.lastName'
      (updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
