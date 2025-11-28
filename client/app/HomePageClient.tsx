"use client";

import { HomePage } from "@pages/Home";
import { useAuth } from "@/src/app/providers/AuthProvider";
import type { Course, CourseFilter } from "@/src/entities/course";

interface HomePageClientProps {
  initialFilter: CourseFilter;
  initialCourses: Course[];
}

export function HomePageClient({
  initialFilter,
  initialCourses,
}: HomePageClientProps) {
  const { user } = useAuth();

  return (
    <HomePage
      user={user}
      initialFilter={initialFilter}
      initialCourses={initialCourses}
    />
  );
}
