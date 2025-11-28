"use client";

import { createContext, useContext, useState } from "react";
import type { User } from "@/src/entities/user";
import type { Course } from "@/src/entities/course";

interface AuthContextType {
  user: User | null;
  enrolledCourses: Course[];
  setUser: (user: User | null) => void;
  setEnrolledCourses: (courses: Course[]) => void;
  logout: () => void;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
  initialEnrolledCourses?: Course[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
  initialUser = null,
  initialEnrolledCourses = [],
}: AuthProviderProps) {
  // 서버에서 주입받은 초기값으로 시작
  const [user, setUser] = useState<User | null>(initialUser);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(
    initialEnrolledCourses,
  );
  const [isLoading, setIsLoading] = useState(false);

  // useEffect 제거: 서버에서 이미 fetch했으므로 클라이언트에서 중복 호출 불필요

  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
    // 쿠키 삭제
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        enrolledCourses,
        setUser,
        setEnrolledCourses,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
