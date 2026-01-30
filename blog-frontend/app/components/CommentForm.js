"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CommentForm({ postId }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to comment");
      }

      const response = await fetch("http://127.0.0.1:8000/api/v1/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          post: postId,
          content: content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to post comment");
      }

      setSuccess(true);
      setContent("");

      // Refresh the page to show new comment
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5 mb-8">
        <p className="text-amber-400">Please log in to leave a comment.</p>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h4 className="text-xl font-semibold text-slate-200 mb-4">
        Add a Comment
      </h4>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mb-4">
          Comment posted successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-lg"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          placeholder="Write your comment..."
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4 transition-all"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-slate-950 px-6 py-2.5 rounded-md font-semibold hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}
