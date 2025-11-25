import type { Course } from "../model/types";

export async function getCourses(category?: string): Promise<Course[]> {
  // TODO: 실제 API 연결
  // const res = await fetch(`/api/courses?category=${category}`)
  // return res.json()

  // 임시 더미 데이터
  const dummyCourses: Course[] = [
    {
      _id: "1",
      title: "React 완벽 가이드",
      instructor: { name: "김개발" },
      price: 55000,
      isFree: false,
      category: "ai",
    },
    {
      _id: "2",
      title: "Next.js 마스터하기",
      instructor: { name: "이코딩" },
      price: 0,
      isFree: true,
      category: "ai",
    },
    {
      _id: "3",
      title: "TypeScript 기초부터 실전까지",
      instructor: { name: "박타입" },
      price: 49000,
      isFree: false,
      category: "machine-learning",
    },
  ];

  if (category) {
    return dummyCourses.filter((course) => course.category === category);
  }

  return dummyCourses;
}
