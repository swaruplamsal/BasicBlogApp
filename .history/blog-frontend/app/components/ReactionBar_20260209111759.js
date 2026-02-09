"use client";

import { useRouter } from "next/navigation/";
import { useAuth } from "../context/AuthContext";
import { reactionsApi } from "../../lib/api";

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
}
