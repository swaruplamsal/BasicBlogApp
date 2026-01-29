// app/page.js
import Link from "next/link";
import Navbar from "./components/Navbar";

export default async function HomePage() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/posts/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from API");
    }

    const data = JSON.parse(text);
    const posts = data.results || [];

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* ← Add this */}
        <div className="py-8">
          <div className="max-w-4xl mx-auto px-4">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">All Posts</h1>
              <p className="text-gray-600 mt-2">Built with Django & Next.js</p>
            </header>

            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <div className="text-sm text-gray-500 mb-4">
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

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 mb-4">
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

                    <div className="flex items-center justify-between">
                      <p className="text-gray-600 text-sm">
                        {post.comment_count}{" "}
                        {post.comment_count === 1 ? "comment" : "comments"}
                      </p>

                      <Link
                        href={`/posts/${post.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center text-gray-500">No posts yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Error Loading Posts
            </h2>
            <p className="text-red-600 mb-4">{error.message}</p>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Make sure Django is running on http://127.0.0.1:8000</li>
              <li>• Check that CORS is configured correctly</li>
              <li>
                • Try visiting http://127.0.0.1:8000/api/v1/posts/ directly
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
