export type ILoginUser = {
  id: string;
  password: string;
};

export type IPasswordChange = {
  oldPassword: string;
  newPassword: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
  needPasswordChange: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
