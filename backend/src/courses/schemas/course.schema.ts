import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ _id: false })
export class Instructor {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop()
  profileImage: string;
}

@Schema({ _id: false })
export class Section {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;
}

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  summary: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop({ enum: ['beginner', 'intermediate', 'advanced'] })
  level: string;

  @Prop()
  duration: number;

  @Prop({ default: false })
  isFree: boolean;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Instructor })
  instructor: Instructor;

  @Prop({ type: [Section] })
  sections: Section[];

  @Prop()
  videoUrl: string;

  @Prop({ min: 0, max: 5 })
  rating: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
