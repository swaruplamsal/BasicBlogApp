"use client";

export default function ProfileStats({ postCount, commentCount, memberSince }) {
  const formatDate = (dateString) => {
    return new Date(dateString).getFullYear();
  };

  const stats = [
    {
      label: "Posts",
      value: postCount || 0,
      type: "number",
    },
    {
      label: "Comments",
      value: commentCount || 0,
      type: "number",
    },
    {
      label: "Joined",
      value: memberSince ? formatDate(memberSince) : "N/A",
      type: "year",
    },
  ];

  return (
    <div className="w-full">
      {/* Mobile: Horizontal scroll layout */}
      <div className="md:hidden">
        <div className="flex gap-4 pb-4 overflow-x-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex-shrink-0 bg-slate-800/80 rounded-xl px-6 py-4 min-w-[140px]
                       border border-slate-700/40 hover:border-slate-600/60 transition-all"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-100 mb-1">
                  {stat.type === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Improved grid layout */}
      <div className="hidden md:flex md:gap-8 lg:gap-12">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex-1 group relative overflow-hidden
                     bg-gradient-to-br from-slate-800/90 to-slate-900/70
                     rounded-2xl px-8 py-10 text-center
                     border border-slate-700/50 hover:border-slate-600/70
                     hover:shadow-2xl hover:shadow-slate-900/30
                     transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              {/* Value */}
              <div className="text-4xl lg:text-5xl font-bold text-slate-100 mb-3 leading-none">
                {stat.type === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </div>

              {/* Label */}
              <div className="text-base text-slate-400 font-semibold tracking-wide">
                {stat.label}
              </div>

              {/* Additional info for joined date */}
              {stat.type === "year" && stat.value !== "N/A" && (
                <div className="text-sm text-slate-500 mt-3 font-medium">
                  {new Date().getFullYear() - stat.value === 0
                    ? "Just started this year"
                    : `${new Date().getFullYear() - stat.value} years of activity`}
                </div>
              )}
            </div>

            {/* Subtle decoration */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-slate-700/30 rounded-full group-hover:bg-slate-600/40 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
