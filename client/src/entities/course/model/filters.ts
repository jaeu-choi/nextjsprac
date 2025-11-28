import { CourseCategory, CourseFilter } from "./types";

function normalizeCategory(categoryParam?: string): CourseCategory {
  if (!categoryParam) return "all";
  const allowed: CourseCategory[] = [
    "all",
    "it-programming",
    "productivity",
    "ai-tech",
    "ai-util",
  ];
  return (allowed.find((c) => c === categoryParam) ?? "all") as CourseCategory;
}

export function buildCourseFilterFromUrl(args: {
  categoryParam?: string;
  searchParams: {
    sort?: string;
    price?: string;
    level?: string;
    page?: string;
  };
}): CourseFilter {
  const { categoryParam, searchParams } = args;

  return {
    category: normalizeCategory(categoryParam),
    sort: (searchParams.sort as any) ?? "popular",
    price: (searchParams.price as any) ?? "all",
    level: (searchParams.level as any) ?? "all",
    page: searchParams.page ? Number(searchParams.page) : 1,
  };
}
