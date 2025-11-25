import type { User } from "../model/types";

export async function checkAuth(): Promise<User | null> {
  // TODO: 실제 세션/토큰 체크 로직
  // const session = await getServerSession()
  // return session?.user || null

  return null; // 임시: 비로그인 상태
}
