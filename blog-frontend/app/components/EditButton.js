"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function EditButton({ postId, authorId }) {
  const { user } = useAuth();

  if (!user || user.id !== authorId) {
    return null;
  }

  return (
    <Link
      href={`/posts/${postId}/edit`}
      className="ml-4 px-5 py-2.5 bg-slate-800 text-slate-300 rounded-md font-medium hover:bg-slate-700 hover:text-slate-200 transition-all border border-slate-700 hover:border-slate-600 whitespace-nowrap text-sm"
    >
      Edit Post
    </Link>
  );
}
