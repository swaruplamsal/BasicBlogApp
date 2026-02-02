// app/components/CommentList.js
export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-center py-12 text-slate-400">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
              {(comment.author_username || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <strong className="font-semibold text-slate-200">
                {comment.author_username}
              </strong>
              <span className="text-xs text-slate-500">
                {new Date(comment.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <p className="whitespace-pre-line leading-relaxed text-slate-300">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
