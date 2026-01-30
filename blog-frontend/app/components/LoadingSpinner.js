export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      {/* Spinning ring with gradient */}
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-800"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-red-600 border-r-red-500 absolute top-0 left-0"></div>

        {/* Pulsing inner circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Animated text */}
      <p className="text-slate-400 text-lg mt-6 animate-pulse">{message}</p>

      {/* Animated dots */}
      <div className="flex gap-1 mt-3">
        <span
          className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></span>
      </div>
    </div>
  );
}
