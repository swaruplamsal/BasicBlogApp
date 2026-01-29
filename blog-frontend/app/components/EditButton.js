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
      className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap"
    >
      Edit Post
    </Link>
  );
}
