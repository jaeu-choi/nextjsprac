import { Course } from "../model/types";

interface CourseListParams {
  category?: string;
  level?: string;
  isFree?: boolean;
}

export async function getCourseListDummy(
  params?: CourseListParams,
): Promise<Course[]> {
  const queryParams = new URLSearchParams();

  if (params?.category) {
    queryParams.append("category", params.category);
  }
  if (params?.level) {
    queryParams.append("level", params.level);
  }
  if (params?.isFree !== undefined) {
    queryParams.append("isFree", String(params.isFree));
  }

  const queryString = queryParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses-dummy${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch course list");
  }

  const data = (await res.json()) as Course[];
  return data;
}
