export type AuthModel = {
  email: string;
  password: string;
};

export type SuccessAuthModel = {
  token: string;
};

export type RegisterModel = {
  name: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  avatar?: File | null;
};

export type ForgotPasswordModel = {
  email: string;
};

export type ResetPasswordModel = {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};
