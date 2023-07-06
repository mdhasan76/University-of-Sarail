import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicSemister } from '../academicSemister/academicSemister.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: UserName; //embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian; // embedded object
  localGuardian: LocalGuardian; // embedded object
  academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
  academicDepartment: Types.ObjectId | IAcademicDepartment; // // reference _id
  academicSemester: Types.ObjectId | IAcademicSemister; // reference _id
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

// User data sample
/*

  "id": "123456789",
  "student": {
    "name": {
      "firstName": "Md",
      "lastName": "Hasan",
      "middleName": "Mia"
    },
    "gender": "male",
    "dateOfBirth": "28-09-2001",
    "email": "johndoe@example.com",
    "contactNo": "01720293476",
    "emergencyContactNo": "9876543210",
    "presentAddress": "123 Main St",
    "permanentAddress": "456 Elm St",
    "guardian": {
      "fatherName": "John Doe Sr.",
      "fatherOccupation": "Engineer",
      "fatherContactNo": "5555555555",
      "motherName": "Jane Doe",
      "motherOccupation": "Teacher",
      "motherContactNo": "9999999999",
      "address": "789 Oak St"
    },
    "localGuardian": {
      "name": "Alex Smith",
      "occupation": "Doctor",
      "contactNo": "1111111111",
      "address": "321 Pine St"
    },
    "academicFaculty": "649a6a23f6387e1686d05a41",
    "academicDepartment": "649a79cce371cb97f13e1cd6",
    "academicSemester": "6499c15a73f522bc0e599d84"
  },
}
*/
