export class InstructorDto {
  name: string;
  bio?: string;
  profileImage?: string;
}

export class SectionDto {
  title: string;
  content?: string;
}

export class CreateCourseDto {
  id: number;
  title: string;
  summary?: string;
  description?: string;
  thumbnail?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number;
  isFree?: boolean;
  tags?: string[];
  instructor?: InstructorDto;
  sections?: SectionDto[];
  videoUrl?: string;
  rating?: number;
}
