import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesDummyService } from './courses-dummy.service';

@Controller('courses-dummy')
export class CoursesDummyController {
  constructor(private coursesDummyService: CoursesDummyService) {}

  @Get()
  async getAllCourses(
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('isFree') isFree?: string,
  ) {
    let courses = await this.coursesDummyService.findAll();

    if (category && category !== 'all') {
      courses = courses.filter((course) => course.category === category);
    }

    if (level && level !== 'all') {
      courses = courses.filter((course) => course.level === level);
    }

    if (isFree === 'true') {
      courses = courses.filter((course) => course.isFree);
    } else if (isFree === 'false') {
      courses = courses.filter((course) => !course.isFree);
    }

    return courses;
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    const course = await this.coursesDummyService.findById(id);
    if (!course) {
      return { error: 'Course not found' };
    }
    return course;
  }
}
