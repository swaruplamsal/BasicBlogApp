// app/signup/page.js
"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signup(username, email, password);

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
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 cursor-pointer"
          >
            <div>
                          <Image
                            src="/images/logo.png"
                            alt="Editorial logo"
                            width={200}
                            height={200}
                            className="object-cover"
                            priority
                          />
                        </div>
          </Link>
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#f1f5f9",
            }}
          >
            Join Editorial
          </h1>
          <p style={{ color: "#cbd5e1" }}>Create an account to start writing</p>
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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              className="btn-primary w-full text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6" style={{ color: "#94a3b8" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="link-red font-semibold cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
