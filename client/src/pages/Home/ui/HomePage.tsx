// src/pages/home/ui/home-page.tsx
import type { Course, CourseFilter } from "@/src/entities/course/model/types";
import { User } from "@entities/user/model/types";
import { Hero } from "@widgets/Hero";
import { Dashboard } from "@widgets/Dashboard";
import { CourseSection } from "@widgets/CourseSection";
import { Footer } from "@widgets/Footer";
import { CourseCategoryNavigation } from "@/src/features/CourseCategoryNavigation";

export interface HomePageProps {
  user: User | null;
  initialFilter: CourseFilter;
  initialCourses: Course[];
}

export function HomePage({
  user,
  initialFilter,
  initialCourses,
}: HomePageProps) {
  return (
    <>
      <Hero />

      {/* 노란 영역: 로그인/비로그인 분기 */}
      <Dashboard user={user} />

      <CourseCategoryNavigation />

      {/* 초록+주황 섹션: 카테고리 네비 + 카드 리스트 */}
      <CourseSection
        showNav={false}
        filter={initialFilter}
        courses={initialCourses}
      />

      <Footer />
    </>
  );
}
