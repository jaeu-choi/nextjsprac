import { User } from "../model/types";

export async function getUser(id: number, token: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch user with id ${id}`);
  }

  const data = (await res.json()) as User;
  return data;
}
