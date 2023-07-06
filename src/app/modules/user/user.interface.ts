/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// Put all user instance methods in this interface:
// export type IUserMethods = {
//   doesUserExist(id: string): Promise<Partial<IUser | null>>;
//   doesPasswordMatched(
//     givenPassword: string,
//     savePassword: string
//   ): Promise<boolean>;
// };

export type UserModel = {
  doesUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needPasswordChange'>>;
  doesPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
