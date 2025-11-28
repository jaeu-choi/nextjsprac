"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getEnrolledCourses } from "@/src/entities/user";
import { useAuth } from "@/src/app/providers/AuthProvider";

export function Login() {
  const router = useRouter();
  const { setUser, setEnrolledCourses } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ username, password });

      // JWT 토큰을 쿠키에 저장
      document.cookie = `auth_token=${response.access_token}; path=/; max-age=86400`; // 24시간

      // Context에 유저 정보 저장
      setUser(response.user);

      // 수강 중인 강의 fetch
      try {
        const courses = await getEnrolledCourses(
          response.user.id,
          response.access_token,
        );
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      }

      // 홈으로 리다이렉트
      router.push("/");
      router.refresh(); // 서버 컴포넌트 재실행
    } catch (err) {
      setError("로그인 실패: 아이디 또는 비밀번호를 확인해주세요");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>로그인</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
            아이디
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="student"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pass123"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#fee",
              color: "#c00",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <p>테스트 계정:</p>
        <ul>
          <li>student / pass123</li>
          <li>developer / dev123</li>
          <li>expert / expert123</li>
        </ul>
      </div>
    </div>
  );
}
