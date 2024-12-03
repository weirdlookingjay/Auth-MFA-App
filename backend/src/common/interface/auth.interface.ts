export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userAent?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  userAgent?: string;
}
