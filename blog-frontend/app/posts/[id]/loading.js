import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Skeleton */}
        <header className="mb-12 space-y-6">
          {/* Category Badge Skeleton */}
          <div
            className="h-8 w-32 bg-gradient-to-r from-red-950/50 via-red-900/50 to-red-950/50 rounded-full relative overflow-hidden opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-4">
            <div
              className="h-16 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-lg relative overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <div
              className="h-16 bg-gradient-to-r from-slate-800/30 via-slate-700/30 to-slate-800/30 rounded-lg w-3/4 relative overflow-hidden opacity-0 animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>

          {/* Meta Info Skeleton */}
          <div
            className="flex items-center gap-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600/50 to-amber-600/50 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <div className="h-3 w-32 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex gap-2 pt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-20 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-full relative overflow-hidden opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${350 + i * 50}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>
            ))}
          </div>
        </header>

        {/* Loading Spinner */}
        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          <LoadingSpinner message="Loading post..." />
        </div>

        {/* Content Skeleton */}
        <div className="mt-12 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-4 bg-gradient-to-r from-slate-800/30 via-slate-700/30 to-slate-800/30 rounded relative overflow-hidden opacity-0 animate-fade-in-up"
              style={{
                width: i % 3 === 0 ? "85%" : i % 2 === 0 ? "100%" : "95%",
                animationDelay: `${600 + i * 50}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Comments Section Skeleton */}
        <div className="mt-16 space-y-8">
          <div
            className="h-8 w-48 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded relative overflow-hidden opacity-0 animate-fade-in-up"
            style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-6 bg-slate-900 rounded-xl border border-slate-800 space-y-4 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${1100 + i * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600/50 to-amber-600/50 rounded-full animate-pulse"></div>
                <div className="h-4 w-32 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <div className="h-3 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded w-4/5 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
