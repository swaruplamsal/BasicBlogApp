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
      className="ml-4 px-5 py-2.5 rounded-md font-medium transition-all whitespace-nowrap text-sm"
      style={{
        backgroundColor: "rgba(90, 69, 69, 0.8)",
        color: "#cbd5e1",
        border: "1px solid #6a5555",
      }}
    >
      Edit Post
    </Link>
  );
}
