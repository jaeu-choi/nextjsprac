"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { CourseFilter } from "@/src/entities/course/model/types";

interface CourseFilterTabsProps {
  filter: CourseFilter; // 현재 상태를 표시하기 위해 받음
}

export function CourseFilterTabs({ filter }: CourseFilterTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(next: Partial<CourseFilter>) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.sort) params.set("sort", next.sort);
    if (next.price) params.set("price", next.price);
    if (next.level) params.set("level", next.level);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      {/* 정렬 탭 예시 */}
      <button
        onClick={() => updateFilter({ sort: "popular" })}
        className={filter.sort === "popular" ? "active" : ""}
      >
        인기순
      </button>
      <button
        onClick={() => updateFilter({ sort: "recent" })}
        className={filter.sort === "recent" ? "active" : ""}
      >
        최신순
      </button>
      {/* 가격, 난이도 등도 동일 패턴 */}
    </div>
  );
}
