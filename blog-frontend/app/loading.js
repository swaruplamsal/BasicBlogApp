import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 animate-fade-in">
      <Navbar />

      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-slate-950 to-blue-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center space-y-8">
            {/* Shimmer effect on hero title */}
            <div className="h-24 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-lg max-w-2xl mx-auto relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <div className="h-8 bg-gradient-to-r from-slate-800/30 via-slate-700/30 to-slate-800/30 rounded-lg max-w-xl mx-auto relative overflow-hidden">
              <div
                className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Posts */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div className="h-10 w-64 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>

        <LoadingSpinner message="Loading stories..." />

        {/* Skeleton Cards with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 bg-slate-900 rounded-2xl border border-slate-800 p-8 space-y-4 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${i * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Category badge */}
              <div className="h-6 w-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Title */}
              <div className="h-8 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <div className="h-4 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded w-5/6 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <div className="h-4 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded w-4/6 relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2 pt-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600/50 to-amber-600/50 rounded-full animate-pulse"></div>
                <div className="h-4 w-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded relative overflow-hidden">
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
