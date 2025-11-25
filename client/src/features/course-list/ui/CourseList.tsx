import { getCourses, CourseCard } from "@/src/entities/course";

type CourseListProps = {
  category?: string;
};

export async function CourseList({ category }: CourseListProps) {
  const courses = await getCourses(category);

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {category ? `${category} 강의` : "전체 강의"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
