import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { LoginValidation } from './auth.validations';
import { AuthController } from './auth.controller';
import auth from '../../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const authRouter = express.Router();

authRouter.post(
  '/login',
  validateRequest(LoginValidation.loginZodSchema),
  AuthController.loginUser
);
authRouter.post(
  '/refresh-token',
  validateRequest(LoginValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

authRouter.post(
  '/change-password',
  validateRequest(LoginValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AuthController.changePassword
);
export const AuthRoutes = authRouter;
