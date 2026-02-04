"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { commentsApi } from "../../lib/api";

export default function CommentForm({ postId }) {
  const { user } = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    if (!comment.trim()) return;

    setIsSubmitting(true);

    try {
      await commentsApi.create({
        post: postId,
        content: comment,
      });

      setComment("");
      router.refresh();
    } catch (error) {
      alert("Failed to post comment: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 text-center">
        <p className="text-slate-400 mb-4">Sign in to leave a comment</p>
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3">
          Leave a Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows="4"
          required
          className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !comment.trim()}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors cursor-pointer"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
