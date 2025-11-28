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
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      email: 'admin@example.com',
      name: '관리자',
      enrolledCourses: [],
    },
    {
      id: 3,
      username: 'developer',
      password: 'dev123',
      role: 'user',
      email: 'developer@example.com',
      name: '이개발',
      enrolledCourses: ['2', '4', '7'],
    },
    {
      id: 4,
      username: 'designer',
      password: 'design123',
      role: 'user',
      email: 'designer@example.com',
      name: '박디자인',
      enrolledCourses: ['6', '8'],
    },
    {
      id: 5,
      username: 'marketer',
      password: 'market123',
      role: 'user',
      email: 'marketer@example.com',
      name: '최마케터',
      enrolledCourses: ['9', '10'],
    },
    {
      id: 6,
      username: 'newbie',
      password: 'new123',
      role: 'user',
      email: 'newbie@example.com',
      name: '신입생',
      enrolledCourses: [],
    },
    {
      id: 7,
      username: 'expert',
      password: 'expert123',
      role: 'user',
      email: 'expert@example.com',
      name: '전문가',
      enrolledCourses: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
    {
      id: 8,
      username: 'teacher',
      password: 'teach123',
      role: 'user',
      email: 'teacher@example.com',
      name: '강사님',
      enrolledCourses: ['11', '12'],
    },
    {
      id: 9,
      username: 'freelancer',
      password: 'free123',
      role: 'user',
      email: 'freelancer@example.com',
      name: '프리랜서',
      enrolledCourses: ['13'],
    },
    {
      id: 10,
      username: 'student2',
      password: 'student123',
      role: 'user',
      email: 'student2@example.com',
      name: '정학습',
      enrolledCourses: ['3', '5', '7'],
    },
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
