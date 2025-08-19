export interface User {
  id: string;
  username: string;
  email: string;
  isConfirmed: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ConfirmationCode {
  code: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export type AuthView = 
  | 'login' 
  | 'register' 
  | 'confirm' 
  | 'password-reset-request' 
  | 'password-reset'; 