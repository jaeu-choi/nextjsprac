import { PublicHero } from "@/src/widgets/PublicHero";
import { UserDashboard } from "@/src/widgets/UserDashboard";
import { CategoryTabs } from "@/src/widgets/CategoryTabs";
import { CourseList } from "@/src/features/course-list";
import { checkAuth } from "@/src/entities/user";

type HomePageProps = {
  category?: string;
};

export async function HomePage({ category }: HomePageProps) {
  const user = await checkAuth();

  return (
    <>
      {/* Hero Section: 로그인 여부에 따라 다름 */}
      {user ? <UserDashboard user={user} /> : <PublicHero />}

      {/* 카테고리 탭바 */}
      <CategoryTabs />

      {/* 강의 목록 */}
      <CourseList category={category} />
    </>
  );
}
