import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  async findAll(query?: {
    level?: string;
    isFree?: boolean;
    tag?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Course[]; total: number; page: number; limit: number }> {
    const { level, isFree, tag, page = 1, limit = 10 } = query || {};

    const filter: Record<string, unknown> = {};
    if (level) filter.level = level;
    if (isFree !== undefined) filter.isFree = isFree;
    if (tag) filter.tags = tag;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.courseModel.find(filter).skip(skip).limit(limit).exec(),
      this.courseModel.countDocuments(filter),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseModel.findOne({ id }).exec();
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.courseModel
      .findOneAndUpdate({ id }, updateCourseDto, { new: true })
      .exec();
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async remove(id: number): Promise<void> {
    const result = await this.courseModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
  }

  async createMany(courses: CreateCourseDto[]): Promise<void> {
    await this.courseModel.insertMany(courses);
  }

  async deleteAll(): Promise<void> {
    await this.courseModel.deleteMany({});
  }
}
