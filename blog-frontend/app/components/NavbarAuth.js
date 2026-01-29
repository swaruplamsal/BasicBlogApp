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
          <Link href="/create-post" className="hover:text-gray-300">
            Create Post
          </Link>
          <span className="text-gray-300">Welcome, {user.username}!</span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
