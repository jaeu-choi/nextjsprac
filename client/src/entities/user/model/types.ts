export type UserRole = "user" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  enrolledCourses?: string[];
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
