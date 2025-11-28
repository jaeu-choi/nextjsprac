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
