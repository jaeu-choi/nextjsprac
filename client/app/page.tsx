// app/page.tsx  (Next.js App Router 루트 페이지)
import { getCourseListDummy } from "@/src/entities/course";
import { buildCourseFilterFromUrl } from "@/src/entities/course/model/filters";
import { HomePageClient } from "./HomePageClient";

export default async function Page() {
  // 홈에서는 기본값: category="all", popular 정렬 등
  const initialFilter = buildCourseFilterFromUrl({
    categoryParam: "all",
    searchParams: {},
  });

  // 더미 강의 목록 가져오기 (인증 불필요)
  const initialCourses = await getCourseListDummy({ category: "all" });

  return (
    <HomePageClient
      initialFilter={initialFilter}
      initialCourses={initialCourses}
    />
  );
}
