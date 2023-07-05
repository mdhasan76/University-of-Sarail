import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { JwtHelper } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // create instance of jwt
  const user = new User();
  const doesExist = await user.doesUserExist(id);
  if (!doesExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // Check that the given password in matched with the save pass
  if (
    doesExist.password &&
    !(await user.doesPasswordMatched(password, doesExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password');
  }
  const { role, id: userId, needPasswordChange } = doesExist;
  // console.log(doesExist, 'this is does', doesExist.role);
  // assign jwt
  const accessToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = JwtHelper.createToken(
    { userId, role },
    config.jwt.refresh as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    // verifyToken = jwt.verify(token, config.jwt.refresh as string);
    verifyToken = JwtHelper.veriFyToken(token, config.jwt.refresh as string);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  console.log(verifyToken, 'this is refreshtoken fn');
  // const {userId, role} = verifyToken;
  const user = new User();

  const doesUserExist = await user.doesUserExist(verifyToken?.userId);
  if (!doesUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  const newAccessToken = JwtHelper.createToken(
    { userId: verifyToken.userId, role: verifyToken.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = { loginUser, refreshToken };
