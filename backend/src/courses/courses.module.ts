import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesDummyService } from './courses-dummy.service';
import { CoursesDummyController } from './courses-dummy.controller';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CoursesController, CoursesDummyController],
  providers: [CoursesService, CoursesDummyService],
  exports: [CoursesService, CoursesDummyService],
})
export class CoursesModule {}
