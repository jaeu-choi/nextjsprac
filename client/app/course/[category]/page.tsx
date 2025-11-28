import { buildCourseFilterFromUrl } from "@entities/course/model/filters";
import { getCourseList } from "@/src/entities/course/api/get-course-list";
// import { CourseCategoryPage } from "@/src/pages/courses/ui/course-category-page";

interface PageProps {
  params: { category?: string };
  searchParams: {
    sort?: string;
    price?: string;
    level?: string;
    page?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const filter = buildCourseFilterFromUrl({
    categoryParam: params.category,
    searchParams,
  });

  const courses = await getCourseList(filter); // 여기서 딱 한 번 fetch

  return <CourseCategoryPage filter={filter} courses={courses} />;
}
