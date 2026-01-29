import Navbar from "../../components/Navbar";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import EditButton from "../../components/EditButton";
import Link from "next/link";

export default async function PostPage({ params }) {
  const { id } = await params;

  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`, {
        cache: "no-store",
      }),
      fetch(`http://127.0.0.1:8000/api/v1/comments/?post=${id}`, {
        cache: "no-store",
      }),
    ]);

    if (!postRes.ok) {
      throw new Error("Post not found");
    }

    const post = await postRes.json();
    const commentsData = commentsRes.ok
      ? await commentsRes.json()
      : { results: [] };
    const comments = commentsData.results || commentsData;

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-8">
          <article className="max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-md">
              {/* Header with Edit Button */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h1>
                  <div className="text-sm text-gray-500">
                    By {post.author_username || "Unknown"} •{" "}
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {post.category_name && (
                      <span>
                        {" "}
                        • in <strong>{post.category_name}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <EditButton postId={post.id} authorId={post.author} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose max-w-none text-gray-700 mb-8">
                {post.content.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({comments.length})
              </h2>
              <CommentForm postId={post.id} />
              <CommentList comments={comments} />
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }
}
