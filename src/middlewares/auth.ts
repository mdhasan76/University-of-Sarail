import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelper } from '../helpers/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorizarion
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not Authorized User, Headers a tomer token pataw nai'
        );
      }

      let verifiedUser = null;
      verifiedUser = JwtHelper.veriFyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser;

      if (requiredRole.length && !requiredRole.includes(verifiedUser.role)) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'Forbidden, Tomer role acceptable na ai api a hit korar jonno'
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;
