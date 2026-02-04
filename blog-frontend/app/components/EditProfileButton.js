"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function EditProfileButton({ profileUserId }) {
  const { user } = useAuth();

  // Only show edit button if viewing own profile
  if (!user || user.id !== profileUserId) {
    return null;
  }

  return (
    <Link
      href="/profile/edit"
      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-600/50 text-slate-200 font-medium rounded-lg transition-all cursor-pointer"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      Edit Profile
    </Link>
  );
}
