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
            href="/create-post"
            className="text-slate-300 hover:text-amber-500 font-medium transition-colors text-sm tracking-wide"
          >
            Write
          </Link>
          <span className="text-slate-400 font-medium text-sm">
            {user.username}
          </span>
          <button
            onClick={logout}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-medium transition-all border border-slate-700 hover:border-slate-600 text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="px-5 py-2 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-md font-medium transition-all border border-slate-700/50 hover:border-slate-600 text-sm"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md font-semibold transition-all shadow-lg shadow-amber-500/20 text-sm"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  );
}
