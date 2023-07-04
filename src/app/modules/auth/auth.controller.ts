import { Request } from 'express';

const loginUser = (req: Request) => {
  console.log(req.body);
};
export const AuthController = { loginUser };
