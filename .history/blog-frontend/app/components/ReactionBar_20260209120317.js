"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { postsApi, reactionsApi } from "../../lib/api";
import { ThumbsUp, Heart, Hand, Lightbulb } from "lucide-react";

const REACTIONS = {
  like: { icon: ThumbsUp },
  love: { icon: Heart },
  clap: { icon: Hand },
  insightful: { icon: Lightbulb },
};

export default function ReactionBar({
  postId,
  reactionsSummary,
  userReaction,
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState(reactionsSummary || {});
  const [currentReaction, setCurrentReaction] = useState(userReaction || null);
  const [isSaving, setIsSaving] = useState(false);

  const defaultSummary = useMemo(
    () => reactionsSummary || {},
    [reactionsSummary],
  );
  const defaultUserReaction = useMemo(
    () => userReaction || null,
    [userReaction],
  );

  useEffect(() => {
    setSummary(defaultSummary);
    setCurrentReaction(defaultUserReaction);
  }, [defaultSummary, defaultUserReaction]);

  useEffect(() => {
    if (!user || !postId) return;

    const loadReactionState = async () => {
      try {
        const post = await postsApi.getById(postId);
        setSummary(post?.reactions_summary || {});
        setCurrentReaction(post?.user_reaction || null);
      } catch {
        // Keep server-rendered defaults if client fetch fails.
      }
    };

    loadReactionState();
  }, [user, postId]);

  const handleReact = async (type) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    //Toggle same reaction off
    try {
      if (currentReaction?.reaction_type === type) {
        await reactionsApi.delete(currentReaction.id);
        setCurrentReaction(null);
        setSummary((prev) => ({
          ...prev,
          [type]: Math.max((prev?.[type] || 1) - 1, 0),
        }));
      } else {
        const previousType = currentReaction?.reaction_type;
        const reaction = await reactionsApi.create(postId, type);
        setCurrentReaction(reaction);
        setSummary((prev) => ({
          ...prev,
          ...(previousType
            ? { [previousType]: Math.max((prev?.[previousType] || 1) - 1, 0) }
            : {}),
          [type]: (prev?.[type] || 0) + 1,
        }));
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(REACTIONS).map(([type, { icon: Icon }]) => (
        <button
          key={type}
          onClick={() => handleReact(type)}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition-colors ${
            currentReaction?.reaction_type === type
              ? "bg-red-600 text-white border-red-600"
              : "bg-slate-900 text-slate-300 border-slate-700 hover:border-red-600"
          }`}
          aria-pressed={currentReaction?.reaction_type === type}
          disabled={isSaving}
        >
          <Icon className="w-4 h-4" />
          <span>{summary?.[type] || 0}</span>
        </button>
      ))}
    </div>
  );
}
