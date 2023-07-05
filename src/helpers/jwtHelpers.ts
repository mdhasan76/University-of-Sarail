import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const veriFyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelper = { createToken, veriFyToken };
