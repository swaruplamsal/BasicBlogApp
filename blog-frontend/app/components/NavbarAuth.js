// app/components/NavbarAuth.js
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function NavbarAuth() {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <>
          <Link
            href="/posts/create"
            className="link-nav font-medium text-sm tracking-wide"
          >
            Write
          </Link>
          <span className="font-medium text-sm" style={{ color: "#94a3b8" }}>
            {user.username}
          </span>
          <button
            onClick={logout}
            className="px-5 py-2 rounded-md font-medium transition-all text-sm"
            style={{
              backgroundColor: "rgba(90, 69, 69, 0.8)",
              color: "#cbd5e1",
              border: "1px solid #6a5555",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="px-5 py-2 rounded-md font-medium transition-all text-sm"
            style={{
              backgroundColor: "rgba(90, 69, 69, 0.5)",
              color: "#cbd5e1",
              border: "1px solid rgba(106, 85, 85, 0.5)",
            }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="btn-primary px-5 py-2 text-white rounded-md font-semibold shadow-lg text-sm"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
