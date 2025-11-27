import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'admin';
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'student',
      password: 'pass123',
      role: 'user',
    },
    {
      id: 2,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
