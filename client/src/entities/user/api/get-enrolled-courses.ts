import { Course } from "../../course/model/types";

export async function getEnrolledCourses(
  userId: number,
  token: string,
): Promise<Course[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/enrolled-courses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch enrolled courses for user ${userId}`);
  }

  const data = (await res.json()) as Course[];
  return data;
}
