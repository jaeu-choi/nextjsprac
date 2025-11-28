import { Course, CourseFilter } from "../model/types";

export async function getCourseList(filter: CourseFilter): Promise<Course[]> {
  const params = new URLSearchParams({
    category: filter.category,
    sort: filter.sort,
    price: filter.price,
    level: filter.level,
    page: String(filter.page),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses?${params.toString()}`,
    {
      cache: "no-store", // SSR에서 매 요청마다 fresh한 데이터 원할 때
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch course list");
  }

  const data = (await res.json()) as Course[];
  return data;
}
