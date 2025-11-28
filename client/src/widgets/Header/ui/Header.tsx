"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "@features/Search";
import { useAuth } from "@/src/app/providers/AuthProvider";

type HeaderProps = {
  showSearch?: boolean;
};

export function Header({ showSearch = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <div className="w-full h-[50px] bg-amber-200 flex items-center justify-between p-4">
        <div>
          <Link href="/">홈으로</Link>
        </div>
        <div className="flex items-center justify-between w-[200px]">
          <Link href="/course">강의</Link>
          <Link href="/clubs">클럽</Link>
          <Link href="/communities">커뮤니티</Link>
          <Link href="/challenges">챌린지</Link>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.name}님</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
      {showSearch && <Search />}
    </div>
  );
}
