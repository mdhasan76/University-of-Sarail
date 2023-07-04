import { AuthService } from './auth.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const result = await AuthService.loginUser(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login User successfully',
    data: result,
  });
});
export const AuthController = { loginUser };
