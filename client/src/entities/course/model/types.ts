// 카테고리, 정렬, 필터 관련 타입
export type CourseCategory =
  | "all"
  | "it-programming"
  | "productivity"
  | "ai-tech"
  | "ai-util"
  | "data-science"
  | "hardware";

export type CourseSort = "popular" | "recent" | "rating";
export type CoursePriceFilter = "all" | "free" | "paid";
export type CourseLevel = "all" | "beginner" | "intermediate" | "advanced";

export interface CourseFilter {
  category: CourseCategory;
  sort: CourseSort;
  price: CoursePriceFilter;
  level: CourseLevel;
  page: number;
}

export interface Course {
  id: string;
  title: string;
  thumbnailUrl: string;
  instructorName: string;
  rating: number;
  reviewCount: number;
  price: number;
  isFree: boolean;
  category: CourseCategory;
}
