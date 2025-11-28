import { AuthResponse, LoginCredentials } from "../model/types";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = (await res.json()) as AuthResponse;
  return data;
}
