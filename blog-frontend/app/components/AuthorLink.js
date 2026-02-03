"use client";

import Link from "next/link";
import Avatar from "./Avatar";

export default function AuthorLink({
  userId,
  username,
  avatarUrl,
  showAvatar = true,
  avatarSize = "sm",
  className = "",
}) {
  return (
    <Link
      href={`/profile/${userId}`}
      className={`inline-flex items-center gap-2 group ${className}`}
    >
      {showAvatar && (
        <Avatar
          userId={userId}
          username={username}
          avatarUrl={avatarUrl}
          size={avatarSize}
          showLink={false}
        />
      )}
      <span className="text-slate-300 font-medium group-hover:text-red-400 transition-colors">
        {username || "Anonymous"}
      </span>
    </Link>
  );
}
