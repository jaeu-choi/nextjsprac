import type { Course } from "@entities/course/model/types";

interface CourseCardListProps {
  courses: Course[];
}

export function CourseCardList({ courses }: CourseCardListProps) {
  if (!courses.length) {
    return <p>조건에 맞는 강의가 없습니다.</p>;
  }

  return (
    <div className="grid">
      {courses.map((course) => (
        <article key={course.id} className="course-card">
          <img src={course.thumbnailUrl} alt={course.title} />
          <h3>{course.title}</h3>
          <p>{course.instructorName}</p>
          <p>
            {course.rating} ({course.reviewCount})
          </p>
          <p>{course.isFree ? "무료" : `${course.price.toLocaleString()}원`}</p>
        </article>
      ))}
    </div>
  );
}
