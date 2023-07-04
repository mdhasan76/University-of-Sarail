import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { compare } from 'bcrypt';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // does exist
  const doesExist = await User.findOne(
    { id: id },
    { id: 1, password: 1, needPasswordChange: 1 }
  );
  if (!doesExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }
  const isPasswordMatched = await compare(password, doesExist?.password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password');
  }
};

export const AuthService = { loginUser };
