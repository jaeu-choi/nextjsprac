import { User } from "../model/types";

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  const data = (await res.json()) as User;
  return data;
}
