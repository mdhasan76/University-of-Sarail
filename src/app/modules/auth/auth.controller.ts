import { AuthService } from './auth.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';

const loginUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const result = await AuthService.loginUser(data);
  const { refreshToken, ...others } = result;

  // const cookieOptions = {
  //   secure: config.mode === 'production',
  //   httpOnly: true,
  // };

  // console.log(refreshToken, 'this is logintoken login');
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.mode === 'production',
    httpOnly: true,
  };

  res.cookie('token', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login User successfully',
    data: others,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.mode === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login User successfully',
    data: result,
  });
});

export const AuthController = { loginUser, refreshToken };
