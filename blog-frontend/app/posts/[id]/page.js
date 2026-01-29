// app/posts/[id]/page.js
import Link from "next/link";
import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import Navbar from "@/app/components/Navbar";

export default async function PostDetailPage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-yellow-800">
                  Post Not Found
                </h2>
                <p className="text-yellow-700 mt-2">
                  The post you&apos;re looking for doesn&apos;t exist or has
                  been deleted.
                </p>
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
                >
                  ← Back to all posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from API");
    }

    const post = JSON.parse(text);

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
            >
              ← Back to all posts
            </Link>

            <article className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>

              <div className="text-sm text-gray-500 mb-6">
                By {post.author?.username || "Unknown"} •{" "}
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {post.category && (
                  <span>
                    {" "}
                    • in <strong>{post.category.name}</strong>
                  </span>
                )}
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

              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comments ({post.comment_count || 0})
              </h3>

              {/* Comment Form */}
              <CommentForm postId={post.id} />

              {/* Comments List */}
              <CommentList comments={post.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-800 mb-2">
                Error Loading Post
              </h2>
              <p className="text-red-600">{error.message}</p>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
