// app/login/page.js
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(username, password);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "#3A2525" }}
    >
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #000080, #FF0000)",
                boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3)",
              }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#f1f5f9",
              }}
            >
              Editorial
            </span>
          </Link>
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f1f5f9",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "#cbd5e1" }}>
            Sign in to your account to continue
          </p>
        </div>

        <div
          className="rounded-2xl p-8 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(74, 53, 53, 0.5)",
            border: "1px solid #5a4545",
          }}
        >
          {error && (
            <div
              className="px-4 py-3 rounded-lg mb-6"
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                color: "#ff6666",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#cbd5e1" }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: "rgba(90, 69, 69, 0.5)",
                  border: "1px solid #6a5555",
                  color: "#f1f5f9",
                }}
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#cbd5e1" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: "rgba(90, 69, 69, 0.5)",
                  border: "1px solid #6a5555",
                  color: "#f1f5f9",
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6" style={{ color: "#94a3b8" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="link-red font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
