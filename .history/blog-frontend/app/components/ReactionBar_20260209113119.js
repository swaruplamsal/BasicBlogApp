"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { reactionsApi } from "../../lib/api";
import {}

const REACTIONS = ["like", "love", "clap", "insightful", "funny"];

export default function ReactionBar({
  postId,
  reactionsSummary,
  userReaction,
}) {
  const { user } = useAuth();
  const router = useRouter();

  const handleReact = async (type) => {
    if (!user) {
      router.push("/login");
      return;
    }

    //Toggle same reaction off
    if (userReaction?.reaction_type === type) {
      await reactionsApi.delete(userReaction.id);
    } else {
      await reactionsApi.create(postId, type);
    }

    router.refresh();
  };

  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map((type) => (
        <button
          key={type}
          onClick={() => handleReact(type)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            userReaction?.reaction_type === type
              ? "bg-red-600 text-white border-red-600"
              : "bg-slate-900 text-slate-300 border-slate-700 hover:border-red-600"
          }`}
        >
          {type} · {reactionsSummary?.[type] || 0}
        </button>
      ))}
    </div>
  );
}
