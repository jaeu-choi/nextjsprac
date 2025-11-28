# 로그인 기능 구현 가이드

Next.js 15 + NestJS 환경에서 JWT 기반 인증 시스템을 구축하는 완전한 가이드입니다.

---

## 목차
1. [Backend - 인증 API 구축](#1-backend---인증-api-구축)
2. [Frontend - User Entity 생성](#2-frontend---user-entity-생성)
3. [Frontend - Login UI 구현](#3-frontend---login-ui-구현)
4. [Frontend - AuthProvider 전역 상태 관리](#4-frontend---authprovider-전역-상태-관리)
5. [Frontend - SSR 인증 통합](#5-frontend---ssr-인증-통합)
6. [Frontend - Header 로그인/로그아웃](#6-frontend---header-로그인로그아웃)
7. [Frontend - HomePage 연동](#7-frontend---homepage-연동)
8. [테스트](#8-테스트)

---

## 1. Backend - 인증 API 구축

### 1-1. 더미 유저 데이터 생성

**파일**: `backend/src/auth/users.service.ts`

```typescript
import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'admin';
  email: string;
  name: string;
  enrolledCourses?: string[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'student',
      password: 'pass123',
      role: 'user',
      email: 'student@example.com',
      name: '김학생',
      enrolledCourses: ['1', '3', '5'],
    },
    {
      id: 2,
      username: 'developer',
      password: 'dev123',
      role: 'user',
      email: 'developer@example.com',
      name: '이개발',
      enrolledCourses: ['2', '4', '7'],
    },
    {
      id: 3,
      username: 'expert',
      password: 'expert123',
      role: 'user',
      email: 'expert@example.com',
      name: '전문가',
      enrolledCourses: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    // ... 더 많은 유저 추가
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<User[]> {
    return this.users.map(({ password, ...user }) => user as User);
  }
}
```

### 1-2. 로그인 API 컨트롤러

**파일**: `backend/src/auth/auth.controller.ts`

```typescript
import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user;
  }
}
```

### 1-3. 유저 API 컨트롤러

**파일**: `backend/src/auth/users.controller.ts`

```typescript
import { Controller, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CoursesDummyService } from '../courses/courses-dummy.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(CoursesDummyService)
    private coursesDummyService: CoursesDummyService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    if (!user) {
      return { error: 'User not found' };
    }
    const { password, ...result } = user;
    return result;
  }

  @Get(':id/enrolled-courses')
  @UseGuards(AuthGuard('jwt'))
  async getEnrolledCourses(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    if (!user) {
      return { error: 'User not found' };
    }

    if (!user.enrolledCourses || user.enrolledCourses.length === 0) {
      return [];
    }

    const courses = await this.coursesDummyService.findByIds(
      user.enrolledCourses,
    );
    return courses;
  }
}
```

### 1-4. AuthModule 설정

**파일**: `backend/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'dev-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    CoursesModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

---

## 2. Frontend - User Entity 생성

### 2-1. User 타입 정의

**파일**: `client/src/entities/user/model/types.ts`

```typescript
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
```

### 2-2. API 함수 - 로그인

**파일**: `client/src/entities/user/api/login.ts`

```typescript
import { AuthResponse, LoginCredentials } from "../model/types";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = (await res.json()) as AuthResponse;
  return data;
}
```

### 2-3. API 함수 - 현재 유저 정보

**파일**: `client/src/entities/user/api/get-current-user.ts`

```typescript
import { User } from "../model/types";

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = (await res.json()) as User;
  return data;
}
```

### 2-4. API 함수 - 수강 중인 강의

**파일**: `client/src/entities/user/api/get-enrolled-courses.ts`

```typescript
import { Course } from "../../course/model/types";

export async function getEnrolledCourses(
  userId: number,
  token: string,
): Promise<Course[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/enrolled-courses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch enrolled courses for user ${userId}`);
  }

  const data = (await res.json()) as Course[];
  return data;
}
```

### 2-5. Public Exports

**파일**: `client/src/entities/user/index.ts`

```typescript
export type { User, UserRole, AuthResponse, LoginCredentials } from "./model/types";
export { getCurrentUser } from "./api/get-current-user";
export { getUser } from "./api/get-user";
export { getUserList } from "./api/get-user-list";
export { login } from "./api/login";
export { getEnrolledCourses } from "./api/get-enrolled-courses";
```

---

## 3. Frontend - Login UI 구현

### 3-1. Login 컴포넌트

**파일**: `client/src/features/Login/ui/Login.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getEnrolledCourses } from "@/src/entities/user";
import { useAuth } from "@/src/app/providers/AuthProvider";

export function Login() {
  const router = useRouter();
  const { setUser, setEnrolledCourses } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ username, password });

      // JWT 토큰을 쿠키에 저장
      document.cookie = `auth_token=${response.access_token}; path=/; max-age=86400`; // 24시간

      // Context에 유저 정보 저장
      setUser(response.user);

      // 수강 중인 강의 fetch
      try {
        const courses = await getEnrolledCourses(
          response.user.id,
          response.access_token,
        );
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      }

      // 홈으로 리다이렉트
      router.push("/");
      router.refresh();
    } catch (err) {
      setError("로그인 실패: 아이디 또는 비밀번호를 확인해주세요");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>로그인</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
            아이디
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="student"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pass123"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>테스트 계정:</p>
        <ul>
          <li>student / pass123</li>
          <li>developer / dev123</li>
          <li>expert / expert123</li>
        </ul>
      </div>
    </div>
  );
}
```

### 3-2. Login 페이지 라우터

**파일**: `client/app/login/page.tsx`

```typescript
import { Login } from "@features/Login";

export default function LoginPage() {
  return <Login />;
}
```

---

## 4. Frontend - AuthProvider 전역 상태 관리

### 4-1. AuthProvider 생성

**파일**: `client/src/app/providers/AuthProvider.tsx`

```typescript
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
```

---

## 5. Frontend - SSR 인증 통합

### 5-1. Layout에서 서버 인증

**파일**: `client/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@widgets/Header";
import { AuthProvider } from "@/src/app/providers/AuthProvider";
import { getCurrentUser, getEnrolledCourses } from "@/src/entities/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버에서 쿠키를 읽어 초기 유저 상태 생성
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let initialUser = null;
  let initialEnrolledCourses = [];

  if (token) {
    try {
      initialUser = await getCurrentUser(token);
      initialEnrolledCourses = await getEnrolledCourses(initialUser.id, token);
    } catch (error) {
      console.error("Failed to fetch initial user data:", error);
    }
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-dvh`}
      >
        <AuthProvider
          initialUser={initialUser}
          initialEnrolledCourses={initialEnrolledCourses}
        >
          <Header showSearch={true} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## 6. Frontend - Header 로그인/로그아웃

### 6-1. Header 컴포넌트

**파일**: `client/src/widgets/Header/ui/Header.tsx`

```typescript
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "@features/Search";
import { useAuth } from "@/src/app/providers/AuthProvider";

type HeaderProps = {
  showSearch?: boolean;
};

export function Header({ showSearch = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <div className="w-full h-[50px] bg-amber-200 flex items-center justify-between p-4">
        <div>
          <Link href="/">홈으로</Link>
        </div>
        <div className="flex items-center justify-between w-[200px]">
          <Link href="/course">강의</Link>
          <Link href="/clubs">클럽</Link>
          <Link href="/communities">커뮤니티</Link>
          <Link href="/challenges">챌린지</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.name}님</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
      {showSearch && <Search />}
    </div>
  );
}
```

---

## 7. Frontend - HomePage 연동

### 7-1. HomePageClient 생성

**파일**: `client/app/HomePageClient.tsx`

```typescript
"use client";

import { HomePage } from "@pages/Home";
import { useAuth } from "@/src/app/providers/AuthProvider";
import type { Course, CourseFilter } from "@/src/entities/course";

interface HomePageClientProps {
  initialFilter: CourseFilter;
  initialCourses: Course[];
}

export function HomePageClient({
  initialFilter,
  initialCourses,
}: HomePageClientProps) {
  const { user } = useAuth();

  return (
    <HomePage
      user={user}
      initialFilter={initialFilter}
      initialCourses={initialCourses}
    />
  );
}
```

### 7-2. 홈 페이지 (Server Component)

**파일**: `client/app/page.tsx`

```typescript
import { getCourseListDummy } from "@/src/entities/course";
import { buildCourseFilterFromUrl } from "@/src/entities/course/model/filters";
import { HomePageClient } from "./HomePageClient";

export default async function Page() {
  // 홈에서는 기본값: category="all", popular 정렬 등
  const initialFilter = buildCourseFilterFromUrl({
    categoryParam: "all",
    searchParams: {},
  });

  // 더미 강의 목록 가져오기 (인증 불필요)
  const initialCourses = await getCourseListDummy({ category: "all" });

  return (
    <HomePageClient
      initialFilter={initialFilter}
      initialCourses={initialCourses}
    />
  );
}
```

---

## 8. 테스트

### 8-1. 환경 변수 설정

**파일**: `client/.env.local`

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

### 8-2. 테스트 시나리오

1. **비로그인 상태**
   - 브라우저에서 `http://localhost:3000` 접속
   - Header에 "로그인" 버튼 확인

2. **로그인**
   - "로그인" 버튼 클릭
   - `student` / `pass123` 입력
   - 로그인 성공 → 홈으로 리다이렉트
   - Header에 "김학생님" + "로그아웃" 버튼 확인

3. **페이지 새로고침**
   - F5로 새로고침
   - 로그인 상태 유지 확인 (깜빡임 없음)
   - SSR로 "김학생님" 표시됨

4. **로그아웃**
   - "로그아웃" 버튼 클릭
   - Header에 다시 "로그인" 버튼 표시
   - 쿠키 삭제 확인

### 8-3. 다른 계정 테스트

- `developer` / `dev123` - 3개 강의 수강
- `expert` / `expert123` - 8개 강의 수강

---

## 주요 특징

### ✅ SSR (Server-Side Rendering)
- Layout에서 서버에서 유저 정보 fetch
- 첫 HTML부터 로그인 상태 렌더링
- SEO 친화적

### ✅ 깜빡임 없는 UX
- 서버에서 초기값 주입
- 하이드레이션 시 상태 변화 없음

### ✅ Context API 전역 상태
- `useAuth()` hook으로 어디서든 접근
- props drilling 방지

### ✅ JWT 기반 인증
- 쿠키에 토큰 저장 (24시간)
- 서버/클라이언트 모두 활용

### ✅ FSD 아키텍처
- Entities: User, Course 도메인
- Features: Login 기능
- Widgets: Header
- App: Layout, Providers

---

## 디렉토리 구조

```
client/
├── app/
│   ├── layout.tsx                      # SSR 인증
│   ├── page.tsx                        # 홈 (서버 컴포넌트)
│   ├── HomePageClient.tsx              # 홈 (클라이언트 컴포넌트)
│   └── login/page.tsx                  # 로그인 라우터
├── src/
│   ├── app/providers/
│   │   └── AuthProvider.tsx            # 전역 Context
│   ├── entities/
│   │   └── user/
│   │       ├── api/                    # API 함수들
│   │       └── model/types.ts          # 타입 정의
│   ├── features/
│   │   └── Login/ui/Login.tsx          # 로그인 폼
│   └── widgets/
│       └── Header/ui/Header.tsx        # 헤더
└── .env.local                          # 환경변수

backend/
└── src/
    └── auth/
        ├── users.service.ts            # 유저 데이터
        ├── auth.controller.ts          # 로그인 API
        └── users.controller.ts         # 유저 API
```

---

## 다음 단계 개선 방향

1. **NextAuth.js 통합** - 서버 세션 기반 인증
2. **Refresh Token** - Access Token 갱신 로직
3. **MongoDB 연동** - 실제 DB 저장
4. **비밀번호 암호화** - bcrypt 적용
5. **이메일 인증** - 회원가입 시 인증 메일

---

이 가이드를 따라하면 완전한 로그인 시스템을 구축할 수 있습니다!
