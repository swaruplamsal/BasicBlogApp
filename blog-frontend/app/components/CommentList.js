// app/components/CommentList.js
export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-slate-500 text-center py-12">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-lg hover:border-slate-600/50 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
              {(comment.author_username || "U").charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col">
              <strong className="text-slate-200 font-semibold text-sm">
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
          <p className="text-slate-300 whitespace-pre-line leading-relaxed">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
