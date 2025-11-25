"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { label: "전체", slug: "" },
  { label: "AI", slug: "ai" },
  { label: "머신러닝", slug: "machine-learning" },
  { label: "게임개발", slug: "game-dev" },
  { label: "데이터사이언스", slug: "data-science" },
  { label: "보안네트워크", slug: "security-network" },
  { label: "하드웨어", slug: "hardware" },
  { label: "디자인아트", slug: "design-art" },
  { label: "기획경영", slug: "business" },
];

export function CategoryTabs() {
  const pathname = usePathname();

  const isActive = (slug: string) => {
    if (slug === "") return pathname === "/";
    return pathname === `/courses/${slug}`;
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={category.slug === "" ? "/" : `/courses/${category.slug}`}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                isActive(category.slug)
                  ? "bg-[#9810FA] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
