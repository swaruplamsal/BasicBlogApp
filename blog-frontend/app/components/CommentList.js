// app/components/CommentList.js
export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: "#94a3b8" }}>
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-6 rounded-lg transition-colors"
          style={{
            backgroundColor: "rgba(90, 69, 69, 0.3)",
            border: "1px solid rgba(106, 85, 85, 0.5)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #000080, #9E2A2A)",
              }}
            >
              {(comment.author_username || "U").charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col">
              <strong
                className="font-semibold text-sm"
                style={{ color: "#cbd5e1" }}
              >
                {comment.author_username}
              </strong>
              <span className="text-xs" style={{ color: "#94a3b8" }}>
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
          <p
            className="whitespace-pre-line leading-relaxed"
            style={{ color: "#cbd5e1" }}
          >
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
