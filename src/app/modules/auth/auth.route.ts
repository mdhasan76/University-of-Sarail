import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { LoginValidation } from './auth.validations';
import { AuthController } from './auth.controller';
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
export const AuthRoutes = authRouter;
