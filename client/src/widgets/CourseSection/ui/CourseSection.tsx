import { CourseFilterTabs } from "@features/Filter-tabs";
import { CourseCardList } from "@features/CourseCardList";
import { CourseCategoryNavigation } from "@features/CourseCategoryNavigation";
import { CourseFilter } from "@/src/entities/course/model/types";
import { Course } from "@entities/course/model/types";
type CourseSectionProps = {
  showNav: boolean;
  filter: CourseFilter;
  courses: Course[];
};
export function CourseSection({
  showNav,
  filter,
  courses,
}: CourseSectionProps) {
  return (
    <section>
      {showNav && <CourseCategoryNavigation />}
      <CourseFilterTabs filter={filter} />
      <CourseCardList courses={courses} />
    </section>
  );
}
