import { HomePage } from "@/src/pages/HomePage";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return <HomePage category={params.category} />;
}

// 정적 파라미터 생성 (선택사항 - 빌드 시 미리 생성)
export function generateStaticParams() {
  return [
    { category: "ai" },
    { category: "machine-learning" },
    { category: "game-dev" },
    { category: "data-science" },
    { category: "security-network" },
    { category: "hardware" },
    { category: "design-art" },
    { category: "business" },
  ];
}
