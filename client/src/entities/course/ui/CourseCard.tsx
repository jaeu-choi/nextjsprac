import Link from "next/link";
import type { Course } from "../model/types";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course._id}`} className="group">
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {/* 썸네일 */}
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">썸네일</span>
        </div>

        {/* 강의 정보 */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-[#9810FA] transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{course.instructor.name}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#9810FA]">
              {course.isFree ? "무료" : `₩${course.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
