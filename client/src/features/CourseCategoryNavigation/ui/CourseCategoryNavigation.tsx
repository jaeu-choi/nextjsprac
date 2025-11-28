"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CourseCategory } from "@/src/entities/course/model/types";

const CATEGORIES: { id: CourseCategory; label: string; href: string }[] = [
  { id: "all", label: "전체", href: "/" },
  {
    id: "it-programming",
    label: "개발 · 프로그래밍",
    href: "/courses/it-programming",
  },
  { id: "productivity", label: "업무 생산성", href: "/courses/productivity" },
  { id: "ai-tech", label: "AI-TECH", href: "/courses/ai-tech" },
  { id: "data-science", label: "data-science", href: "/courses/data-science" },
  { id: "hardware", label: "하드웨어", href: "/courses/hardware" },
];

export function CourseCategoryNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full h-50px justify-between items-center px-4">
      {CATEGORIES.map((c) => {
        const isActive = pathname === c.href;
        return (
          <Link key={c.id} href={c.href} className={isActive ? "active" : ""}>
            {c.label}
          </Link>
        );
      })}
    </nav>
  );
}
