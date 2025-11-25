
  1. 기본 설정

  - ✅ Header 컴포넌트 생성 (로고, 네비게이션, 모바일 메뉴)
  - ✅ 모바일 반응형 메뉴 (drawer + dim overlay)
  - ✅ 접근성 개선 (aria-label, asChild)
  - ✅ 데이터 분리 (NAV_ITEMS 배열)

  2. 페이지 구조

  - ✅ PublicHome (비로그인 Hero Section)
  - ✅ UserHome (로그인 후 대시보드)
  - ✅ CategoryTabs (카테고리 탭바)
  - ✅ CourseList/CourseGrid (강의 카드 목록)

  3. 라우팅

  - ✅ App Router 구조
    - / → 홈페이지
    - /courses/[category] → 카테고리별 페이지
  - ✅ 동적 라우팅 (카테고리별)
  - ✅ 조건부 렌더링 (로그인 여부)

  4. FSD 아키텍처 적용 ⭐

  client/
  ├── app/                    # Next.js App Router (라우팅만)
  │   ├── page.tsx
  │   └── courses/[category]/page.tsx
  │
  ├── pages/                  # 더미 (Next.js 호환성)
  │   └── README.md
  │
  └── src/                    # FSD 레이어
      ├── pages/              # 페이지 조합
      │   ├── HomePage/
      │   └── CategoryPage/
      │
      ├── widgets/            # UI 블록
      │   ├── Header/
      │   ├── Footer/
      │   ├── PublicHero/
      │   ├── UserDashboard/
      │   ├── CategoryTabs/
      │   └── CourseGrid/
      │
      ├── entities/           # 비즈니스 엔티티
      │   ├── course/
      │   │   ├── model/types.ts
      │   │   ├── api/getCourses.ts
      │   │   ├── ui/CourseCard.tsx
      │   │   └── index.ts
      │   └── user/
      │       ├── model/types.ts
      │       ├── api/checkAuth.ts
      │       └── index.ts
      │
      ├── features/           # (아직 비어있음)
      │
      └── shared/             # 공통 요소
          ├── ui/
          │   └── shadcn/
          │       └── button.tsx
          └── lib/
              └── utils.ts

  5. 설정 변경

  - ✅ tsconfig.json - FSD 경로 alias 추가
  "@pages/*": ["src/pages/*"]
  "@widgets/*": ["src/widgets/*"]
  "@entities/*": ["src/entities/*"]
  "@shared/*": ["src/shared/*"]
  - ✅ components.json - shadcn 경로 변경
  "components": "@shared/ui/shadcn"

  6. 반응형 디자인

  - ✅ 모바일 퍼스트 접근
  - ✅ Breakpoint: md (768px) 통일
  - ✅ Hero Section 위치 조정 (모바일: 하단, 데스크탑: 중앙)
  - ✅ Header (모바일: drawer, 데스크탑: 가로 메뉴)

  7. 학습한 개념

  - ✅ Next.js Image 최적화 (fill prop)
  - ✅ Tailwind 반응형 클래스
  - ✅ FSD 아키텍처 구조
  - ✅ App Router vs Pages Router
  - ✅ 로컬 네트워크 테스트 (폰/아이패드)

  현재 상태

  - 🎨 UI/UX 완성
  - 📱 완전한 반응형
  - 🏗️ FSD 구조 적용
  - ⚙️ 더미 데이터 사용 (TODO: 실제 API 연결)
  - 🔐 인증 로직 준비됨 (TODO: 실제 구현)
