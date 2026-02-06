import React from "react";

// Performance optimized loading spinner
export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Simple, lightweight spinner */}
      <div className="w-8 h-8 border-4 border-slate-800 border-t-red-500 rounded-full animate-spin"></div>

      {/* Message */}
      <p className="text-slate-400 text-lg mt-4">{message}</p>
    </div>
  );
}

// Lightweight skeleton loader for better performance
export const PostSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-800 rounded w-1/4"></div>
    <div className="h-8 bg-slate-800 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-800 rounded"></div>
      <div className="h-4 bg-slate-800 rounded w-5/6"></div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
    </div>
  </div>
);
