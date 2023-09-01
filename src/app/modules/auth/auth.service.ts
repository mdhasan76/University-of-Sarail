import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IPasswordChange,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { JwtHelper } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';
import bcrypt, { compare } from 'bcrypt';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // create instance of jwt
  const doesExist = await User.doesUserExist(id);
  if (!doesExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does not exist');
  }

  // Check that the given password in matched with the save pass
  if (
    doesExist.password &&
    !(await User.doesPasswordMatched(password, doesExist?.password))
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

const changePassword = async (
  user: JwtPayload,
  payload: IPasswordChange
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  // Checking user exist
  const isUserExist = await User.doesUserExist(user.userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Found');
  }

  const checkOldPass = await compare(oldPassword, isUserExist?.password);
  // checking old pass
  if (isUserExist.password && !checkOldPass) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password doesnt match');
  }

  // Hash password
  const newHashPass = await bcrypt.hash(
    newPassword,
    Number(config.default_bcrypt_round)
  );

  const query = { id: `${user?.userId}` };
  const updateData = {
    needPasswordChange: false,
    password: newHashPass,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate(query, updateData, {
    new: true,
  });
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifyToken = null;
//   try {
//     // verifyToken = jwt.verify(token, config.jwt.refresh as string);
//     verifyToken = JwtHelper.veriFyToken(token, config.jwt.refresh as string);
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//   console.log(verifyToken, 'this is refreshtoken fn');
//   // const {userId, role} = verifyToken;
//   const user = new User();

//   const doesUserExist = await user.doesUserExist(verifyToken?.userId);
//   if (!doesUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
//   }

//   const newAccessToken = JwtHelper.createToken(
//     { userId: verifyToken.userId, role: verifyToken.role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );

//   return {
//     accessToken: newAccessToken,
//   };
// };

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelper.veriFyToken(token, config.jwt.refresh as Secret);
  } catch (err) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Invalid Refresh Token, Token tik na'
    );
  }

  const { userId } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token
  const isUserExist = await User.doesUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = JwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = { loginUser, refreshToken, changePassword };
