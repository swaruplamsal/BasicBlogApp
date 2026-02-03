"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-md">
        <h2 className="text-2xl font-bold text-red-400 mb-3">
          Error Loading Post
        </h2>

        <p className="text-red-300 mb-6">
          {error?.message || "Something went wrong"}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Retry
          </button>

          <Link
            href="/"
            className="px-4 py-2 border border-red-500/40 text-red-300 rounded"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
