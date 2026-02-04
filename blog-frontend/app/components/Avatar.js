"use client";

import Image from "next/image";
import Link from "next/link";

export default function Avatar({
  userId,
  username,
  avatarUrl,
  size = "md",
  showLink = true,
  className = "",
}) {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-24 h-24 text-3xl",
    "3xl": "w-32 h-32 text-4xl",
  };

  const avatarContent = avatarUrl ? (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-slate-700 hover:border-red-500/60 transition-colors cursor-pointer ${className}`}
    >
      <Image
        src={avatarUrl}
        alt={`${username}'s avatar`}
        fill
        className="object-cover rounded-full"
        unoptimized
      />
    </div>
  ) : (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-white font-semibold shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer ${className}`}
    >
      {(username || "U").charAt(0).toUpperCase()}
    </div>
  );

  if (showLink && userId) {
    return (
      <Link
        href={`/profile/${userId}`}
        className="relative block hover:scale-105 transition-transform cursor-pointer"
      >
        {avatarContent}
      </Link>
    );
  }

  return <div className="relative">{avatarContent}</div>;
}
