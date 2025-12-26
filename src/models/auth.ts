export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}