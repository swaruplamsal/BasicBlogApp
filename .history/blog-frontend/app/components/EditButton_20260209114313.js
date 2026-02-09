"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function EditButton({ postId, authorId }) {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !user || user.id !== authorId) {
    return null;
  }

  return (
    <Link
      href={`/posts/${postId}/edit`}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/30 cursor-pointer"
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
      Edit Post
    </Link>
  );
}
