// app/components/CommentList.js
export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No comments yet. Be the first to comment!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
        >
          <div className="flex items-center gap-2 mb-2">
            <strong className="text-gray-900">{comment.author_username}</strong>
            <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
