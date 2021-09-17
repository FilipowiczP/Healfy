export interface LoginForm {
  login: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  birthday: Date | null;
  login: string;
  password: string;
}
